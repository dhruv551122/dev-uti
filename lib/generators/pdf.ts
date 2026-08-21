import {
    PDFDocument,
    StandardFonts,
    rgb,
  } from "pdf-lib";
  
  import type { GeneratedFile } from "@/types/tools";
  
  export interface PdfOptions {
    content: string;
    filename: string;
    pageCount?: number;
    pageWidth?: number;
    pageHeight?: number;
  }
  
  export async function generatePdfFile({
    content,
    filename,
    pageCount = 1,
    pageWidth = 595.28,
    pageHeight = 841.89,
  }: PdfOptions): Promise<GeneratedFile> {
    if (!content.trim()) {
      throw new Error(
        "PDF content cannot be empty."
      );
    }
  
    if (pageCount < 1 || pageCount > 100) {
      throw new Error(
        "Page count must be between 1 and 100."
      );
    }
  
    const pdfDoc = await PDFDocument.create();
  
    const font = await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );
  
    const fontSize = 12;
  
    const margin = 50;
  
    const lineHeight = 18;
  
    const maxWidth =
      pageWidth - margin * 2;
  
    const lines = wrapText(
      content,
      font,
      fontSize,
      maxWidth
    );
  
    let lineIndex = 0;
  
    for (
      let pageNumber = 0;
      pageNumber < pageCount;
      pageNumber++
    ) {
      const page = pdfDoc.addPage([
        pageWidth,
        pageHeight,
      ]);
  
      let y = pageHeight - margin;
  
      while (
        lineIndex < lines.length &&
        y > margin
      ) {
        page.drawText(lines[lineIndex], {
          x: margin,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
  
        y -= lineHeight;
  
        lineIndex++;
      }
  
      if (lineIndex >= lines.length) {
        break;
      }
    }
  
    const pdfBytes = await pdfDoc.save();
  
    const blob = new Blob(
      [pdfBytes as BlobPart],
      {
        type: "application/pdf",
      }
    );
  
    return {
      filename: filename.endsWith(".pdf")
        ? filename
        : `${filename}.pdf`,
      size: blob.size,
      mimeType: "application/pdf",
      blob,
    };
  }
  
  function wrapText(
    text: string,
    font: Awaited<
      ReturnType<PDFDocument["embedFont"]>
    >,
    fontSize: number,
    maxWidth: number
  ) {
    const paragraphs = text.split("\n");
  
    const lines: string[] = [];
  
    for (const paragraph of paragraphs) {
      if (!paragraph.trim()) {
        lines.push("");
        continue;
      }
  
      const words = paragraph.split(" ");
  
      let currentLine = "";
  
      for (const word of words) {
        const testLine = currentLine
          ? `${currentLine} ${word}`
          : word;
  
        const width = font.widthOfTextAtSize(
          testLine,
          fontSize
        );
  
        if (
          width > maxWidth &&
          currentLine
        ) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
  
      if (currentLine) {
        lines.push(currentLine);
      }
    }
  
    return lines;
  }