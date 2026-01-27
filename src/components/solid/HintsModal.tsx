import { createSignal, For, Show } from "solid-js";
import { useLanguage } from "../../contexts/LanguageContext";

export function HintsModal() {
    const [isOpen, setIsOpen] = createSignal(false);
    const { t } = useLanguage();

    const hints = () => [
        // Chest hint
        {
            name: t("hints.names.chest"),
            help: t("chestPuzzle.hint"),
            solution: t("chestPuzzle.solution"),
        },
        // Cork board hint
        {
            name: t("hints.names.corkBoard"),
            help: t("cameraReport.hint"),
            solution: t("cameraReport.solution"),
        },
        // Phone hints
        {
            name: t("hints.names.phoneZehra"),
            help: t("hiddenMessages.hints.0.help"),
            solution: t("hiddenMessages.hints.0.solution"),
        },
        {
            name: t("hints.names.phoneMahmut"),
            help: t("hiddenMessages.hints.1.help"),
            solution: t("hiddenMessages.hints.1.solution"),
        },
        {
            name: t("hints.names.phoneKerim"),
            help: t("hiddenMessages.hints.2.help"),
            solution: t("hiddenMessages.hints.2.solution"),
        },
        {
            name: t("hints.names.phoneSemra"),
            help: t("hiddenMessages.hints.3.help"),
            solution: t("hiddenMessages.hints.3.solution"),
        },
        {
            name: t("hints.names.phoneRiza"),
            help: t("hiddenMessages.hints.4.help"),
            solution: t("hiddenMessages.hints.4.solution"),
        },
    ];

    return (
        <>
            {/* Hints Button - Bottom Left of Table */}
            <div class="relative flex justify-end mb-4">
                <button
                    onClick={() => setIsOpen(true)}
                    class="bg-green-600 hover:bg-green-700 text-black font-mono px-4 py-2 rounded-lg shadow-lg transition-colors border-2 border-green-500 hover:shadow-green-500/30"
                >
                    📁 {t("hints.buttonText")}
                </button>
            </div>

            {/* Modal */}
            <Show when={isOpen()}>
                <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
                    <div class="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden border-4 border-green-600">
                        {/* Header */}
                        <div class="bg-gradient-to-r from-green-600 to-green-700 text-black p-4 flex justify-between items-center">
                            <h2 class="text-xl font-bold flex items-center gap-2 font-mono">
                                📁 {t("hints.modalTitle")}
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                class="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white font-bold transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        <div class="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
                            <div class="space-y-4">
                                <For each={hints()}>
                                    {(hint, index) => (
                                        <div class="bg-gray-900 border-2 border-green-500 rounded-lg p-4 shadow-md">
                                            {/* File Header */}
                                            <div class="bg-green-600 text-black px-3 py-1 rounded-t-lg -mx-4 -mt-4 mb-3 flex items-center gap-2">
                                                <span class="bg-green-800 text-green-100 px-2 py-1 rounded text-xs font-bold font-mono">
                                                    {t("hints.fileNumber")}{String(index() + 1).padStart(3, "0")}
                                                </span>
                                                <span class="font-bold font-mono">{hint.name}</span>
                                            </div>

                                            <div class="flex justify-between items-center">
                                                <div>
                                                    <p class="text-green-300 text-sm mb-1 font-mono">
                                                        $ {t("hints.evidence")}: {hint.name}
                                                    </p>
                                                    <p class="text-green-400 text-xs font-mono">
                                                        $ {t("hints.status")}: {t("hints.statusClassified")}
                                                    </p>
                                                </div>
                                                <div class="flex gap-2">
                                                    <button
                                                        onClick={() => alert(hint.help)}
                                                        class="text-sm bg-green-600 hover:bg-green-700 text-black font-mono font-bold px-3 py-1 rounded border border-green-500 transition-colors"
                                                    >
                                                        &gt;&gt; {t("hints.hintButton")}
                                                    </button>
                                                    <button
                                                        onClick={() => alert(hint.solution)}
                                                        class="text-sm bg-red-600 hover:bg-red-700 text-white border border-red-500 font-mono font-bold px-3 py-1 rounded transition-colors"
                                                    >
                                                        &gt;&gt; {t("hints.answerButton")}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </For>
                            </div>

                            {/* Footer */}
                            <div class="mt-6 text-center">
                                <p class="text-green-400 text-sm font-medium font-mono">
                                    🔐 {t("hints.confidentialAccess")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Show>
        </>
    );
}