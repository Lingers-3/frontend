import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { AccountSettings } from "./account/AccountSettings";
import { AppearanceSettings } from "./AppearanceSettings";
import { HelpSettings } from "./HelpSettings";
import { NotificationsSettings } from "./NotificationsSettings";
import { PrivacySettings } from "./PrivacySettings";

interface SettingsOptionProps {
  label: string;
  description: string;
  Icon: LucideIcon;
  index: number;
  length: number;
}

function getDialogContent(label: string) {
  switch (label) {
    case "Account":
      return <AccountSettings />;
    case "Notifications":
      return <NotificationsSettings />;
    case "Privacy & Security":
      return <PrivacySettings />;
    case "Appearance":
      return <AppearanceSettings />;
    case "Help & Support":
      return <HelpSettings />;
    default:
      return <></>;
  }
}

export default function SettingsOption({
  label,
  description,
  Icon,
  index,
  length,
}: SettingsOptionProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          key={label}
          className={`
            w-full cursor-pointer flex items-center justify-between p-4
            bg-dracula-current-line hover:bg-dracula-current-line/60
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
              <p className="text-dracula-text-secondary text-xs">
                {description}
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-dracula-text-secondary" />
        </button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/10 backdrop-blur-sm" />
      <DialogContent className="rounded-2xl bg-dracula-background border-dracula-current-line">
        <DialogHeader>
          <DialogTitle className="text-dracula-text-primary">
            {label}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">{getDialogContent(label)}</div>
      </DialogContent>
    </Dialog>
  );
}
