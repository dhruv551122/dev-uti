import { PDFFont } from "pdf-lib";
import { PdfOrientation } from "../generators/pdf";

export interface PageSize {
    width: number;
    height: number;
  }

const A4 = {
    width: 595.28,
    height: 841.89,
  };

export function getPageSize(
    orientation: PdfOrientation = "portrait"
  ): PageSize {
    if (orientation === "landscape") {
      return {
        width: A4.height,
        height: A4.width,
      };
    }
  
    return {
      width: A4.width,
      height: A4.height,
    };
  }

export function splitLongWord(
    word: string,
    font: PDFFont,
    fontSize: number,
    maxWidth: number
  ): string[] {
    const chunks: string[] = [];
    let current = "";
  
    for (const character of word) {
      const test = current + character;
  
      const width = font.widthOfTextAtSize(
        test,
        fontSize
      );
  
      if (width <= maxWidth) {
        current = test;
      } else {
        if (current) {
          chunks.push(current);
        }
  
        current = character;
      }
    }
  
    if (current) {
      chunks.push(current);
    }
  
    return chunks;
  }

export function wrapLine(
    text: string,
    font: PDFFont,
    fontSize: number,
    maxWidth: number
  ): string[] {
    if (!text.trim()) {
      return [""];
    }
  
    const words = text.split(/\s+/);
    const lines: string[] = [];
  
    let currentLine = "";
  
    for (const word of words) {
      const testLine = currentLine
        ? `${currentLine} ${word}`
        : word;
  
      const testWidth = font.widthOfTextAtSize(
        testLine,
        fontSize
      );
  
      if (testWidth <= maxWidth) {
        currentLine = testLine;
        continue;
      }
  
      if (!currentLine) {
        const chunks = splitLongWord(
          word,
          font,
          fontSize,
          maxWidth
        );
  
        if (chunks.length > 1) {
          lines.push(...chunks.slice(0, -1));
          currentLine = chunks[chunks.length - 1];
        } else {
          currentLine = word;
        }
  
        continue;
      }
  
      lines.push(currentLine);
  
      const wordWidth = font.widthOfTextAtSize(
        word,
        fontSize
      );
  
      if (wordWidth <= maxWidth) {
        currentLine = word;
      } else {
        const chunks = splitLongWord(
          word,
          font,
          fontSize,
          maxWidth
        );
  
        if (chunks.length > 1) {
          lines.push(...chunks.slice(0, -1));
          currentLine = chunks[chunks.length - 1];
        } else {
          currentLine = word;
        }
      }
    }
  
    if (currentLine) {
      lines.push(currentLine);
    }
  
    return lines;
  }

export function prepareContentLines(
    content: string,
    font: PDFFont,
    fontSize: number,
    maxWidth: number
  ): string[] {
    const paragraphs = content.replace(/\r\n/g, "\n").split("\n");
  
    const lines: string[] = [];
  
    for (const paragraph of paragraphs) {
      /**
       * Preserve empty lines.
       */
      if (!paragraph.trim()) {
        lines.push("");
        continue;
      }
  
      const wrappedLines = wrapLine
      (
        paragraph,
        font,
        fontSize,
        maxWidth
      );
  
      lines.push(...wrappedLines);
    }
  
    return lines;
  }