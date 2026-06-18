"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface RainbowButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  download?: boolean | string;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function RainbowButton({
  children,
  className,
  href,
  download,
  onClick,
  type = "button",
  disabled,
}: RainbowButtonProps) {
  const outer = ["rainbow-btn", className].filter(Boolean).join(" ");
  const inner = "rainbow-btn-inner";

  if (href && download) {
    return (
      <a
        href={href}
        download={download === true ? undefined : download}
        className={outer}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        <span className={inner}>{children}</span>
      </a>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={outer}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        <span className={inner}>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={outer}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
    >
      <span className={inner}>{children}</span>
    </button>
  );
}
