"use client";

import { useEffect, useState } from "react";

interface PdfPreviewProps {
  blob: Blob;
}

export default function PdfPreview({
  blob,
}: PdfPreviewProps) {
  const [pdfUrl, setPdfUrl] =
    useState<string | null>(null);

  useEffect(() => {
    const url =
      URL.createObjectURL(blob);

    setPdfUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [blob]);

  if (!pdfUrl) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        Loading preview...
      </div>
    );
  }

  return (
    <iframe
      src={pdfUrl}
      title="PDF Preview"
      className="h-[700px] w-full rounded-xl border"
    />
  );
}