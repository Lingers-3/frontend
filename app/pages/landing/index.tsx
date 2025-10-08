import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Navigation from "./Navigation";

const Landing: React.FC = () => {
  return (
    <div className="font-sans bg-dracula-background text-dracula-foreground min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Landing;