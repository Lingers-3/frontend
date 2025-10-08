import type { Route } from "./+types/home";
import Landing from "~/pages/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pocketeer | Inventory & project management " },
    {
      name: "description",
      content:
        "Cloud-backed inventory and project management for hobbyists and micro-businesses.",
    },
  ];
}

export default function Home() {
  return <Landing />;
}
