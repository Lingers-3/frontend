import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("", "routes/app/index.tsx", { id: "app" }, [
    route("inventory", "./routes/app/inventory/index.tsx", [
      route("types", "./routes/app/inventory/itemTypes/layout.tsx", [
        index("./routes/app/inventory/itemTypes/index.tsx"),
        route(":itemTypeId", "./routes/app/inventory/itemTypes/itemTypePage.tsx"),
      ]),
      route("items", "./routes/app/inventory/items/layout.tsx", [
        index("./routes/app/inventory/items/index.tsx"),
      ]),
    ]),

    route("projects", "./routes/app/projects.tsx"),
    route("templates", "./routes/app/templates.tsx"),
    route("settings", "./routes/app/settings.tsx"),
  ]),

  route("error", "./routes/error.tsx"),
  route("*", "./routes/404.tsx"),
] satisfies RouteConfig;
