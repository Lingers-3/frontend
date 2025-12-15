import { ProjectPage } from "~/modules/projects/pages/project-page";
import type { Route } from "./+types/projectPage";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Project | Pocketeer" }];
}

export default function InventoryLayout() {
  return <ProjectPage />;
}
