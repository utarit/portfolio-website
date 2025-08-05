import React from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

export interface Message {
  message: string;
  time?: string;
  person: "me" | "other" | "system";
  link?: { title: string; url: string };
}

export interface MessengerProps {
  person: string;
  messages: Message[];
}

const Messenger = ({ person, messages }: MessengerProps) => {
  return (
    <div className="flex flex-col h-full bg-black w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-center px-4 py-3 bg-gray-900 border-b border-gray-800 flex-shrink-0">
        <h2 className="text-lg font-bold text-white">{person}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <motion.div
            key={`${message.message}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={classNames("flex", {
              "justify-end": message.person === "me",
              "justify-start": message.person === "other",
              "justify-center": message.person === "system",
            })}
          >
            <div
              className={classNames("max-w-[250px] px-3 py-2 rounded-xl shadow-lg break-words text-sm", {
                "bg-blue-500 text-white": message.person === "me",
                "bg-gray-700 text-white": message.person === "other",
                "bg-gray-600 text-gray-200 text-xs": message.person === "system",
              })}
            >
              <div>
                {message.message}{" "}
                {message.link && (
                  <a
                    className={classNames("underline ml-1", {
                      "text-blue-300": message.person === "me" || message.person === "system",
                      "text-blue-400": message.person === "other",
                    })}
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
                    "text-gray-400": message.person === "other" || message.person === "system",
                  })}
                >
                  {message.time}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Messenger;
