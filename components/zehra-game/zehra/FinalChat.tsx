"use client";

import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  Decision,
  getFinalAnswer,
  getFinalSentences,
  Suspect,
} from "@/data/zehraFinalChat";
import { Button } from "@/design-system/Button";
import { useTranslatedDecisions } from "@/lib/translations/zehraChat";

import ChatApp, { Contact } from "../chat-app/ChatApp";
import Dialog from "../Dialog";

const emptyContacts = Object.values(Suspect).map((suspect) => ({
  name: suspect,
  messages: [],
}));

const FinalChat = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(emptyContacts);
  const [messagingInProgress, setMessagingInProgress] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
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

  const handleSelectOption = (person: Suspect, type: Decision) => {
    setMessagingInProgress(true);
    const messages = getFinalAnswer(person, type, language);

    const putMessage = (index: number) => {
      setContacts((prev) => {
        const newContacts = prev.map((contact) =>
          contact.name === person
            ? { ...contact, messages: [...contact.messages, messages[index]] }
            : contact
        );
        return newContacts;
      });

      if (index < messages.length - 1) {
        setTimeout(() => putMessage(index + 1), 3000);
      } else {
        setMessagingInProgress(false);
      }
    };

    putMessage(0);
  };

  return (
    <section className="mb-8">
      <audio
        ref={audioRef}
        src="/zehra/the-final-step.mp3"
        preload="auto"
      />
      <Button
        fullWidth
        color="error"
        onClick={handleOpenDialog}
        type="button"
      >
        {t("finalChat.title")}
      </Button>
      {isDialogOpen && (
        <Dialog
          disabledCloseButton={messagingInProgress}
          onClose={() => {
            setIsDialogOpen(false);
            setContacts(emptyContacts);
          }}
        >
          <div className="flex flex-col gap-4 p-4 h-full md:h-[600px] overflow-auto">
            <Button
              className="static md:absolute bottom-4 left-4"
              color="primary"
              onClick={toggleAudio}
              variant="text"
            >
              {isAudioPlaying ? "⏸️ Pause" : "▶️ Play"} Music
            </Button>
            <div className="flex-1">
              <ChatApp
                owner="Dedektif"
                contacts={contacts}
                chatOptions={getTranslatedDecisions}
                onOptionClick={handleSelectOption}
              />
            </div>
          </div>
        </Dialog>
      )}
    </section>
  );
};

export default FinalChat;
