import type { GeneratedFile } from "@/types/tools";

export function generateTextFile(
  content: string,
  filename: string
): GeneratedFile {
  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });

  return {
    blob,
    filename: filename.endsWith(".txt") ? filename : `${filename}.txt`,
    size: blob.size,
    mimeType: "text/plain",
  };
}