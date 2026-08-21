import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes } from "react";

interface CustomTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

const CustomTextarea = ({
  className,
  label,
  id,
  ...props
}: CustomTextareaProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium"
      >
        {label}
      </label>

      <textarea
        id={id}
        {...props}
        className={cn(
          "w-full rounded-lg border px-3 py-2.5 outline-none focus:outline-none! resize-none aria-invalid:border-red-500!",
          className
        )}
      />
    </div>
  );
};

export default CustomTextarea;