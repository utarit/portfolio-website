import React, { useState } from "react";
import classNames from "classnames";

import Messenger, { Message } from "@/components/zehra-game/chat-app/Messenger";
import { Decision, Suspect } from "@/data/zehraFinalChat";
import { Button } from "@/design-system/Button";

export interface Contact {
  name: string;
  messages: Message[];
}

interface PersonListProps {
  contacts: Contact[];
  onSelect: (index: number) => void;
  selectedContact: string;
}
const PersonList = ({
  contacts,
  onSelect,
  selectedContact,
}: PersonListProps) => {
  return (
    <div className="mt-4">
      <div className="bg-slate-50 p-4 md:rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Contacts</h2>
        <ul className="overflow-auto max-h-[215px]">
          {contacts.map((contact, index) => (
            <li
              key={contact.name}
              className={classNames(
                "cursor-pointer mb-2 p-2 rounded-lg hover:bg-gray-200",
                selectedContact === contact.name && "bg-gray-300",
              )}
              onClick={() => onSelect(index)}
            >
              {contact.name}
            </li>
          ))}
        </ul>
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

  const selectedContactName = contacts[selectedContactIndex].name;

  const chatOptionsForSelectedContact = chatOptions?.(
    selectedContactName as Suspect,
  );

  const handleSelectContact = (index: number) => {
    setSelectedContactIndex(index);
  };

  return (
    <div className="flex flex-col md:px-4 md:flex-row gap-4 h-full md:h-fit overflow-auto pb-6">
      <div>
        <h3 className="mt-2 p-2 text-xl font-bold">{owner}&apos;s Phone</h3>
        <PersonList
          contacts={contacts}
          onSelect={handleSelectContact}
          selectedContact={selectedContactName}
        />
      </div>
      <div className="flex flex-col-reverse md:flex-col">
        {selectedContactIndex !== null && (
          <Messenger
            key={selectedContactName}
            person={selectedContactName}
            messages={contacts[selectedContactIndex].messages}
          />
        )}
        {chatOptionsForSelectedContact && onOptionClick && (
          <div className="flex flex-col gap-2 mt-3 sm:min-w-[600px]">
            {chatOptionsForSelectedContact.map((option) => (
              <Button
                color="primary"
                key={option.message}
                onClick={() =>
                  onOptionClick(selectedContactName as Suspect, option)}
                disabled={contacts[selectedContactIndex].messages.length > 0}
              >
                {option.message}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
