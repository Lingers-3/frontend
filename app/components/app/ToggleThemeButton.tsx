import { Moon, Sun } from "lucide-react";
import useTheme from "~/hooks/use-theme";
import { cn } from "~/lib/utils";

interface ToggleThemeButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export default function ToggleThemeButton({
  className,
  ...props
}: ToggleThemeButtonProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "cursor-pointer p-2.5 rounded-xl bg-dracula-current-line/70 hover:bg-dracula-current-line transition-all duration-200",
        className
      )}
      aria-label="Toggle theme"
      {...props}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-dracula-purple" />
      ) : (
        <Sun className="w-5 h-5 text-dracula-yellow" />
      )}
    </button>
  );
}
