import JsonGenerator from "@/components/tools/json-generator";

const JsonGeneratorPage = () => {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            JSON Generator
          </h1>

          <p className="mt-3 max-w-2xl text-neutral-500">
            Generate dummy JSON data for testing,
            development and prototyping.
          </p>
        </div>

        <JsonGenerator />
      </div>
    </main>
  );
}

export default JsonGeneratorPage