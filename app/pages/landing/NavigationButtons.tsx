import { Link } from "react-router";
import { GradientButton } from "~/components/primitives/GradientButton";
import ToggleThemeButton from "~/components/primitives/ToggleThemeButton";
import { auth } from "~/services/auth";

const NavigationButtons: React.FC = () => {
  return (
    <div className="flex gap-4 items-center">
      <button
        className="cursor-pointer px-4 py-2 rounded-xl font-semibold border-2 border-dracula-cyan text-dracula-cyan transition-all duration-300 hover:bg-dracula-cyan hover:text-dracula-background hover:shadow-[0_0_20px_rgba(139,233,253,0.4)]"
        onClick={auth.login}
      >
        Login
      </button>
      <GradientButton className="px-4 py-2" onClick={auth.login}>
        Sign up
      </GradientButton>
      <ToggleThemeButton />
    </div>
  );
};

export default NavigationButtons;
