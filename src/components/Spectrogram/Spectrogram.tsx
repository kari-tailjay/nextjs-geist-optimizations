"use client";

import React, { useEffect, useRef } from "react";

interface SpectrogramProps {
  audioUrl: string;
}

export default function Spectrogram({ audioUrl }: SpectrogramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!audioUrl) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Placeholder: Draw a simple gradient as a dummy spectrogram
    const width = canvas.width;
    const height = canvas.height;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#000");
    gradient.addColorStop(1, "#0f0");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // TODO: Implement real spectrogram visualization using Web Audio API or a library

  }, [audioUrl]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-md shadow-md">
      <h4 className="text-lg font-semibold mb-2">Spectrogram</h4>
      <canvas ref={canvasRef} width={800} height={200} className="w-full rounded" />
    </div>
  );
}
