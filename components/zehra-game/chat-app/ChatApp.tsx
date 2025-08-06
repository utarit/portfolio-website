import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Info, Phone } from "lucide-react";

import { Message } from "@/components/zehra-game/chat-app/Messenger";
import { useLanguage } from "@/contexts/LanguageContext";
import { Decision, Suspect } from "@/data/zehraFinalChat";

export interface Contact {
  name: string;
  messages: Message[];
  avatar?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
}

interface PersonListProps {
  contacts: Contact[];
  onSelect: (index: number) => void;
  selectedContact: string;
  owner: string;
}

const PersonList = ({
  contacts,
  onSelect,
  selectedContact,
  owner,
}: PersonListProps) => {
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
    <div className="flex flex-col h-full bg-black w-full overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 flex-shrink-0">
        <h1 className="text-lg font-semibold text-white">
          {`${owner}'s ${t("chat.messages")}`}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact, index) => (
          <motion.button
            key={contact.name}
            className={classNames(
              "w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-900 transition-colors border-b border-gray-800 border-opacity-50",
              { "bg-gray-800": selectedContact === contact.name },
            )}
            onClick={() => onSelect(index)}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl flex-shrink-0">
              {contact.avatar || "👤"}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-white truncate">
                  {contact.name}
                </span>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                  {formatTime(contact.lastMessageTime)}
                </span>
              </div>
              <p className="text-sm text-gray-300 truncate">
                {contact.messages.length > 0
                  ? contact.messages[contact.messages.length - 1].message
                  : "No messages"}
              </p>
            </div>
            {contact.unreadCount && contact.unreadCount > 0 && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-white">
                  {contact.unreadCount > 9 ? "9+" : contact.unreadCount}
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const ChatApp = ({
  contacts,
  owner,
  chatOptions,
  onOptionClick,
  isTyping: externalIsTyping,
  typingContact: externalTypingContact,
}: {
  contacts: Contact[];
  owner: string;
  chatOptions?: (person: Suspect) => Decision[];
  onOptionClick?: (person: Suspect, type: Decision) => void;
  isTyping?: boolean;
  typingContact?: string | null;
}) => {
  const [selectedContactIndex, setSelectedContactIndex] = useState<number>(0);
  const [currentConversation, setCurrentConversation] = useState<string | null>(
    null,
  );
  const [isTyping, setIsTyping] = useState(false);

  // Use external typing state if provided, otherwise use internal state
  const shouldShowTyping = externalIsTyping !== undefined
    ? externalIsTyping
    : isTyping;
  const shouldShowTypingForContact = externalTypingContact !== undefined
    ? externalTypingContact === currentConversation
    : isTyping;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedContactName = contacts[selectedContactIndex]?.name;

  const chatOptionsForSelectedContact = chatOptions?.(
    selectedContactName as Suspect,
  );

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Only auto-scroll when there are new messages, not when switching conversations
    if (currentConversation) {
      const conversation = contacts.find((c) => c.name === currentConversation);
      if (conversation && conversation.messages.length > 0) {
        setTimeout(scrollToBottom, 100);
      }
    }
  }, [contacts, currentConversation]);

  const handleSelectContact = (index: number) => {
    setSelectedContactIndex(index);
    setCurrentConversation(contacts[index].name);
  };

  const handleChoiceSelect = (choice: Decision) => {
    if (!onOptionClick || !selectedContactName) return;

    // Just trigger the option click, let the parent handle message flow
    onOptionClick(selectedContactName as Suspect, choice);
  };

  const formatTime = (time?: string) => {
    if (!time) return "";
    return time;
  };

  const renderConversationList = () => (
    <PersonList
      contacts={contacts}
      onSelect={handleSelectContact}
      selectedContact={selectedContactName}
      owner={owner}
    />
  );

  const renderConversation = () => {
    const conversation = contacts.find((c) => c.name === currentConversation);
    if (!conversation) return null;

    return (
      <div className="flex flex-col h-full bg-black w-full overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800 flex-shrink-0">
          <button
            onClick={() => setCurrentConversation(null)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors flex-shrink-0"
          >
            <ArrowLeft size={20} className="text-blue-500" />
          </button>
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <span className="text-2xl flex-shrink-0">
              {conversation.avatar || "👤"}
            </span>
            <div className="text-center min-w-0">
              <h2 className="font-medium text-white truncate">
                {conversation.name}
              </h2>
            </div>
          </div>
          <div className="flex space-x-1 flex-shrink-0">
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Phone size={18} className="text-blue-500" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Info size={18} className="text-blue-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {conversation.messages.map((message, index) => (
            <motion.div
              key={`${message.message}-${index}`}
              initial={{ opacity: 0, y: message.person === "system" ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={classNames("flex", {
                "justify-end": message.person === "me",
                "justify-center": message.person === "system",
                "justify-start": message.person !== "me" &&
                  message.person !== "system",
              })}
            >
              <div
                className={classNames(
                  "max-w-[250px] px-3 py-2 shadow-lg text-sm",
                  {
                    "bg-blue-500 text-white rounded-xl rounded-br-none":
                      message.person === "me",
                    "bg-gray-600 text-gray-200 text-xs rounded-xl":
                      message.person === "system",
                    "bg-gray-700 text-white rounded-xl rounded-bl-none":
                      message.person !== "me" && message.person !== "system",
                  },
                )}
              >
                <div className="break-words">
                  {message.message}
                  {message.link && (
                    <a
                      className="underline text-blue-300 ml-1"
                      href={message.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {message.link.title}
                    </a>
                  )}
                </div>
                {message.time && (
                  <div
                    className={classNames("text-xs mt-1", {
                      "text-blue-100": message.person === "me",
                      "text-gray-400": message.person !== "me",
                    })}
                  >
                    {formatTime(message.time)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {shouldShowTyping && shouldShowTypingForContact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="bg-gray-700 text-white px-3 py-2 rounded-xl max-w-[250px]">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {chatOptionsForSelectedContact && onOptionClick &&
          !conversation.messages.length &&
          (
            <div className="p-3 space-y-2 bg-gray-900 border-t border-gray-800 flex-shrink-0">
              <AnimatePresence>
                {chatOptionsForSelectedContact.map((option, index) => (
                  <motion.button
                    key={option.message}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full text-left p-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors text-sm font-medium shadow-lg"
                    onClick={() => handleChoiceSelect(option)}
                  >
                    {option.message}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          )}
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {currentConversation ? renderConversation() : renderConversationList()}
    </AnimatePresence>
  );
};

export default ChatApp;
