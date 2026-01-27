import { onMount, onCleanup, createSignal, type JSX } from "solid-js";

interface Props {
    children: JSX.Element;
    onClose: () => void;
}

const PhoneIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="inline mx-2"
            viewBox="0 0 16 16"
        >
            <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
        </svg>
    );
};

export function Dialog(props: Props) {
    const [isVisible, setIsVisible] = createSignal(false);

    onMount(() => {
        // Prevent body scroll when dialog is open
        document.body.style.overflow = "hidden";
        // Trigger animation
        setTimeout(() => setIsVisible(true), 10);
    });

    onCleanup(() => {
        document.body.style.overflow = "unset";
    });

    const handleBackdropClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget && props.onClose) {
            props.onClose();
        }
    };

    return (
        <div
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-md"
            onClick={handleBackdropClick}
        >
            <div
                class="relative transition-all duration-200"
                style={{
                    transform: isVisible() ? "scale(1)" : "scale(0.8)",
                    opacity: isVisible() ? "1" : "0",
                }}
                onClick={(e: MouseEvent) => e.stopPropagation()}
            >
                {/* Tablet Frame */}
                <div class="relative w-[900px] h-[600px] max-w-[90vw] max-h-[85vh] bg-gray-900 rounded-3xl ring-4 ring-gray-700 shadow-2xl overflow-hidden">
                    {/* Screen Bezel */}
                    <div class="absolute inset-3 bg-black rounded-2xl overflow-hidden flex flex-col">
                        {/* Header Bar */}
                        <div class="flex-shrink-0 bg-gray-800 border-b border-gray-700">
                            <div class="flex justify-between items-center px-6 py-4">
                                <h3 class="text-xl font-bold text-white flex items-center">
                                    <PhoneIcon />
                                    Detective's Tablet
                                    <PhoneIcon />
                                </h3>
                                <button
                                    onClick={props.onClose}
                                    aria-label="Close dialog"
                                    class="p-2 rounded-full bg-red-600 hover:bg-red-500 text-gray-300 hover:text-white transition-all duration-200 active:scale-90"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div class="flex-1 overflow-hidden bg-gray-800">
                            {props.children}
                        </div>
                    </div>

                    {/* Home Button */}
                    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gray-600 rounded-full" />
                </div>
            </div>
        </div>
    );
}
