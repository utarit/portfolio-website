import { createSignal, createEffect, onCleanup, Show } from "solid-js";
import { useLanguage } from "../../contexts/LanguageContext";
import { ChatApp } from "./ChatApp";
import { PhoneShell } from "./PhoneShell";
import type { Contact, Decision } from "../../types/game";
import { Suspect } from "../../types/game";
import {
    getFinalAnswer,
    getFinalSentences,
} from "../../data/zehraFinalChat";
import { useTranslatedDecisions } from "../../lib/translations/zehraChat";

const emptyContacts = Object.values(Suspect).map((suspect) => ({
    name: suspect,
    messages: [],
}));

export function FinalChat() {
    const [isDialogOpen, setIsDialogOpen] = createSignal(false);
    const [contacts, setContacts] = createSignal<Contact[]>(emptyContacts);
    const [isAudioPlaying, setIsAudioPlaying] = createSignal(false);
    const [isTyping, setIsTyping] = createSignal(false);
    const [typingContact, setTypingContact] = createSignal<string | null>(null);
    const { t, language } = useLanguage();
    const { getTranslatedDecision } = useTranslatedDecisions();

    let audioRef: HTMLAudioElement | undefined;

    createEffect(() => {
        if (isDialogOpen() && audioRef) {
            audioRef.play().catch((error) => {
                console.log("Audio play failed:", error);
            });
            setIsAudioPlaying(true);
        } else if (!isDialogOpen() && audioRef) {
            audioRef.pause();
            audioRef.currentTime = 0;
            setIsAudioPlaying(false);
        }
    });

    onCleanup(() => {
        if (audioRef) {
            audioRef.pause();
        }
    });

    const toggleAudio = () => {
        if (audioRef) {
            if (isAudioPlaying()) {
                audioRef.pause();
                setIsAudioPlaying(false);
            } else {
                audioRef.play().catch((error) => {
                    console.log("Audio play failed:", error);
                });
                setIsAudioPlaying(true);
            }
        }
    };

    const handleOpenDialog = () => {
        const confirmed = confirm(t("finalChat.confirmDialog"));
        if (confirmed === true) {
            setIsDialogOpen(true);
        }
    };

    const getTranslatedDecisions = (person: Suspect): Decision[] => {
        return getFinalSentences(person, language()).map((sentence) => ({
            ...sentence,
            message: getTranslatedDecision(person, sentence.type),
        }));
    };

    const calculateMessageDelay = (message: string): number => {
        const totalDelay = 1000 + message.length * 50;
        return Math.min(totalDelay, 5000);
    };

    const handleSelectOption = (person: Suspect, type: Decision) => {
        const userMessage = {
            message: type.message,
            person: "me" as const,
            time: new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setContacts((prev) => {
            return prev.map((contact) =>
                contact.name === person
                    ? { ...contact, messages: [...contact.messages, userMessage] }
                    : contact
            );
        });

        setTimeout(() => {
            setIsTyping(true);
            setTypingContact(person);
        }, 1000);

        const messages = getFinalAnswer(person, type, language());

        const putMessage = (index: number) => {
            if (index === 0) {
                setIsTyping(false);
                setTypingContact(null);
            }

            setContacts((prev) => {
                return prev.map((contact) =>
                    contact.name === person
                        ? { ...contact, messages: [...contact.messages, messages[index]] }
                        : contact
                );
            });

            if (index < messages.length - 1) {
                const nextMessageDelay = calculateMessageDelay(messages[index].message);
                setTimeout(() => putMessage(index + 1), nextMessageDelay);
            }
        };

        setTimeout(() => putMessage(0), 5000);
    };

    return (
        <section class="mb-8">
            <audio
                ref={audioRef}
                src="/zehra/the-final-step.mp3"
                preload="auto"
            />
            <button
                onClick={handleOpenDialog}
                class="bg-gray-900 border border-red-500 rounded p-4 mb-6 hover:bg-red-900/20 transition-colors cursor-pointer w-full"
            >
                <div class="text-red-300 font-mono text-xs leading-relaxed">
                    {t("finalChat.title")}
                </div>
            </button>

            <Show when={isDialogOpen()}>
                <PhoneShell
                    onClose={() => {
                        setIsDialogOpen(false);
                        setContacts(emptyContacts);
                    }}
                    musicControls={{
                        isPlaying: isAudioPlaying(),
                        onToggle: toggleAudio,
                    }}
                >
                    <div class="h-full">
                        <ChatApp
                            owner={t("chat.detective")}
                            contacts={contacts()}
                            chatOptions={getTranslatedDecisions}
                            onOptionClick={handleSelectOption}
                            isTyping={isTyping()}
                            typingContact={typingContact()}
                        />
                    </div>
                </PhoneShell>
            </Show>
        </section>
    );
}