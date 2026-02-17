const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 20 * 1024 * 1024; // 20MB

export function validateFiles(files: File[]): {
  valid: File[];
  errors: string[];
} {
  const valid: File[] = [];
  const errors: string[] = [];

  for (const file of files) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      errors.push(`"${file.name}" - 지원하지 않는 형식입니다 (JPG, PNG, WebP만 가능)`);
      continue;
    }
    if (file.size > MAX_SIZE) {
      errors.push(`"${file.name}" - 파일 크기가 20MB를 초과합니다`);
      continue;
    }
    valid.push(file);
  }

  return { valid, errors };
}

export function getFileExtension(format: "png" | "jpeg"): string {
  return format === "png" ? ".png" : ".jpg";
}

export function getExportFilename(
  originalName: string,
  format: "png" | "jpeg"
): string {
  const base = originalName.replace(/\.[^.]+$/, "");
  return `${base}_누끼${getFileExtension(format)}`;
}
