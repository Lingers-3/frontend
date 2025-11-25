import ItemsIndex from "~/pages/inventory/items";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Items | Pocketeer" }];
}

export default function InventoryLayout() {
  return <ItemsIndex />
}
