#!/usr/bin/env node
/**
 * Regression gate for the home Lens frost (transparent glass CTA).
 * Fails the build if idle Lens looks solid again or frost CSS is missing.
 */
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const failures = [];
const warnings = [];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function fail(msg) {
  failures.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

const css = read("src/app/globals.css");
const coverflow = read("src/components/home-coverflow.tsx");
const helper = fs.existsSync(path.join(root, "src/lib/lens-glass.ts"))
  ? read("src/lib/lens-glass.ts")
  : "";

// 1) Canonical frost CSS must exist and stay translucent
if (!/\.lens-glass\s*\{/.test(css)) {
  fail("globals.css: missing .lens-glass rule");
}
if (!/backdrop-filter:\s*blur\(/.test(css) || !/-webkit-backdrop-filter:\s*blur\(/.test(css)) {
  fail("globals.css: .lens-glass must set backdrop-filter and -webkit-backdrop-filter");
}

const alphaMatch = css.match(
  /\.lens-glass\s*\{[^}]*background:\s*rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*(0?\.\d+)\s*\)/s
);
if (!alphaMatch) {
  fail("globals.css: .lens-glass must use rgba(255,255,255,α) background");
} else {
  const alpha = Number(alphaMatch[1]);
  if (!(alpha > 0 && alpha <= 0.45)) {
    fail(
      `globals.css: .lens-glass alpha is ${alpha} — keep ≤ 0.45 so the CTA stays visibly transparent`
    );
  }
}

if (!/\.lens-glass-dragging\s*\{/.test(css)) {
  fail("globals.css: missing .lens-glass-dragging rule");
}

// 2) Home must use the frost helper / class on idle Lens
const usesHelper = /lensFaceClassName\(/.test(coverflow);
const usesClass = /["'`]lens-glass["'`]/.test(coverflow) || /lens-glass/.test(helper);
if (!usesHelper && !/lens-glass/.test(coverflow)) {
  fail("home-coverflow.tsx: idle Lens must use lens-glass (via lensFaceClassName preferred)");
}
if (!usesHelper) {
  warn("prefer lensFaceClassName() from src/lib/lens-glass.ts so marquee edits cannot drop frost");
}

// 3) Forbidden solid idle fills on the Lens shell
const solidPatterns = [
  /from-neutral-50\s+to-white/,
  /bg-gradient-to-b\s+from-neutral-50/,
];
for (const re of solidPatterns) {
  if (re.test(coverflow)) {
    fail(
      `home-coverflow.tsx: forbidden solid Lens fill pattern ${re} — idle state must stay frosted`
    );
  }
}

// Heavy underlays that defeat transparency (allow photo-state bg-white only with showPhoto)
if (/bg-white\/(?:[89]\d|100)/.test(coverflow) && /lens-glass|lensFaceClassName/.test(coverflow)) {
  // only flag if it's near frost plate underlays — check for absolute frost underlay pattern
  if (/bg-white\/(?:8\d|9\d).*rounded-\[1\.75rem\]/.test(coverflow.replace(/\s+/g, " "))) {
    fail("home-coverflow.tsx: heavy bg-white/80+ underlay on Lens defeats transparency");
  }
}

// 4) No opacity entrance on Lens shell ancestors (breaks backdrop-filter)
const lensShellBlock = coverflow.match(
  /relative flex w-screen max-w-\[100vw\][\s\S]{0,400}?lensSize/
);
if (lensShellBlock && /animate-rise(?:-delay)?/.test(lensShellBlock[0])) {
  fail(
    "home-coverflow.tsx: animate-rise on Lens shell ancestor disables backdrop-filter until anim ends"
  );
}

// Direct class on the size wrapper
if (
  /className="[^"]*animate-rise[^"]*"[\s\S]{0,120}?lensSize/.test(coverflow) ||
  /animate-rise-delay relative flex w-screen/.test(coverflow)
) {
  fail("home-coverflow.tsx: do not put animate-rise / animate-rise-delay on the Lens wrapper");
}

// 5) Idle frost must not also set overflow-hidden on the same face
if (/lens-glass[^"'`\n]*overflow-hidden|overflow-hidden[^"'`\n]*lens-glass/.test(coverflow)) {
  fail("home-coverflow.tsx: overflow-hidden + lens-glass on same idle face breaks Safari frost");
}

// 6) Cursor rule should remain as a human/agent guardrail
const rulePath = path.join(root, ".cursor/rules/lens-frost.mdc");
if (!fs.existsSync(rulePath)) {
  warn("missing .cursor/rules/lens-frost.mdc — recreate so agents keep the frost");
} else if (!/lens-glass/.test(fs.readFileSync(rulePath, "utf8"))) {
  warn(".cursor/rules/lens-frost.mdc no longer mentions lens-glass");
}

if (warnings.length) {
  console.warn("audit-lens-frost warnings:");
  for (const w of warnings) console.warn("  •", w);
}

if (failures.length) {
  console.error("audit-lens-frost FAILED:");
  for (const f of failures) console.error("  ✗", f);
  process.exit(1);
}

console.log(
  `audit-lens-frost: OK · frost CSS present · alpha=${alphaMatch ? alphaMatch[1] : "?"} · home uses ${usesHelper ? "lensFaceClassName" : "lens-glass"}`
);
