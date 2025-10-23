import { Moon, Sun } from "lucide-react";
import { Link } from "react-router";
import { GradientButton } from "~/components/primitives/GradientButton";
import useTheme from "~/hooks/useTheme";
import { auth } from "~/services/auth";

const NavigationButtons: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex gap-4 items-center">
      <button
        className="cursor-pointer px-4 py-2 rounded-lg font-semibold border-2 border-dracula-cyan text-dracula-cyan transition-all duration-300 hover:bg-dracula-cyan hover:text-dracula-background hover:shadow-[0_0_20px_rgba(139,233,253,0.4)]"
        onClick={() => {
          auth.login();
        }}
      >
        Login
      </button>
      <Link to="/signup">
        <GradientButton className="px-4 py-2 rounded-lg">
          Sign up
        </GradientButton>
      </Link>
      <button
        onClick={toggleTheme}
        className="cursor-pointer p-2.5 rounded-lg bg-dracula-current-line/70 hover:bg-dracula-current-line transition-all duration-200"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5 text-dracula-purple" />
        ) : (
          <Sun className="w-5 h-5 text-dracula-yellow" />
        )}
      </button>
    </div>
  );
};

export default NavigationButtons;
