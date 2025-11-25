import ItemTypePage from "~/pages/inventory/itemTypes/ItemTypePage";
import type { Route } from "./+types/itemTypePage";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Item type | Pocketeer" }];
}

export default function InventoryLayout() {
  return <ItemTypePage />
}
