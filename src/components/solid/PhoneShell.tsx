import { onMount, onCleanup, createSignal, type JSX } from "solid-js";
import { useLanguage } from "../../contexts/LanguageContext";

interface PhoneShellProps {
    children: JSX.Element;
    class?: string;
    onClose?: () => void;
    musicControls?: {
        isPlaying: boolean;
        onToggle: () => void;
    };
}

export function PhoneShell(props: PhoneShellProps) {
    const [isVisible, setIsVisible] = createSignal(false);

    onMount(() => {
        // Prevent body scroll when phone is open
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
            class={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-md ${props.class || ""}`}
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
                {/* Phone Frame */}
                <div class="relative w-80 h-screen max-h-[min(700px,95vh)] bg-black rounded-3xl ring-2 ring-gray-700 shadow-2xl overflow-hidden">
                    {/* Screen Bezel */}
                    <div class="absolute inset-2 bg-gray-900 rounded-3xl overflow-hidden flex flex-col">
                        {/* Status Bar - Fixed at top */}
                        <div class="absolute top-0 left-0 right-0 z-20 bg-black">
                            <StatusBar musicControls={props.musicControls} onClose={props.onClose} />
                        </div>

                        {/* Screen Content */}
                        <div class="flex-1 pt-8 overflow-hidden">
                            {props.children}
                        </div>
                    </div>

                    {/* Home Indicator */}
                    <div class="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white bg-opacity-30 rounded-full" />

                    {/* Side Buttons */}
                    <div class="absolute left-0 top-20 w-1 h-8 bg-gray-600 rounded-r-sm" />
                    <div class="absolute left-0 top-32 w-1 h-12 bg-gray-600 rounded-r-sm" />
                    <div class="absolute left-0 top-48 w-1 h-12 bg-gray-600 rounded-r-sm" />
                    <div class="absolute right-0 top-32 w-1 h-16 bg-gray-600 rounded-l-sm" />
                </div>
            </div>
        </div>
    );
}

function StatusBar(props: {
    musicControls?: { isPlaying: boolean; onToggle: () => void };
    onClose?: () => void;
}) {
    const { t } = useLanguage();

    const formatTime = () => {
        return new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    return (
        <div class="flex items-center justify-between px-4 py-2 text-white text-sm font-medium">
            <div class="flex items-center space-x-1">
                <span>{formatTime()}</span>
            </div>

            <div class="flex items-center space-x-2">
                {/* Music Control */}
                {props.musicControls && (
                    <button
                        onClick={props.musicControls.onToggle}
                        class="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    >
                        {props.musicControls.isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                                <rect x="6" y="4" width="4" height="16"></rect>
                                <rect x="14" y="4" width="4" height="16"></rect>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        )}
                    </button>
                )}

                {/* Signal bars */}
                <div class="flex items-end space-x-0.5">
                    <div class="w-1 h-1 bg-white rounded-full"></div>
                    <div class="w-1 h-2 bg-white rounded-sm"></div>
                    <div class="w-1 h-3 bg-white rounded-sm"></div>
                    <div class="w-1 h-4 bg-white rounded-sm"></div>
                </div>

                {/* WiFi */}
                <div class="w-4 h-3 ml-1">
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-full h-full"
                    >
                        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                    </svg>
                </div>

                {/* Battery */}
                <div class="flex items-center space-x-1">
                    <div class="w-6 h-3 border border-white rounded-sm relative">
                        <div class="absolute inset-0.5 bg-white rounded-sm"></div>
                        <div class="absolute -right-0.5 top-1 w-0.5 h-1 bg-white rounded-r-sm"></div>
                    </div>
                    <span class="text-xs">100%</span>
                </div>

                {/* Close Button */}
                {props.onClose && (
                    <button
                        onClick={props.onClose}
                        class="w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200"
                        aria-label={t("phone.closeButton")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}