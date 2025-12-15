import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("", "routes/app/index.tsx", { id: "app" }, [
    route("inventory", "./routes/app/inventory/index.tsx", [
      route("item-types", "./routes/app/inventory/item-types/layout.tsx", [
        index("./routes/app/inventory/item-types/index.tsx"),
        route(":itemTypeId", "./routes/app/inventory/item-types/itemTypePage.tsx"),
      ]),
      route("items", "./routes/app/inventory/items/layout.tsx", [
        index("./routes/app/inventory/items/index.tsx"),
      ]),
    ]),

    route("projects", "./routes/app/projects/layout.tsx", [
        index("./routes/app/projects/index.tsx"), 
        route(":projectId", "./routes/app/projects/projectPage.tsx"), 
    ]),

    route("templates", "./routes/app/templates.tsx"),
    route("settings", "./routes/app/settings.tsx"),
  ]),

  route("error", "./routes/error.tsx"),
  route("*", "./routes/404.tsx"),
] satisfies RouteConfig;
