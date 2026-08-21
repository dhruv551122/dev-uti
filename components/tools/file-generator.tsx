"use client";

import { useState } from "react";

import type {
  GeneratedFile,
  GeneratorType,
} from "@/types/tools";

import { generateTextFile } from "@/lib/generators/text";
import DownloadButton from "../common/download-button";

export function FileGenerator() {
  const [type, setType] =
    useState<GeneratorType>("text");

  const [filename, setFilename] =
    useState("sample");

  const [content, setContent] =
    useState("Hello from Developer Utilities!");

  const [file, setFile] =
    useState<GeneratedFile | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  function generate() {
    try {
      setError(null);

      let generated: GeneratedFile;

        generated = generateTextFile(
          content,
          filename
        );
     

      setFile(generated);
    } catch (error) {
      setFile(null);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }

  function reset() {
    setFilename("sample");

    setContent(
      type === "text"
        ? "Hello from Developer Utilities!"
        : `{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}`
    );

    setFile(null);
    setError(null);
  }

  function handleTypeChange(
    nextType: GeneratorType
  ) {
    setType(nextType);

    setFile(null);
    setError(null);

    if (nextType === "json") {
      setFilename("sample");
      setContent(`{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}`);
    } else {
      setFilename("sample");
      setContent(
        "Hello from Developer Utilities!"
      );
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      {/* Configuration */}
      <section className="rounded-2xl border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Configuration
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Configure your dummy file.
          </p>
        </div>

        {/* File type */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium">
            File type
          </label>

          <select
            value={type}
            onChange={(event) =>
              handleTypeChange(
                event.target.value as GeneratorType
              )
            }
            className="w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2"
          >
            <option value="text">
              Text (.txt)
            </option>

            <option value="json">
              JSON (.json)
            </option>
          </select>
        </div>

        {/* Filename */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium">
            Filename
          </label>

          <input
            value={filename}
            onChange={(event) =>
              setFilename(event.target.value)
            }
            placeholder="sample"
            className="w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2"
          />
        </div>

        {/* Content */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium">
            Content
          </label>

          <textarea
            value={content}
            onChange={(event) =>
              setContent(event.target.value)
            }
            rows={10}
            className="w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-sm outline-none focus:ring-2"
          />
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={generate}
            className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-80"
          >
            Generate
          </button>

          <button
            type="button"
            onClick={reset}
            className="rounded-lg border px-4 py-3 text-sm font-medium transition hover:bg-neutral-50"
          >
            Reset
          </button>
        </div>
      </section>

      {/* Result */}
      <section className="rounded-2xl border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Generated file
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Preview and download your file.
          </p>
        </div>

        {file ? (
          <div>
            <div className="mb-6 rounded-xl border bg-neutral-50 p-5">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-neutral-500">
                    Filename
                  </p>

                  <p className="mt-1 truncate text-sm font-medium">
                    {file.filename}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500">
                    Size
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {formatBytes(file.size)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500">
                    Type
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {file.mimeType}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 overflow-hidden rounded-xl border">
              <div className="border-b bg-neutral-50 px-4 py-3 text-xs font-medium text-neutral-500">
                Preview
              </div>

              <pre className="max-h-96 overflow-auto p-5 text-sm">
                {content}
              </pre>
            </div>

            <DownloadButton file={file} />
          </div>
        ) : (
          <div className="flex min-h-80 items-center justify-center rounded-xl border border-dashed">
            <div className="text-center">
              <p className="font-medium">
                No file generated
              </p>

              <p className="mt-1 text-sm text-neutral-500">
                Configure your file and click Generate.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
  ];

  const index = Math.floor(
    Math.log(bytes) / Math.log(1024)
  );

  return `${(
    bytes / Math.pow(1024, index)
  ).toFixed(2)} ${units[index]}`;
}