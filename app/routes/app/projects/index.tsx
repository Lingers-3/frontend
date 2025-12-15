import ProjectsIndex from "~/modules/projects/pages/all";
import type { Route } from "../+types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Projects | Pocketeer" }];
}

export default function Projects() {
  return <ProjectsIndex />;
}
