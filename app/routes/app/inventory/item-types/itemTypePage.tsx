import ItemTypePage from "~/modules/inventory/pages/item-types/ItemTypePage";
import type { Route } from "./+types/itemTypePage";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Item type | Pocketeer" }];
}

export default function InventoryLayout() {
  return <ItemTypePage />
}
