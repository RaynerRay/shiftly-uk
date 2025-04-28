import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type TextAreaInputProps = {
  label: string;
  register: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  name: string;
  errors: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  placeholder?: string;
  className?: string;
  required?: boolean;
};

export function TextAreaInput({
  label,
  register,
  name,
  errors,
  placeholder,
  className = "col-span-full",
  required = true,
}: TextAreaInputProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={`${name}`} className="flex items-center">
        {label}
        {!required && <span className="ml-1 text-sm text-gray-500">(Optional)</span>}
      </Label>
      <Textarea
        {...register(`${name}`, { required: required })}
        id={`${name}`}
        name={`${name}`}
        placeholder={placeholder ? placeholder : ""}
        className={errors[`${name}`] ? "border-red-500 focus-visible:ring-red-500" : ""}
      />
      {errors[`${name}`] && (
        <span className="text-red-600 text-sm">{label} is required</span>
      )}
    </div>
  );
}