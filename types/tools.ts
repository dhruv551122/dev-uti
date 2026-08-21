export type GeneratorType = "text" | "json";

export interface GeneratedFile {
  blob: Blob;
  filename: string;
  size: number;
  mimeType: string;
}

export interface GeneratorOptions {
  type: GeneratorType;
  filename: string;
  content: string;
}