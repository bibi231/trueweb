"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  primarySrc: string;
  hoverSrc: string;
  name: string;
  href?: string;
  width?: number;
  height?: number;
  className?: string;
};

export function HoverPortrait({ primarySrc, hoverSrc, name, href, width = 480, height = 600, className = "" }: Props) {
  const [hovered, setHovered] = useState(false);

  const inner = (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        cursor: href ? "pointer" : "default",
      }}
      tabIndex={href ? 0 : undefined}
    >
      {/* Primary (default) */}
      <Image
        src={primarySrc}
        alt={name}
        width={width}
        height={height}
        priority
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "opacity 0.5s ease",
          opacity: hovered ? 0 : 1,
        }}
      />
      {/* Hover (B&W) */}
      <Image
        src={hoverSrc}
        alt={`${name} — alternate portrait`}
        width={width}
        height={height}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.5s ease",
          opacity: hovered ? 1 : 0,
        }}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label={`View ${name}'s story`} style={{ display: "block" }}>
        {inner}
      </Link>
    );
  }
  return inner;
}
