import { createSignal, onMount, Show, For } from "solid-js";
import { useLanguage } from "../../contexts/LanguageContext";
import { Dialog } from "./Dialog";
import { PhoneShell } from "./PhoneShell";
import { PhoneLockScreen } from "./PhoneLockScreen";
import { ChatApp } from "./ChatApp";
import { HintsModal } from "./HintsModal";
import { FinalChat } from "./FinalChat";
import { Button } from "./Button";
import type { Contact } from "../../types/game";
import {
    zehraContacts,
    mahmutContacts,
    semraContacts,
    kerimContacts,
    rizaContacts,
} from "../../data/zehraMessages";
import {
    zehraContactsEn,
    mahmutContactsEn,
    semraContactsEn,
    kerimContactsEn,
    rizaContactsEn,
} from "../../data/zehraMessagesEn";

interface PhoneComponentProps {
    color: string;
    password: string;
    owner: string;
    contacts: Contact[];
    lockBackground?: string;
    lockText?: string;
}

function PhoneComponent(props: PhoneComponentProps) {
    const { t } = useLanguage();
    const [isUnlocked, setIsUnlocked] = createSignal(false);
    const [isLockDialogOpen, setIsLockDialogOpen] = createSignal(false);
    const [isContentOpen, setIsContentOpen] = createSignal(false);

    onMount(() => {
        const savedUnlockState = sessionStorage.getItem(`phone-unlocked-${props.owner}`);
        if (savedUnlockState === "true") {
            setIsUnlocked(true);
        }
    });

    const handleClick = () => {
        if (isUnlocked()) {
            setIsContentOpen(true);
        } else {
            setIsLockDialogOpen(true);
        }
    };

    const handleUnlock = () => {
        setIsUnlocked(true);
        sessionStorage.setItem(`phone-unlocked-${props.owner}`, "true");
        setIsLockDialogOpen(false);
        setIsContentOpen(true);
    };

    return (
        <>
            <div class="relative group">
                <button
                    onClick={handleClick}
                    class="relative transform hover:scale-105 transition-all duration-300"
                >
                    {/* Phone Shadow */}
                    <div class="absolute top-1 left-1 w-24 h-36 bg-black opacity-20 rounded-2xl blur-sm" />

                    {/* Phone Body */}
                    <div class={`relative w-24 h-36 rounded-2xl shadow-xl border-2 border-gray-700 ${props.color}`}>
                        {/* Screen */}
                        <div class="absolute inset-2 bg-black rounded-xl overflow-hidden flex items-center justify-center">
                            {/* Lock Icon on Screen */}
                            <div class={`w-8 h-8 rounded-full flex items-center justify-center ${isUnlocked() ? "bg-green-500" : "bg-red-500"}`}>
                                <svg width="16" height="16" fill="white" viewBox="0 0 16 16">
                                    <Show
                                        when={isUnlocked()}
                                        fallback={
                                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                        }
                                    >
                                        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
                                    </Show>
                                </svg>
                            </div>
                        </div>

                        {/* Home Button */}
                        <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full border border-gray-500" />

                        {/* Side Buttons */}
                        <div class="absolute left-0 top-6 w-0.5 h-4 bg-gray-600 rounded-r" />
                        <div class="absolute left-0 top-12 w-0.5 h-6 bg-gray-600 rounded-r" />
                        <div class="absolute right-0 top-8 w-0.5 h-8 bg-gray-600 rounded-l" />
                    </div>
                </button>

                {/* Phone Tooltip */}
                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                    <div class="bg-black text-white text-sm rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                        {props.owner}
                        {t("phone.ownerPhone")}
                        <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black" />
                    </div>
                </div>
            </div>

            {/* Phone dialogs */}
            <Show when={isLockDialogOpen()}>
                <PhoneShell onClose={() => setIsLockDialogOpen(false)}>
                    <PhoneLockScreen
                        password={props.password}
                        onUnlock={handleUnlock}
                        text={props.lockText || ""}
                        backgroundImage={props.lockBackground}
                    />
                </PhoneShell>
            </Show>
            <Show when={isContentOpen()}>
                <PhoneShell onClose={() => setIsContentOpen(false)}>
                    <ChatApp owner={props.owner} contacts={props.contacts} />
                </PhoneShell>
            </Show>
        </>
    );
}

interface HackerPuzzleInputProps {
    placeholder?: string;
    answer: RegExp;
    onPuzzleSolve: () => void;
    errorMessage?: string;
}

