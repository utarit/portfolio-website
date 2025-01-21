import clsx from "classnames";

export const Card: React.FC<{
  children: React.ReactNode;
  variant?: "elevated" | "outlined";
}> = ({ children, variant = "elevated" }) => {
  return (
    <div
      className={clsx(
        "rounded-lg p-6 transition-all duration-200",
        variant === "elevated" && "bg-background-100 shadow-md",
        variant === "outlined" && "border border-surface-border",
      )}
    >
      {children}
    </div>
  );
};
