"use client";

import { useState } from "react";

import type { GeneratedFile } from "@/types/tools";
import {
  generateJson,
  type JsonField,
  type JsonFieldType,
} from "@/lib/generators/json";
import DownloadButton from "@/components/common/download-button";

const DEFAULT_FIELDS: JsonField[] = [
  {
    id: crypto.randomUUID(),
    name: "id",
    type: "number",
  },
  {
    id: crypto.randomUUID(),
    name: "name",
    type: "string",
  },
  {
    id: crypto.randomUUID(),
    name: "email",
    type: "email",
  },
  {
    id: crypto.randomUUID(),
    name: "active",
    type: "boolean",
  },
];

const JsonGenerator = () => {
  const [fields, setFields] =
    useState<JsonField[]>(DEFAULT_FIELDS);

  const [count, setCount] = useState(10);

  const [filename, setFilename] =
    useState("sample");

  const [json, setJson] = useState("");

  const [file, setFile] =
    useState<GeneratedFile | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  function updateField(
    id: string,
    key: keyof JsonField,
    value: string
  ) {
    setFields((current) =>
      current.map((field) =>
        field.id === id
          ? {
              ...field,
              [key]: value,
            }
          : field
      )
    );
  }

  function addField() {
    setFields((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: `field${current.length + 1}`,
        type: "string",
      },
    ]);
  }

  function removeField(id: string) {
    setFields((current) =>
      current.filter((field) => field.id !== id)
    );
  }

  function generate() {
    try {
      setError(null);
      setFile(null);

      const data = generateJson(
        fields,
        count
      );

      const formattedJson =
        JSON.stringify(data, null, 2);

      setJson(formattedJson);

      const blob = new Blob(
        [formattedJson],
        {
          type: "application/json",
        }
      );

      const generatedFile: GeneratedFile = {
        filename: filename.endsWith(".json")
          ? filename
          : `${filename}.json`,
        size: blob.size,
        mimeType: "application/json",
        blob,
      };

      setFile(generatedFile);
    } catch (error) {
      setJson("");
      setFile(null);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }

  function reset() {
    setFields([
      {
        id: crypto.randomUUID(),
        name: "id",
        type: "number",
      },
      {
        id: crypto.randomUUID(),
        name: "name",
        type: "string",
      },
      {
        id: crypto.randomUUID(),
        name: "email",
        type: "email",
      },
      {
        id: crypto.randomUUID(),
        name: "active",
        type: "boolean",
      },
    ]);

    setCount(10);
    setFilename("sample");
    setJson("");
    setFile(null);
    setError(null);
  }

  async function copyJson() {
    if (!json) return;

    await navigator.clipboard.writeText(json);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      {/* Configuration */}

      <section className="rounded-2xl border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            JSON Configuration
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Configure the structure of your
            dummy JSON data.
          </p>
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

        {/* Number of records */}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">
            Number of records
          </label>

          <input
            type="number"
            min={1}
            max={10000}
            value={count}
            onChange={(event) => {
              const value =
                Number(event.target.value);

              setCount(
                Math.min(
                  10000,
                  Math.max(1, value || 1)
                )
              );
            }}
            className="w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2"
          />

          <p className="mt-2 text-xs text-neutral-500">
            Generate between 1 and 10,000 records.
          </p>
        </div>

        {/* Fields */}

        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-medium">
              Fields
            </label>

            <button
              type="button"
              onClick={addField}
              className="text-sm font-medium text-black hover:opacity-60"
            >
              + Add field
            </button>
          </div>

          <div className="space-y-3">
            {fields.map((field) => (
              <div
                key={field.id}
                className="flex gap-2"
              >
                {/* Field name */}

                <input
                  value={field.name}
                  onChange={(event) =>
                    updateField(
                      field.id,
                      "name",
                      event.target.value
                    )
                  }
                  placeholder="Field name"
                  className="min-w-0 flex-1 rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2"
                />

                {/* Field type */}

                <select
                  value={field.type}
                  onChange={(event) =>
                    updateField(
                      field.id,
                      "type",
                      event.target.value as JsonFieldType
                    )
                  }
                  className="w-28 rounded-lg border px-2 py-2.5 text-sm outline-none focus:ring-2"
                >
                  <option value="string">
                    String
                  </option>

                  <option value="number">
                    Number
                  </option>

                  <option value="boolean">
                    Boolean
                  </option>

                  <option value="email">
                    Email
                  </option>

                  <option value="date">
                    Date
                  </option>
                </select>

                {/* Remove */}

                <button
                  type="button"
                  onClick={() =>
                    removeField(field.id)
                  }
                  disabled={fields.length === 1}
                  className="w-10 rounded-lg border text-lg text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={`Remove ${field.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Actions */}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={generate}
            className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-80"
          >
            Generate JSON
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

      <section className="min-w-0 rounded-2xl border bg-white p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">
              Generated JSON
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Preview, copy or download your JSON
              file.
            </p>
          </div>

          {json && (
            <button
              type="button"
              onClick={copyJson}
              className="rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-neutral-50"
            >
              Copy
            </button>
          )}
        </div>

        {file ? (
          <>
            {/* File information */}

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
                    Records
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {count.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* JSON preview */}

            <div className="mb-6 overflow-hidden rounded-xl border">
              <div className="border-b bg-neutral-50 px-4 py-3 text-xs font-medium text-neutral-500">
                Preview
              </div>

              <pre className="max-h-[500px] overflow-auto bg-neutral-950 p-5 text-sm leading-6 text-white">
                {json}
              </pre>
            </div>

            {/* Download */}

            <DownloadButton file={file} />
          </>
        ) : (
          <div className="flex min-h-[500px] items-center justify-center rounded-xl border border-dashed">
            <div className="text-center">
              <p className="font-medium">
                No JSON generated
              </p>

              <p className="mt-1 text-sm text-neutral-500">
                Configure your fields and click
                Generate JSON.
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


export default JsonGenerator