interface ResultBarProps {
    label: string;
    percentage: string;
    color: string;
}

export function ResultBar(props: ResultBarProps) {
    return (
        <div class="grid grid-cols-1 sm:grid-cols-5 sm:items-center sm:gap-2">
            <span class="text-sm sm:col-span-2 mb-2 sm:mb-0">
                {props.label}
            </span>
            <div class="sm:col-span-3 flex items-center space-x-2">
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        class={`${props.color} h-2.5 rounded-full`}
                        style={{
                            width: `${props.percentage}%`,
                        }}
                    />
                </div>
                <span class="text-sm font-medium w-12 text-right">
                    {props.percentage}%
                </span>
            </div>
        </div>
    );
}