function HackerPuzzleInput(props: HackerPuzzleInputProps) {
    const { t } = useLanguage();
    const [error, setError] = createSignal(false);
    const [input, setInput] = createSignal("");

    const handleClick = () => {
        setError(false);

        if (props.answer.test(input())) {
            props.onPuzzleSolve();
        } else {
            setError(true);
        }
    };

    return (
        <div class="space-y-3">
            <div class="flex items-center gap-2">
                <span class="text-green-400 font-mono text-sm">$</span>
                <input
                    type="text"
                    value={input()}
                    onInput={(e) => {
                        setInput(e.currentTarget.value);
                        setError(false);
                    }}
                    placeholder={props.placeholder}
                    class="flex-1 bg-transparent border border-green-500 rounded px-3 py-2 text-green-400 font-mono text-sm placeholder-green-600 focus:outline-none focus:border-green-300 focus:shadow-lg focus:shadow-green-500/20"
                />
            </div>

            <button
                type="button"
                onClick={handleClick}
                class="w-full bg-green-600 hover:bg-green-700 text-black font-mono font-bold py-2 px-4 rounded transition-colors duration-200 border border-green-400 hover:border-green-300 shadow-lg hover:shadow-green-500/30"
            >
                &gt;&gt; {t("terminal.accessButton")}
            </button>

            <Show when={error()}>
                <div class="text-red-400 font-mono text-xs">
                    {props.errorMessage || `$ ${t("terminal.errorInvalid")}`}
                </div>
            </Show>
        </div>
    );
}

