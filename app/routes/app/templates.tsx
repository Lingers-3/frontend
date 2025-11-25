import type { Route } from "./+types/templates";
import AppEmpty from "~/components/app/AppEmpty";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Templates | Pocketeer" }];
}

export default function Templates() {
  return <AppEmpty />;
}
