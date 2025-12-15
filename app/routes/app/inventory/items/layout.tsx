import { Outlet } from "react-router";

export default function ItemsLayout() {
  return (
    <div className="p-6 h-full">
      <Outlet />
    </div>
  );
}