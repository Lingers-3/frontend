import type { Route } from "./+types/inventory";
import AppEmpty from "~/components/app/AppEmpty";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Inventory" }];
}

export default function Inventory() {
  return <AppEmpty />;
}
