interface ResultBarProps {
  label: string;
  percentage: string;
  color: string;
}

export const ResultBar = ({ label, percentage, color }: ResultBarProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 sm:items-center sm:gap-2">
      <span className="text-sm sm:col-span-2 mb-2 sm:mb-0">{label}</span>
      <div className="sm:col-span-3 flex items-center space-x-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`${color} h-2.5 rounded-full`}
            style={{
              width: `${percentage}%`,
            }}
          >
          </div>
        </div>
        <span className="text-sm font-medium w-12 text-right">
          {percentage}%
        </span>
      </div>
    </div>
  );
};
