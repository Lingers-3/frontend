import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";

export function ViewModeSwitch() {
  const location = useLocation();

  const isTypes = location.pathname.includes("/inventory/types");

  return (
    <div className="relative inline-flex w-32 h-10 rounded-full px-1 items-center bg-dracula-foreground/10">
      <div
        className={cn(
          "absolute top-1 h-8 w-[60px] rounded-full bg-dracula-background shadow transition-all duration-300",
          isTypes ? "left-1" : "left-[calc(100%-64px)]"
        )}
      />

      <Link
        to="/inventory/types"
        className={cn(
          "relative z-10 flex-1 text-center text-sm transition-colors px-2",
          isTypes ? "text-foreground font-medium" : "text-muted-foreground"
        )}
      >
        Types
      </Link>

      <Link
        to="/inventory/items"
        className={cn(
          "relative z-10 flex-1 text-center text-sm transition-colors px-2",
          !isTypes ? "text-foreground font-medium" : "text-muted-foreground"
        )}
      >
        Items
      </Link>
    </div>
  );
}