export function GameContent() {
    const { t, language } = useLanguage();
    const [isChestDialogOpen, setIsChestDialogOpen] = createSignal(false);
    const [isCorkBoardDialogOpen, setIsCorkBoardDialogOpen] = createSignal(false);

    const getContacts = (lang: string) => ({
        zehra: lang === "en" ? zehraContactsEn : zehraContacts,
        mahmut: lang === "en" ? mahmutContactsEn : mahmutContacts,
        semra: lang === "en" ? semraContactsEn : semraContacts,
        kerim: lang === "en" ? kerimContactsEn : kerimContacts,
        riza: lang === "en" ? rizaContactsEn : rizaContacts,
    });

    const contacts = () => getContacts(language());

    const boardPuzzleImage = () =>
        language() === "tr" ? "/zehra/cork-board-tr.png" : "/zehra/cork-board-en.png";

    const mailImage = () =>
        language() === "tr" ? "/zehra/mail-tr.png" : "/zehra/mail-en.png";

    return (
        <div class="min-h-screen relative">
            {/* Header */}
            <div class="text-center py-6">
                <img
                    src="/zehra/zehra-is-missing.png"
                    alt={t("gameTitle")}
                    class="md:rounded-lg mx-auto max-w-full h-auto md:max-w-[750px]"
                />
                <div class="mt-4">
                    <Button href={t("pdfLink")} target="_blank">
                        {t("gamePdf")}
                    </Button>
                </div>
            </div>

            {/* Detective Table */}
            <div class="max-w-6xl mx-auto px-4">
                <div class="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-2xl p-8 mb-8">
                    {/* Tech pattern texture */}
                    <div
                        class="absolute inset-0 rounded-2xl opacity-10 pointer-events-none"
                        style={{
                            "background-image":
                                `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff00' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Cpath d='M10 30h40M30 10v40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            "background-size": "60px 60px",
                        }}
                    />

                    {/* Hints Modal */}
                    <HintsModal />

                    <div class="relative space-y-12">
                        {/* Row 1: Phones */}
                        <div class="flex flex-wrap justify-center gap-4">
                            <PhoneComponent
                                color="bg-pink-600"
                                password="1397"
                                owner="Zehra"
                                contacts={contacts().zehra}
                            />
                            <PhoneComponent
                                color="bg-blue-600"
                                password="1907"
                                owner="Mahmut"
                                contacts={contacts().mahmut}
                                lockBackground="/zehra/fenerbahce.jpeg"
                            />
                            <PhoneComponent
                                color="bg-purple-600"
                                password="1984"
                                owner="Semra"
                                contacts={contacts().semra}
                                lockBackground="/zehra/eye.jpg"
                            />
                            <PhoneComponent
                                color="bg-green-600"
                                password="2001"
                                owner="Kerim"
                                contacts={contacts().kerim}
                                lockText={t("lockTexts.kerim")}
                            />
                            <PhoneComponent
                                color="bg-red-700"
                                password="1431"
                                owner="Rıza"
                                contacts={contacts().riza}
                                lockText={t("lockTexts.riza")}
                                lockBackground="/zehra/skull.jpg"
                            />
                        </div>

                        {/* Row 2: Tablets */}
                        <div class="flex flex-col lg:flex-row justify-center items-center gap-12">
                            {/* Evidence Tablet */}
                            <div class="relative">
                                <div class="bg-gray-900 rounded-xl p-2 shadow-2xl border-2 border-gray-700 max-w-md">
                                    <div class="bg-black rounded-lg p-4 border border-green-500 shadow-inner">
                                        <div class="flex items-center gap-2 mb-3 pb-2 border-b border-green-500">
                                            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <span class="text-green-400 text-xs font-mono ml-2">
                                                {t("terminal.evidenceDB")}
                                            </span>
                                        </div>

                                        <div class="bg-gray-900 border border-green-500 rounded p-2 mb-4">
                                            <div class="text-green-300 font-mono text-xs">
                                                {t("cameraReport.description")}
                                            </div>
                                        </div>

                                        <div class="mb-4 rounded border border-green-500 overflow-hidden">
                                            <img
                                                src={boardPuzzleImage()}
                                                alt="Evidence board"
                                                class="w-full opacity-90"
                                            />
                                        </div>

                                        <div class="text-green-400 font-mono text-xs space-y-1 mb-4">
                                            <div>$ {t("terminal.analyzingEvidence")}</div>
                                            <div>$ {t("terminal.patternRecognition")}</div>
                                            <div class="text-green-300">
                                                $ {t("terminal.enterKeyword")}
                                            </div>
                                        </div>

                                        <HackerPuzzleInput
                                            placeholder={t("cameraReport.placeholder")}
                                            answer={/(c|ç|Ç|C)e(s|ş|S|Ş)me/i}
                                            onPuzzleSolve={() => setIsCorkBoardDialogOpen(true)}
                                            errorMessage={`$ ${t("terminal.errorInvalid")}`}
                                        />
                                    </div>
                                    <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 -z-10" />
                                </div>
                            </div>

                            <div class="flex flex-col gap-4">
                                {/* Chest Tablet */}
                                <div class="relative">
                                    <div class="bg-gray-900 rounded-xl p-2 shadow-2xl border-2 border-gray-700 max-w-sm">
                                        <div class="bg-black rounded-lg p-4 border border-green-500 shadow-inner">
                                            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-green-500">
                                                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                                <span class="text-green-400 text-xs font-mono ml-2">
                                                    {t("terminal.zehraChest")}
                                                </span>
                                            </div>

                                            <div class="bg-gray-900 border border-green-500 rounded p-2 mb-4">
                                                <div class="text-green-300 font-mono text-xs">
                                                    {t("chestPuzzle.description")}
                                                </div>
                                            </div>

                                            <div class="text-green-400 font-mono text-xs space-y-1 mb-4">
                                                <div>$ {t("terminal.fieldAgent")}</div>
                                                <div>$ {t("terminal.chestLock")}</div>
                                                <div class="text-green-300">
                                                    $ {t("terminal.sendPassword")}
                                                </div>
                                            </div>

                                            <HackerPuzzleInput
                                                placeholder={t("chestPuzzle.placeholder")}
                                                answer={/k(u|ü|Ü)lked(ı|i|İ)s(ı|i|İ)|cinderella/i}
                                                onPuzzleSolve={() => setIsChestDialogOpen(true)}
                                                errorMessage={`$ ${t("terminal.errorLock")}`}
                                            />
                                        </div>
                                        <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 -z-10" />
                                    </div>
                                </div>

                                {/* Accusation Tablet - Placeholder for now */}
                                <div class="relative">
                                    <div class="bg-gray-900 rounded-xl p-2 shadow-2xl border-2 border-gray-700 max-w-sm">
                                        <div class="bg-black rounded-lg p-4 border border-red-500 shadow-inner">
                                            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-red-500">
                                                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                                <span class="text-red-400 text-xs font-mono ml-2">
                                                    {t("terminal.accusation")}
                                                </span>
                                            </div>

                                            <div class="text-center py-4">
                                                <div class="text-red-400 font-mono text-sm mb-4">
                                                    ⚠️ {t("terminal.finalDecision")} ⚠️
                                                </div>
                                                <FinalChat />
                                            </div>
                                        </div>
                                        <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 -z-10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialogs */}
            <Show when={isChestDialogOpen()}>
                <Dialog onClose={() => setIsChestDialogOpen(false)}>
                    <div class="flex justify-center h-full">
                        <img src="/zehra/chest.png" alt="Chest contents" class="max-w-full h-auto" />
                    </div>
                </Dialog>
            </Show>

            <Show when={isCorkBoardDialogOpen()}>
                <Dialog onClose={() => setIsCorkBoardDialogOpen(false)}>
                    <div class="flex flex-col gap-4 p-4 h-full md:h-[600px] overflow-auto">
                        <img src={mailImage()} alt="Mail from agents" class="w-full" />
                        <img src="/zehra/hoodie.jpeg" alt="Security footage" class="w-full" />
                    </div>
                </Dialog>
            </Show>
        </div>
    );
}