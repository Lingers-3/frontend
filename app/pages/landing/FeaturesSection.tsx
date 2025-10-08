import FeatureCard from "./FeatureCard";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: "📋",
      title: "Inventory management",
      description:
        "Track items with custom tags, expiration dates, and automatic low-stock alerts. Never run out of supplies again.",
      color: "var(--color-dracula-purple)",
    },
    {
      icon: "🎯",
      title: "Project tracking",
      description:
        "Manage projects from planning to completion. Track resources, time, and revenue all in one place.",
      color: "var(--color-dracula-pink)",
    },
    {
      icon: "☁️",
      title: "Cloud sync",
      description:
        "Access your data anywhere, anytime. Seamless synchronization across all your devices.",
      color: "var(--color-dracula-cyan)",
    },
    {
      icon: "📊",
      title: "Analytics & Insights",
      description:
        "Get detailed metrics on consumption rates, project profitability, and financial trends.",
      color: "var(--color-dracula-green)",
    },
    {
      icon: "📱",
      title: "Smart notifications",
      description:
        "Stay informed with alerts for expiring items, low stock, and approaching deadlines.",
      color: "var(--color-dracula-yellow)",
    },
    {
      icon: "📝",
      title: "Project templates",
      description:
        "Save time with reusable templates for your most common projects and workflows.",
      color: "var(--color-dracula-orange)",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 px-4 border-t-[5px] border-b-[5px] border-dashed border-dracula-pink"
      style={{
        background:
          "linear-gradient(135deg, var(--color-dracula-background) 0%, var(--color-dracula-current-line) 50%, var(--color-dracula-background) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 pb-8 text-dracula-purple">
          Everything you need to succeed
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;