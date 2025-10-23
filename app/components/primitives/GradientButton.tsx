import { cn } from "~/lib/utils";

interface GradientButtonProps 
  extends React.HTMLAttributes<HTMLButtonElement> {}

export const GradientButton = ({
  className,
  children,
  ...props
}: GradientButtonProps) => {
  return (
    <button
      className={cn(
        "cursor-pointer px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(189,147,249,0.4)]",
        className
      )}
      style={{
        background: "linear-gradient(135deg, #8560c7, #bf5a99)",
      }}
      {...props}
    >
      {children}
    </button>
  );
};
