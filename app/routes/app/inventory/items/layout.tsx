import { Outlet } from "react-router";

export default function ItemsLayout() {
  return (
    <div className="p-7 pt-0 h-full">
      <Outlet />
    </div>
  );
}