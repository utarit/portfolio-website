import React, { useState } from "react";
import classNames from "classnames";

import Messenger, { Message } from "@/components/zehra-game/chat-app/Messenger";
import { Decision, ResultType, Suspect } from "@/data/zehraFinalChat";

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
      <div className="bg-slate-50 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Contacts</h2>
        <ul>
          {contacts.map((contact, index) => (
            <li
              key={contact.name}
              className={classNames(
                "cursor-pointer mb-2 p-2 rounded-lg hover:bg-gray-200",
                selectedContact === contact.name && "bg-gray-300"
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
    selectedContactName as Suspect
  );

  const handleSelectContact = (index: number) => {
    setSelectedContactIndex(index);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div>
        <h3>{owner}&apos;s Phone</h3>
        <PersonList
          contacts={contacts}
          onSelect={handleSelectContact}
          selectedContact={selectedContactName}
        />
      </div>
      <div>
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
              <button
                className="text-left bg-slate-300 p-4 rounded-md hover:bg-slate-400 active:bg-slate-500 disabled:text-gray-500 disabled:cursor-not-allowed disabled:line-through"
                key={option.message}
                onClick={() =>
                  onOptionClick(selectedContactName as Suspect, option)
                }
                disabled={contacts[selectedContactIndex].messages.length > 0}
              >
                {option.message}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
