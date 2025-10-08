const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 bg-dracula-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-1 gap-8 mb-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">📦</span>
              <span className="text-xl font-bold text-dracula-purple">
                Pocketeer
              </span>
            </div>
            <p className="text-dracula-text-secondary">
              Inventory & project management for creative minds.
            </p>
          </div>
          <div
            className="pt-12 text-center text-dracula-text-secondary"
            style={{
              borderTop: "1px solid",
              borderImage:
                "linear-gradient(to right, var(--color-dracula-background), var(--color-dracula-current-line), var(--color-dracula-background)) 1",
            }}
          >
            <p>&copy; 2025 Pocketeer. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;