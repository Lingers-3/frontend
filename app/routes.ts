import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  
  layout("routes/layout.tsx", [
    route("inventory", "./routes/inventory.tsx"),
    route("projects", "./routes/projects.tsx"),
    route("templates", "./routes/templates.tsx"),
    route("settings", "./routes/settings.tsx"),
  ]),

  route("*", "./routes/404.tsx"),
] satisfies RouteConfig;
