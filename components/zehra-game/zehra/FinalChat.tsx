"use client";

import { useState } from "react";

import {
  Decision,
  getFinalAnswer,
  getFinalSentences,
  Suspect,
} from "@/data/zehraFinalChat";
import { Button } from "@/design-system/Button";

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

  const handleOpenDialog = () => {
    if (
      confirm(
        "Devam etmek istediğinize emin misiniz? Hikayenin finaline gelecek ve sonucu öğreneceksiniz.",
      ) === true
    ) {
      setIsDialogOpen(true);
    }
  };

  const handleSelectOption = (person: Suspect, type: Decision) => {
    setMessagingInProgress(true);
    const messages = getFinalAnswer(person, type);

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
    <section className="m-4">
      <Button
        fullWidth
        color="primary"
        onClick={handleOpenDialog}
        type="button"
      >
        Suçlama yapmaya hazırım
      </Button>
      {isDialogOpen && (
        <Dialog
          disabledCloseButton={messagingInProgress}
          onClose={() => {
            setIsDialogOpen(false);
            setContacts(emptyContacts);
          }}
        >
          <ChatApp
            owner="Dedektif"
            contacts={contacts}
            chatOptions={getFinalSentences}
            onOptionClick={handleSelectOption}
          />
        </Dialog>
      )}
    </section>
  );
};

export default FinalChat;
