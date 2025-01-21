import clsx from "classnames";

export const Input: React.FC<{
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, error, placeholder, value, onChange }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <input
        className={clsx(
          "w-full px-3 py-2 rounded-md",
          "border border-surface-border",
          "bg-background-50",
          "text-text-primary placeholder-text-tertiary",
          "focus:outline-none focus:ring-2 focus:ring-primary-500",
          "transition-all duration-200",
          error && "border-error-500 focus:ring-error-500",
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-sm text-error-500">{error}</p>}
    </div>
  );
};
