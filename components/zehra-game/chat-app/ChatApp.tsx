import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Info, Phone } from "lucide-react";

import { Message } from "@/components/zehra-game/chat-app/Messenger";
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
  owner?: string;
}

const PersonList = ({
  contacts,
  onSelect,
  selectedContact,
  owner,
}: PersonListProps) => {
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
          {owner ? `${owner}'s Messages` : "Messages"}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact, index) => (
          <motion.button
            key={contact.name}
            className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-900 transition-colors border-b border-gray-800 border-opacity-50 ${
              selectedContact === contact.name ? "bg-gray-800" : ""
            }`}
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
}: {
  contacts: Contact[];
  owner: string;
  chatOptions?: (person: Suspect) => Decision[];
  onOptionClick?: (person: Suspect, type: Decision) => void;
}) => {
  const [selectedContactIndex, setSelectedContactIndex] = useState<number>(0);
  const [currentConversation, setCurrentConversation] = useState<string | null>(
    null,
  );
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedContactName = contacts[selectedContactIndex]?.name;

  const chatOptionsForSelectedContact = chatOptions?.(
    selectedContactName as Suspect,
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation, contacts]);

  const handleSelectContact = (index: number) => {
    setSelectedContactIndex(index);
    setCurrentConversation(contacts[index].name);
  };

  const handleChoiceSelect = (choice: Decision) => {
    if (!onOptionClick || !selectedContactName) return;

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      onOptionClick(selectedContactName as Suspect, choice);
    }, 1000 + Math.random() * 2000);
  };

  const formatTime = (time?: string) => {
    if (!time) return "";
    return time;
  };

  const renderConversationList = () => (
    <div className="h-full flex flex-col">
      <PersonList
        contacts={contacts}
        onSelect={handleSelectContact}
        selectedContact={selectedContactName}
        owner={owner}
      />
    </div>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                message.person === "me"
                  ? "justify-end"
                  : message.person === "system"
                  ? "justify-center"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[250px] px-3 py-2 rounded-xl shadow-lg text-sm ${
                  message.person === "me"
                    ? "bg-blue-500 text-white"
                    : message.person === "system"
                    ? "bg-gray-600 text-gray-200 text-xs"
                    : "bg-gray-700 text-white"
                }`}
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
                    className={`text-xs mt-1 ${
                      message.person === "me"
                        ? "text-blue-100"
                        : "text-gray-400"
                    }`}
                  >
                    {formatTime(message.time)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
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

        {chatOptionsForSelectedContact && onOptionClick && !isTyping && (
          <div className="p-3 space-y-2 bg-gray-900 border-t border-gray-800 flex-shrink-0">
            <AnimatePresence>
              {chatOptionsForSelectedContact.map((option, index) => (
                <motion.button
                  key={option.message}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    w-full text-left p-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors text-sm
                    ${
                    conversation.messages.length > 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                  `}
                  onClick={() =>
                    conversation.messages.length === 0 &&
                    handleChoiceSelect(option)}
                  disabled={conversation.messages.length > 0}
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
    <div className="h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {currentConversation ? renderConversation() : renderConversationList()}
      </AnimatePresence>
    </div>
  );
};

export default ChatApp;
