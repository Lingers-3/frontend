import { Moon, Sun } from "lucide-react";
import { Link } from "react-router";
import useTheme from "~/hooks/useTheme";

const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full z-50 py-4 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="cursor-pointer flex items-center space-x-3">
            <span className="text-4xl">📦</span>
            <span className="text-2xl font-bold text-dracula-purple">
              Pocketeer
            </span>
          </Link>
          <div className="flex items-center space-x-6"></div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="cursor-pointer px-4 py-2 rounded-lg font-semibold border-2 border-dracula-cyan text-dracula-cyan transition-all duration-300 hover:bg-dracula-cyan hover:text-dracula-background hover:shadow-[0_0_20px_rgba(139,233,253,0.4)]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="cursor-pointer px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(189,147,249,0.4)]"
              style={{
                background: "linear-gradient(135deg, #8560c7, #bf5a99)",
              }}
            >
              Sign Up
            </Link>
            <button
              onClick={toggleTheme}
              className="cursor-pointer p-2.5 rounded-lg bg-dracula-current-line hover:bg-dracula-selection transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-dracula-purple" />
              ) : (
                <Sun className="w-5 h-5 text-dracula-yellow" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
