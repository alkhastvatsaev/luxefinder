import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const GRAY = "#B8B8B8";

/**
 * Lens icon. Morph to chevron only on real hover (mouse) —
 * never on touch, so iOS doesn’t steal the first tap for sticky :hover.
 */
export function LensUploadIcon({ className }: Props) {
  return (
    <span
      className={cn(
        "relative inline-flex aspect-square w-16 items-center justify-center",
        className
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 192 192"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 size-full text-foreground transition-all duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-75 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-0"
      >
        <circle fill="currentColor" cx="144.07" cy="144" r="16" />
        <circle fill={GRAY} cx="96.07" cy="104" r="24" />
        <path
          fill={GRAY}
          d="M24,135.2c0,18.11,14.69,32.8,32.8,32.8H96v-16l-40.1-0.1c-8.8,0-15.9-8.19-15.9-17.9v-18H24V135.2z"
        />
        <path
          fill="currentColor"
          d="M168,72.8c0-18.11-14.69-32.8-32.8-32.8H116l20,16c8.8,0,16,8.29,16,18v30h16V72.8z"
        />
        <path
          fill="currentColor"
          d="M112,24l-32,0L68,40H56.8C38.69,40,24,54.69,24,72.8V92h16V74c0-9.71,7.2-18,16-18h80L112,24z"
        />
      </svg>

      <svg
        viewBox="0 0 192 192"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 size-full scale-75 text-foreground opacity-0 transition-all duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
      >
        <path
          d="M58 78 L96 124 L134 78"
          fill="none"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** @deprecated Use LensUploadIcon inside a `group` label/button. */
export function LensIcon({ className }: Props) {
  return <LensUploadIcon className={className} />;
}
