import { Link } from "react-router";
import NavigationButtons from "./NavigationButtons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";

const Navigation: React.FC = () => {
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
          <div className="hidden sm:flex items-center space-x-6">
            <NavigationButtons />
          </div>
          <div className="sm:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="cursor-pointer p-5">
                  <Menu />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit mt-2 mr-4 bg-dracula-background rounded-xl">
                <NavigationButtons />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
