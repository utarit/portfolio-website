import { createSignal, createEffect, For, Show, onMount } from "solid-js";
import { useLanguage } from "../../contexts/LanguageContext";
import type { Contact, Message, Suspect, Decision } from "../../types/game";

interface PersonListProps {
    contacts: Contact[];
    onSelect: (index: number) => void;
    selectedContact: string;
    owner: string;
}

function PersonList(props: PersonListProps) {
    const { t } = useLanguage();

    const formatTime = (date?: Date) => {
        if (!date) return "";
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        if (diff < 60000) return "now";
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return `${Math.floor(diff / 86400000)}d ago`;
    };

    return (
        <div class="flex flex-col h-full bg-black w-full overflow-hidden">
            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-800 flex-shrink-0">
                <h1 class="text-lg font-semibold text-white">
                    {`${props.owner}'s ${t("chat.messages")}`}
                </h1>
            </div>

            <div class="flex-1 overflow-y-auto">
                <For each={props.contacts}>
                    {(contact, index) => (
                        <button
                            class={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-900 transition-colors border-b border-gray-800 border-opacity-50 ${props.selectedContact === contact.name ? "bg-gray-800" : ""
                                }`}
                            onClick={() => props.onSelect(index())}
                        >
                            <div class="text-2xl flex-shrink-0">
                                {contact.avatar || "👤"}
                            </div>
                            <div class="flex-1 min-w-0 text-left">
                                <div class="flex items-center justify-between mb-1">
                                    <span class="font-medium text-white truncate">
                                        {contact.name}
                                    </span>
                                    <span class="text-xs text-gray-400 flex-shrink-0 ml-2">
                                        {formatTime(contact.lastMessageTime)}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-300 truncate">
                                    {contact.messages.length > 0
                                        ? contact.messages[contact.messages.length - 1].message
                                        : "No messages"}
                                </p>
                            </div>
                            <Show when={contact.unreadCount && contact.unreadCount > 0}>
                                <div class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span class="text-xs font-bold text-white">
                                        {contact.unreadCount! > 9 ? "9+" : contact.unreadCount}
                                    </span>
                                </div>
                            </Show>
                        </button>
                    )}
                </For>
            </div>
        </div>
    );
}

interface ChatAppProps {
    contacts: Contact[];
    owner: string;
    chatOptions?: (person: Suspect) => Decision[];
    onOptionClick?: (person: Suspect, type: Decision) => void;
    isTyping?: boolean;
    typingContact?: string | null;
}

export function ChatApp(props: ChatAppProps) {
    const [selectedContactIndex, setSelectedContactIndex] = createSignal<number>(0);
    const [currentConversation, setCurrentConversation] = createSignal<string | null>(null);
    let messagesEndRef: HTMLDivElement | undefined;

    const selectedContactName = () => props.contacts[selectedContactIndex()]?.name;

    const chatOptionsForSelectedContact = () =>
        props.chatOptions?.(selectedContactName() as Suspect);

    const shouldShowTyping = () => props.isTyping !== undefined ? props.isTyping : false;
    const shouldShowTypingForContact = () =>
        props.typingContact !== undefined
            ? props.typingContact === currentConversation()
            : false;

    const scrollToBottom = () => {
        if (messagesEndRef) {
            messagesEndRef.scrollIntoView({ behavior: "smooth" });
        }
    };

    createEffect(() => {
        if (currentConversation()) {
            const conversation = props.contacts.find((c) => c.name === currentConversation());
            if (conversation && conversation.messages.length > 0) {
                setTimeout(scrollToBottom, 100);
            }
        }
    });

    const handleSelectContact = (index: number) => {
        setSelectedContactIndex(index);
        setCurrentConversation(props.contacts[index].name);
    };

    const handleChoiceSelect = (choice: Decision) => {
        if (!props.onOptionClick || !selectedContactName()) return;
        props.onOptionClick(selectedContactName() as Suspect, choice);
    };

    const formatTime = (time?: string) => {
        if (!time) return "";
        return time;
    };

    const renderConversationList = () => (
        <PersonList
            contacts={props.contacts}
            onSelect={handleSelectContact}
            selectedContact={selectedContactName()}
            owner={props.owner}
        />
    );

    const renderConversation = () => {
        const conversation = props.contacts.find((c) => c.name === currentConversation());
        if (!conversation) return null;

        return (
            <div class="flex flex-col h-full bg-black w-full overflow-hidden">
                <div class="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800 flex-shrink-0">
                    <button
                        onClick={() => setCurrentConversation(null)}
                        class="p-2 hover:bg-gray-800 rounded-full transition-colors flex-shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </button>
                    <div class="flex items-center space-x-2 flex-1 min-w-0">
                        <span class="text-2xl flex-shrink-0">
                            {conversation.avatar || "👤"}
                        </span>
                        <div class="text-center min-w-0">
                            <h2 class="font-medium text-white truncate">
                                {conversation.name}
                            </h2>
                        </div>
                    </div>
                    <div class="flex space-x-1 flex-shrink-0">
                        <button class="p-2 hover:bg-gray-800 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </button>
                        <button class="p-2 hover:bg-gray-800 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="flex-1 overflow-y-auto p-3 space-y-3">
                    <For each={conversation.messages}>
                        {(message, index) => (
                            <div
                                class={`flex transition-all duration-200 ${message.person === "me"
                                        ? "justify-end"
                                        : message.person === "system"
                                            ? "justify-center"
                                            : "justify-start"
                                    }`}
                            >
                                <div
                                    class={`max-w-[250px] px-3 py-2 shadow-lg text-sm text-left ${message.person === "me"
                                            ? "bg-blue-500 text-white rounded-xl rounded-br-none"
                                            : message.person === "system"
                                                ? "bg-gray-600 text-gray-200 text-xs rounded-xl"
                                                : "bg-gray-700 text-white rounded-xl rounded-bl-none"
                                        }`}
                                >
                                    <div class="break-words">
                                        {message.message}
                                        <Show when={message.link}>
                                            <a
                                                class="underline text-blue-300 ml-1"
                                                href={message.link!.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {message.link!.title}
                                            </a>
                                        </Show>
                                    </div>
                                    <Show when={message.time}>
                                        <div
                                            class={`text-xs mt-1 ${message.person === "me"
                                                    ? "text-blue-100 text-right"
                                                    : "text-gray-400"
                                                }`}
                                        >
                                            {formatTime(message.time)}
                                        </div>
                                    </Show>
                                </div>
                            </div>
                        )}
                    </For>

                    <Show when={shouldShowTyping() && shouldShowTypingForContact()}>
                        <div class="flex justify-start transition-all duration-200">
                            <div class="bg-gray-700 text-white px-3 py-2 rounded-xl max-w-[250px]">
                                <div class="flex space-x-1">
                                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ "animation-delay": "0ms" }} />
                                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ "animation-delay": "150ms" }} />
                                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ "animation-delay": "300ms" }} />
                                </div>
                            </div>
                        </div>
                    </Show>

                    <div ref={messagesEndRef} />
                </div>

                <Show when={chatOptionsForSelectedContact() && props.onOptionClick && !conversation.messages.length}>
                    <div class="p-3 space-y-2 bg-gray-900 border-t border-gray-800 flex-shrink-0">
                        <For each={chatOptionsForSelectedContact()}>
                            {(option, index) => (
                                <button
                                    class="w-full text-left p-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors text-sm font-medium shadow-lg"
                                    onClick={() => handleChoiceSelect(option)}
                                    style={{
                                        "animation": `fadeIn 0.2s ease-out ${index() * 0.1}s both`
                                    }}
                                >
                                    {option.message}
                                </button>
                            )}
                        </For>
                    </div>
                </Show>
            </div>
        );
    };

    return (
        <Show when={currentConversation()} fallback={renderConversationList()}>
            {renderConversation()}
        </Show>
    );
}