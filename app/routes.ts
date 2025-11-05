import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("", "routes/layout.tsx", { id: "app" }, [
    route("inventory", "./routes/inventory.tsx"),
    route("projects", "./routes/projects.tsx"),
    route("templates", "./routes/templates.tsx"),
    route("settings", "./routes/settings.tsx"),
  ]),

  route("error", "./routes/error.tsx"),

  route("*", "./routes/404.tsx"),
] satisfies RouteConfig;
