import { createSignal, For, Show } from "solid-js";

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", ""];

interface PhoneLockScreenProps {
    backgroundImage?: string;
    text: string;
    password: string;
    onUnlock: () => void;
}

export function PhoneLockScreen(props: PhoneLockScreenProps) {
    const [enteredPassword, setEnteredPassword] = createSignal("");
    const [error, setError] = createSignal(false);
    const [success, setSuccess] = createSignal(false);
    const [shakeKey, setShakeKey] = createSignal(0);

    const lockScreenStyle = () => ({
        background: props.backgroundImage
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${props.backgroundImage})`
            : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        "background-size": "cover",
        "background-position": "center",
    });

    const handleButtonClick = (digit: string) => {
        if (!digit || enteredPassword().length >= 4) return;

        const updatedPassword = enteredPassword() + digit;
        setEnteredPassword(updatedPassword);

        if (updatedPassword.length === 4) {
            if (updatedPassword === props.password) {
                setSuccess(true);
                setTimeout(() => {
                    props.onUnlock();
                    setSuccess(false);
                }, 1000);
            } else {
                setError(true);
                setShakeKey(shakeKey() + 1);
                setTimeout(() => {
                    setEnteredPassword("");
                    setError(false);
                }, 1000);
            }
        }
    };

    return (
        <div
            class="w-full h-full flex flex-col justify-between text-white overflow-hidden relative"
            style={lockScreenStyle()}
        >
            {/* Status/Time Area */}
            <div class="pt-12 pb-8 text-center">
                <div class="text-6xl font-thin mb-2">
                    {new Date().toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </div>
                <div class="text-lg font-light opacity-80">
                    {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            </div>

            {/* Lock Screen Content */}
            <div class="flex flex-col items-center flex-1 px-6">
                <Show when={props.text}>
                    <p class="text-lg mb-4 text-center font-light opacity-90 max-w-[280px]">
                        {props.text}
                    </p>
                </Show>

                {/* Password Input */}
                <div class="mb-3">
                    <Show when={error()}>
                        <p
                            class="text-red-400 text-center text-sm"
                            style={{
                                animation: `shake-${shakeKey()} 0.5s`,
                            }}
                        >
                            Incorrect Passcode
                        </p>
                    </Show>
                    <Show when={success()}>
                        <p class="text-green-400 text-center text-sm">Access Granted</p>
                    </Show>
                    <Show when={!error() && !success()}>
                        <p class="text-sm text-center opacity-75">Enter Passcode</p>
                    </Show>
                    <div class="flex space-x-4 justify-center my-4">
                        <For each={[0, 1, 2, 3]}>
                            {(i) => (
                                <div
                                    class={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${i < enteredPassword().length
                                            ? "bg-white border-white scale-110"
                                            : "border-white border-opacity-50"
                                        }`}
                                />
                            )}
                        </For>
                    </div>
                </div>

                {/* Keypad */}
                <div class="grid grid-cols-3 gap-3 gap-x-6 mb-8">
                    <For each={numbers}>
                        {(val) => (
                            <button
                                class={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-light transition-all duration-150 ${val
                                        ? "bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 active:bg-opacity-30 active:scale-95"
                                        : "invisible"
                                    }`}
                                onClick={() => handleButtonClick(val)}
                                disabled={!val}
                            >
                                {val}
                            </button>
                        )}
                    </For>
                </div>
            </div>

            <style>
                {`
                    @keyframes shake-${shakeKey()} {
                        0%, 100% { transform: translateX(0); }
                        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                        20%, 40%, 60%, 80% { transform: translateX(10px); }
                    }
                `}
            </style>
        </div>
    );
}