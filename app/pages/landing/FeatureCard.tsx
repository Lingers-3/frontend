interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color,
}) => {
  return (
    <div
      className="rounded-xl p-8 bg-dracula-background transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow: "0 0 20px rgba(189, 147, 249, 0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 30px rgba(189, 147, 249, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 20px rgba(189, 147, 249, 0.3)";
      }}
    >
      <div
        className="mb-4 text-5xl"
        style={{
          filter: "drop-shadow(0 0 10px currentColor)",
          color,
        }}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3" style={{ color }}>
        {title}
      </h3>
      <p className="text-dracula-text-secondary">{description}</p>
    </div>
  );
};

export default FeatureCard;