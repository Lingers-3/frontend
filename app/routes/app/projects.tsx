import type { Route } from "./+types/projects";
import AppEmpty from "~/components/app/AppEmpty";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Projects | Pocketeer" }];
}

export default function Projects() {
  return <AppEmpty />;
}
