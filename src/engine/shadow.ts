import type { ShadowSettings } from "../types";

export function applyShadow(
  sourceCanvas: HTMLCanvasElement,
  settings: ShadowSettings
): HTMLCanvasElement {
  if (!settings.enabled) return sourceCanvas;

  const { width, height } = sourceCanvas;
  const padding = settings.blur * 2 + Math.max(Math.abs(settings.offsetX), Math.abs(settings.offsetY));

  const canvas = document.createElement("canvas");
  canvas.width = width + padding * 2;
  canvas.height = height + padding * 2;
  const ctx = canvas.getContext("2d")!;

  // Contact shadow (ellipse at bottom)
  const shadowCenterX = padding + width / 2 + settings.offsetX;
  const shadowCenterY = padding + height - height * 0.02 + settings.offsetY;
  const shadowRadiusX = width * 0.35;
  const shadowRadiusY = height * 0.04;

  ctx.save();
  ctx.filter = `blur(${settings.blur}px)`;
  ctx.globalAlpha = settings.opacity;
  ctx.fillStyle = settings.color;
  ctx.beginPath();
  ctx.ellipse(shadowCenterX, shadowCenterY, shadowRadiusX, shadowRadiusY, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Drop shadow
  ctx.save();
  ctx.shadowColor = settings.color;
  ctx.shadowBlur = settings.blur;
  ctx.shadowOffsetX = settings.offsetX;
  ctx.shadowOffsetY = settings.offsetY;
  ctx.globalAlpha = settings.opacity;
  ctx.drawImage(sourceCanvas, padding, padding);
  ctx.restore();

  // Draw original on top
  ctx.globalAlpha = 1;
  ctx.drawImage(sourceCanvas, padding, padding);

  return canvas;
}
