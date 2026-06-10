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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function InitialsFallback({ name, bw = false }: { name: string; bw?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        background: bw
          ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 60%, #4a4a4a 100%)"
          : "linear-gradient(135deg, #00d4d4 0%, #00a8a8 50%, #0f172a 100%)",
        color: bw ? "#e5e7eb" : "#050507",
        fontFamily: "var(--font-syne), system-ui, sans-serif",
        fontWeight: 800,
        fontSize: "clamp(48px, 10vw, 120px)",
        letterSpacing: "-0.04em",
        textShadow: bw ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,212,212,0.3)",
      }}
    >
      {getInitials(name)}
    </div>
  );
}

export function HoverPortrait({ primarySrc, hoverSrc, name, href, width = 480, height = 600, className = "" }: Props) {
  const [hovered, setHovered] = useState(false);
  const [primaryFailed, setPrimaryFailed] = useState(false);
  const [hoverFailed, setHoverFailed] = useState(false);

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
        aspectRatio: `${width} / ${height}`,
        background: "linear-gradient(135deg, #050507 0%, #0f172a 100%)",
      }}
      tabIndex={href ? 0 : undefined}
    >
      {/* Primary (default) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transition: "opacity 0.5s ease",
          opacity: hovered ? 0 : 1,
        }}
      >
        {primaryFailed ? (
          <InitialsFallback name={name} />
        ) : (
          <Image
            src={primarySrc}
            alt={name}
            width={width}
            height={height}
            priority
            onError={() => setPrimaryFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
      </div>
      {/* Hover (B&W) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transition: "opacity 0.5s ease",
          opacity: hovered ? 1 : 0,
        }}
      >
        {hoverFailed ? (
          <InitialsFallback name={name} bw />
        ) : (
          <Image
            src={hoverSrc}
            alt={`${name} — alternate portrait`}
            width={width}
            height={height}
            onError={() => setHoverFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
      </div>
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
