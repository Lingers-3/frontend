import SettingsPage from "~/pages/settings";
import type { Route } from "./+types/settings";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Settings" }];
}

export default function Settings() {
  return <SettingsPage />;
}
