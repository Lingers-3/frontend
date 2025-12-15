import { Outlet } from "react-router";

export default function ItemTypesLayout() {
  return (
    <div className="p-7 pt-0 h-full">
      <Outlet />
    </div>
  );
}
