import { FileGenerator } from "@/components/tools/file-generator";

export default function DummyFilesPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-medium text-neutral-500">
            Developer Utilities
          </p>

          <h1 className="text-4xl font-semibold tracking-tight">
            Dummy File Generator
          </h1>

          <p className="mt-4 text-lg text-neutral-600">
            Generate dummy files instantly for development,
            testing, and API integration.
          </p>
        </header>

        <FileGenerator />
      </div>
    </main>
  );
}