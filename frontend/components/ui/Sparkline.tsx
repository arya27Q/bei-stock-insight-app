import React from "react";
import { cn } from "../../lib/utils";

export interface SparklineProps extends React.SVGAttributes<SVGSVGElement> {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  color?: string;
  isPositive?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 38,
  height = 16,
  strokeWidth = 1.75,
  color,
  isPositive,
  className,
  ...props
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;

  const paddingX = 2;
  const paddingY = 2.5;
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  // Koordinat titik data
  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * usableWidth;
    const y = height - paddingY - ((val - min) / range) * usableHeight;
    return { x, y };
  });

  // Buat kurva lengkung mulus (smooth bezier curve)
  let pathD = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cp1x = (p0.x + (p1.x - p0.x) * 0.5).toFixed(1);
    const cp1y = p0.y.toFixed(1);
    const cp2x = (p0.x + (p1.x - p0.x) * 0.5).toFixed(1);
    const cp2y = p1.y.toFixed(1);
    pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }

  const lastPoint = points[points.length - 1];

  // Penentuan warna stroke
  const strokeColor = color
    ? color
    : isPositive !== undefined
    ? isPositive
      ? "rgba(110, 231, 183, 0.95)"
      : "rgba(253, 164, 175, 0.95)"
    : "rgba(255, 255, 255, 0.92)";

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={cn("overflow-visible shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      {/* Garis tren historis */}
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Titik penanda titik terkini (current quarter dot) */}
      <circle
        cx={lastPoint.x}
        cy={lastPoint.y}
        r="2"
        fill={strokeColor}
      />
      <circle
        cx={lastPoint.x}
        cy={lastPoint.y}
        r="3.5"
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.75"
        opacity="0.5"
      />
    </svg>
  );
};
