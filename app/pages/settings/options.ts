import {
  User as UserIcon,
  Bell,
  Shield,
  Palette,
  HelpCircle,
} from "lucide-react";

export const settingsOptions = [
  { icon: UserIcon, label: "Account", description: "Manage your account" },
  { icon: Bell, label: "Notifications", description: "Configure alerts" },
  {
    icon: Shield,
    label: "Privacy & Security",
    description: "Control your data",
  },
  {
    icon: Palette,
    label: "Appearance",
    description: "Customize your experience",
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    description: "Get assistance",
  },
];