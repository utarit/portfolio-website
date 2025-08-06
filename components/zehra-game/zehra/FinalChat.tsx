"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  Decision,
  getFinalAnswer,
  getFinalSentences,
  Suspect,
} from "@/data/zehraFinalChat";
import { useTranslatedDecisions } from "@/lib/translations/zehraChat";

import ChatApp, { Contact } from "../chat-app/ChatApp";
import { PhoneShell } from "../PhoneShell";

const emptyContacts = Object.values(Suspect).map((suspect) => ({
  name: suspect,
  messages: [],
}));

const FinalChat = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(emptyContacts);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingContact, setTypingContact] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { t, language } = useLanguage();
  const { getTranslatedDecision } = useTranslatedDecisions();

  useEffect(() => {
    if (isDialogOpen && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Audio play failed:", error);
      });
      setIsAudioPlaying(true);
    } else if (!isDialogOpen && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAudioPlaying(false);
    }
  }, [isDialogOpen]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        audioRef.current.play().catch((error) => {
          console.log("Audio play failed:", error);
        });
        setIsAudioPlaying(true);
      }
    }
  };

  const handleOpenDialog = () => {
    if (confirm(t("finalChat.confirmDialog")) === true) {
      setIsDialogOpen(true);
    }
  };

  const getTranslatedDecisions = (person: Suspect): Decision[] => {
    return getFinalSentences(person, language).map((sentence) => ({
      ...sentence,
      message: getTranslatedDecision(person, sentence.type),
    }));
  };

  // Calculate dynamic delay based on message length (simulating reading/typing time)
  const calculateMessageDelay = (message: string): number => {
    const totalDelay = 1000 + message.length * 50;
    return Math.min(totalDelay, 5000);
  };

  const handleSelectOption = (person: Suspect, type: Decision) => {
    // 1. First add the user's message immediately
    const userMessage = {
      message: type.message,
      person: "me" as const,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setContacts((prev) => {
      const newContacts = prev.map((contact) =>
        contact.name === person
          ? { ...contact, messages: [...contact.messages, userMessage] }
          : contact
      );
      return newContacts;
    });

    // 2. Show typing indicator after user message
    setTimeout(() => {
      setIsTyping(true);
      setTypingContact(person);
    }, 1000);

    // 3. Get response messages and start adding them after typing delay
    const messages = getFinalAnswer(person, type, language);

    const putMessage = (index: number) => {
      // Hide typing indicator when first response arrives
      if (index === 0) {
        setIsTyping(false);
        setTypingContact(null);
      }

      setContacts((prev) => {
        const newContacts = prev.map((contact) =>
          contact.name === person
            ? { ...contact, messages: [...contact.messages, messages[index]] }
            : contact
        );
        return newContacts;
      });

      // Continue with next message if there are more
      if (index < messages.length - 1) {
        const nextMessageDelay = calculateMessageDelay(messages[index].message);
        setTimeout(() => putMessage(index + 1), nextMessageDelay);
      }
    };

    setTimeout(() => putMessage(0), 5000);
  };

  return (
    <section className="mb-8">
      <audio
        ref={audioRef}
        src="/zehra/the-final-step.mp3"
        preload="auto"
      />
      <button
        onClick={handleOpenDialog}
        className="bg-gray-900 border border-red-500 rounded p-4 mb-6 hover:bg-red-900/20 transition-colors cursor-pointer w-full"
      >
        <div className="text-red-300 font-mono text-xs leading-relaxed">
          {t("finalChat.title")}
        </div>
      </button>

      <AnimatePresence>
        {isDialogOpen && (
          <PhoneShell
            onClose={() => {
              setIsDialogOpen(false);
              setContacts(emptyContacts);
            }}
            musicControls={{
              isPlaying: isAudioPlaying,
              onToggle: toggleAudio,
            }}
          >
            <div className="h-full">
              <ChatApp
                owner="Detective"
                contacts={contacts}
                chatOptions={getTranslatedDecisions}
                onOptionClick={handleSelectOption}
                isTyping={isTyping}
                typingContact={typingContact}
              />
            </div>
          </PhoneShell>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FinalChat;
