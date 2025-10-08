import Navigation from "~/pages/landing/Navigation";
import EmptyBoxImg from "../asserts/empty-box.png";
import type { Route } from "./+types/404";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pocketeer | 404 Not found " },
    {
      name: "description",
      content:
        "The page you are looking for does not exist.",
    },
  ];
}

const Landing: React.FC = () => {
  return (
    <div className="font-sans bg-dracula-background text-dracula-foreground min-h-screen">
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-[6em] font-bold mb-4 text-dracula-purple">404</h1>
        <h2 className="text-4xl font-bold mb-4 text-dracula-purple">
          Page not found
        </h2>
        <img
          src={EmptyBoxImg}
          alt="Empty Box"
          className="w-64 h-64 my-12 animate-float"
        />
        <p className="text-xl text-dracula-text-secondary">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default Landing;
