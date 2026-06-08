"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform float uTime;
uniform vec2 uRes;

float hash(float n) { return fract(sin(n) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i.x + i.y * 57.0);
  float b = hash(i.x + 1.0 + i.y * 57.0);
  float c = hash(i.x + (i.y + 1.0) * 57.0);
  float d = hash(i.x + 1.0 + (i.y + 1.0) * 57.0);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 8.0; i++) {
    float offset = i * 0.13;
    float t = uTime * (0.3 + offset * 0.15);
    float nx = noise(vec2(uv.y * 4.0 + offset, t * 0.5));
    float x = uv.x + (nx - 0.5) * 0.4;
    float stripe = mod(x * 12.0 + i * 0.7, 1.0);
    float line = smoothstep(0.04, 0.0, abs(stripe - 0.5) - 0.1);
    float alpha = line * (0.4 + 0.3 * sin(uTime + i));
    col += alpha * mix(
      vec3(0.0, 0.831, 0.831),
      vec3(0.388, 0.4, 1.0),
      i / 8.0
    );
  }

  gl_FragColor = vec4(col * 0.6, 1.0);
}
`;

export function ShaderLines({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uRes");

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf: number;
    const start = performance.now();
    const tick = () => {
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden
    />
  );
}
