import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface CustomInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const CustomInput = ({
  className,
  label,
  id,
  ...props
}: CustomInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="block font-medium"
      >
        {label}
      </label>

      <input
        id={id}
        {...props}
        className={cn(
          "w-full rounded-lg border px-3 py-2.5 outline-none focus:outline-none aria-invalid:border-red-500!",
          className
        )}
      />
    </div>
  );
};

export default CustomInput;