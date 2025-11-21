import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("", "routes/layout.tsx", { id: "app" }, [
    route("inventory", "./routes/inventory.tsx", [
      route("types", "./pages/inventory/itemTypes/layout.tsx", [
        index("./pages/inventory/itemTypes/index.tsx"),
        route(":itemTypeId", "./pages/inventory/itemTypes/ItemTypePage.tsx"),
      ]),
      route("items", "./pages/inventory/items/layout.tsx", [
        index("./pages/inventory/items/index.tsx"),
      ]),
    ]),

    route("projects", "./routes/projects.tsx"),
    route("templates", "./routes/templates.tsx"),
    route("settings", "./routes/settings.tsx"),
  ]),

  route("error", "./routes/error.tsx"),
  route("*", "./routes/404.tsx"),
] satisfies RouteConfig;
