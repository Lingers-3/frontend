import { Link } from "react-router";

const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block mb-8 animate-float">
          <span className="text-9xl">📦</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-dracula-purple">
            Manage your creative business
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 py-6 text-dracula-text-secondary max-w-3xl mx-auto">
          Cloud-backed inventory and project management for hobbyists and
          micro-businesses. Track items, manage projects, and grow your creative
          empire.
        </p>
        <div className="flex flex-row gap-4 justify-center mb-12">
          <Link
            to="/signup"
            className="cursor-pointer px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(189,147,249,0.4)]"
            style={{
              background: "linear-gradient(135deg, #8560c7, #bf5a99)",
            }}
          >
            Get started for free
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://play.google.com"
            className="inline-block transform hover:scale-105 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-14"
            />
          </a>
          <a
            href="https://www.apple.com/app-store/"
            className="inline-block transform hover:scale-105 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on the App Store"
              className="h-14"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
