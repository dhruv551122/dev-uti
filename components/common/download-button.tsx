"use client";

import type { GeneratedFile } from "@/types/tools";
import { Button } from "../ui/button";

interface DownloadButtonProps {
  file: GeneratedFile;
}

const DownloadButton = ({
  file,
}: DownloadButtonProps) => {
  function handleDownload() {
    const url = URL.createObjectURL(file.blob);

    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = file.filename;

    document.body.appendChild(anchor);

    anchor.click();

    anchor.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <Button
      onClick={handleDownload}
      className="w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-80"
    >
      Download {file.filename}
    </Button>
  );
}

export default DownloadButton