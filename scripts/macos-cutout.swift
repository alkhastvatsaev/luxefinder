#!/usr/bin/env swift
import AppKit
import CoreImage
import Foundation
import Vision

@available(macOS 14.0, *)
func cutout(inputPath: String, outputPath: String) throws {
  let inputURL = URL(fileURLWithPath: inputPath)
  guard let nsImage = NSImage(contentsOf: inputURL),
        let cgImage = nsImage.cgImage(forProposedRect: nil, context: nil, hints: nil)
  else {
    throw NSError(domain: "macos-cutout", code: 1, userInfo: [NSLocalizedDescriptionKey: "Cannot read image"])
  }

  let request = VNGenerateForegroundInstanceMaskRequest()
  let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
  try handler.perform([request])

  guard let result = request.results?.first else {
    throw NSError(domain: "macos-cutout", code: 2, userInfo: [NSLocalizedDescriptionKey: "No subject found"])
  }

  let maskBuffer = try result.generateScaledMaskForImage(
    forInstances: result.allInstances,
    from: handler
  )

  let ciImage = CIImage(cgImage: cgImage)
  var maskImage = CIImage(cvPixelBuffer: maskBuffer)

  let scaleX = ciImage.extent.width / maskImage.extent.width
  let scaleY = ciImage.extent.height / maskImage.extent.height
  maskImage = maskImage.transformed(by: CGAffineTransform(scaleX: scaleX, y: scaleY))

  guard let blend = CIFilter(name: "CIBlendWithMask") else {
    throw NSError(domain: "macos-cutout", code: 3, userInfo: [NSLocalizedDescriptionKey: "CIBlendWithMask unavailable"])
  }

  let clear = CIImage(color: .clear).cropped(to: ciImage.extent)
  blend.setValue(ciImage, forKey: kCIInputImageKey)
  blend.setValue(clear, forKey: kCIInputBackgroundImageKey)
  blend.setValue(maskImage, forKey: kCIInputMaskImageKey)

  guard let output = blend.outputImage else {
    throw NSError(domain: "macos-cutout", code: 4, userInfo: [NSLocalizedDescriptionKey: "Blend failed"])
  }

  let context = CIContext(options: [.useSoftwareRenderer: false])
  let outURL = URL(fileURLWithPath: outputPath)
  try context.writePNGRepresentation(
    of: output,
    to: outURL,
    format: .RGBA8,
    colorSpace: CGColorSpaceCreateDeviceRGB()
  )
}

let args = CommandLine.arguments
guard args.count >= 3 else {
  fputs("Usage: macos-cutout.swift <input> <output.png>\n", stderr)
  exit(64)
}

if #available(macOS 14.0, *) {
  do {
    try cutout(inputPath: args[1], outputPath: args[2])
  } catch {
    fputs("macos-cutout error: \(error.localizedDescription)\n", stderr)
    exit(1)
  }
} else {
  fputs("macos-cutout requires macOS 14+\n", stderr)
  exit(2)
}
