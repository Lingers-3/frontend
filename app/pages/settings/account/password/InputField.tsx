import { cn } from "~/lib/utils";

export type FieldName = "newPassword" | "repeatPassword";

export default function InputField(props: {
  field: FieldName;
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  touched?: boolean;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  const {
    field,
    label,
    value,
    placeholder,
    type = "password",
    touched,
    error,
    onChange,
    onBlur,
  } = props;
  const inputId = `${field}-input`;
  const errId = `${field}-error`;

  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm">{label}</span>
      <input
        id={inputId}
        name={field}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={cn(
          "rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-0",
          error ? "border-red-500" : "border-dracula-selection"
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errId : undefined}
        placeholder={placeholder}
      />
      {touched && error ? (
        <p id={errId} className="text-xs text-red-500 mt-1">
          {error}
        </p>
      ) : null}
    </label>
  );
}
