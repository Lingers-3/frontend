import { ChevronRight, type LucideIcon } from "lucide-react";

interface SettingsOptionProps {
  label: string;
  description: string;
  Icon: LucideIcon;
  index: number;
  length: number;
}

export default function SettingsOption({
  label,
  description,
  Icon,
  index,
  length,
}: SettingsOptionProps) {
  return (
    <button
      key={label}
      className={`
        w-full cursor-pointer flex items-center justify-between p-4 
        bg-dracula-current-line hover:bg-[oklch(0.42_0.02_260)] 
        transition-colors border-b border-dracula-background last:border-b-0
        ${index === 0 ? "rounded-t-3xl" : ""}
        ${index === length - 1 ? "rounded-b-3xl" : ""}
      `}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-dracula-text-secondary" />
        <div className="text-left">
          <p className="text-dracula-text-primary text-sm font-medium">
            {label}
          </p>
          <p className="text-dracula-text-secondary text-xs">{description}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-dracula-text-secondary" />
    </button>
  );
}
