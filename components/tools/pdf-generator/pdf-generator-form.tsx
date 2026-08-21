import * as z from "zod/v3";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/common/custom-input";
import { Controller, useForm } from "react-hook-form";
import { GeneratedFile } from "@/types/tools";
import { Dispatch, useState } from "react";
import { generatePdfFile } from "@/lib/generators/pdf";
import CustomTextarea from "@/components/common/custom-textarea";
import { Button } from "@/components/ui/button";

const pdfGeneratorSchema = z.object({
    fileName: z.string().trim().min(1, "Filename is required"),
    content: z.string().trim().min(1, "Content is required"),
    pageCount: z.number().min(1, "Must be greater then 1.").max(100, "Must be less then 100."),
});

const PdfGeneratorForm = ({ file, setFile }: { file: GeneratedFile | null, setFile: React.Dispatch<React.SetStateAction<GeneratedFile | null>> }) => {
    type PdfGenerateFormValues = z.infer<typeof pdfGeneratorSchema>;
    const [isGenerating, setIsGenerating] = useState(false);

    const { control, handleSubmit, reset } = useForm<PdfGenerateFormValues>({
        defaultValues: {
            fileName: "",
            content: "Example Text",
            pageCount: 1,
        },
        resolver: zodResolver(pdfGeneratorSchema),
    });
    async function onSubmit(data: PdfGenerateFormValues) {
        try {
            setFile(null);
            setIsGenerating(true);

            const generated =
                await generatePdfFile({
                    content: data.content,
                    filename: data.fileName,
                    pageCount: data.pageCount,
                });

            setFile(generated);
        } catch (error) {
            setFile(null);
        } finally {
            setIsGenerating(false);
        }
    }

    const resetPdfGeneration = () => {
        reset()
        setFile(null)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Controller control={control} name="fileName" render={({ field, fieldState, formState }) => {
                return (
                    <div className="flex flex-col gap-2">
                        <CustomInput id="file-name" aria-invalid={fieldState.invalid} label="Filename" {...field} placeholder="sample" />
                        {
                            fieldState.invalid && <p className="text-red-600 text-sm">{fieldState.error?.message}</p>
                        }
                    </div>
                )
            }} />

<Controller
  control={control}
  name="pageCount"
  render={({ field, fieldState }) => {
    return (
      <div>
        <CustomInput
          id="page-count"
          type="number"
          aria-invalid={fieldState.invalid}
          label="Number of pages"
          {...field}
          onChange={(event) =>
            field.onChange(event.target.valueAsNumber)
          }
          placeholder="1"
          min={1}
          max={100}
        />

        {fieldState.invalid && (
          <p className="text-red-600 text-sm">
            {fieldState.error?.message}
          </p>
        )}
      </div>
    );
  }}
/>

            <Controller control={control} name="content" render={({ field, fieldState, formState }) => {
                return (
                    <div>
                        <CustomTextarea
                            label="Content"
                            id="content"
                            rows={12}
                            aria-invalid={fieldState.invalid}
                            {...field}
                            placeholder="Enter PDF content..."
                        />
                        {
                            fieldState.invalid && <p className="text-red-600">{fieldState.error?.message}</p>
                        }
                    </div>
                )
            }} />

            <div className="flex gap-3">
                <Button
                    disabled={isGenerating}
                    className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isGenerating
                        ? "Generating..."
                        : "Generate PDF"}
                </Button>

                <Button
                    type="button"
                    onClick={resetPdfGeneration}
                    className="rounded-lg border px-4 py-3 text-sm font-medium transition hover:bg-neutral-50"
                >
                    Reset
                </Button>
            </div>
        </form>
    )
}

export default PdfGeneratorForm