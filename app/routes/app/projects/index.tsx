import type { Route } from "../+types";
import { ProjectsIndex } from "~/modules/projects/pages";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Projects | Pocketeer" }];
}

export default function Projects() {
  return <ProjectsIndex />;
}
