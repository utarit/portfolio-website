import React from "react";
import classNames from "classnames";

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
    <div className="w-full mt-4 sm:min-w-[600px]">
      <div className="bg-green-100 rounded-lg shadow-md flex-grow overflow-y-auto h-[500px]">
        <h2 className="bg-green-100 text-xl font-bold p-4 mx-2 mb-4 sticky top-0 border-b-2 border-b-black ">
          {person}
        </h2>
        <div className="p-4">
          {messages.map((message) => (
            <div
              key={message.message}
              className={classNames(`flex mb-4`, {
                "flex-row-reverse": message.person === "me",
                "flex-row": message.person === "other",
                "flex-row justify-center": message.person === "system",
              })}
            >
              <div
                className={classNames("rounded-lg p-2 max-w-xs break-words", {
                  "bg-green-500": message.person === "me",
                  "bg-gray-200": message.person === "other",
                  "bg-gray-100": message.person === "system",
                })}
              >
                <p
                  className={classNames({
                    "text-white": message.person === "me",
                    "text-gray-800": message.person === "other",
                    "text-gray-700 text-xs": message.person === "system",
                  })}
                >
                  {message.message}{" "}
                  {message.link && (
                    <a
                      className="underline text-blue-700"
                      target="_blank"
                      href="https://forms.gle/Ujzzuef7ounMsEVE8"
                    >
                      {message.link.title}
                    </a>
                  )}
                </p>
                <span
                  className={classNames(
                    "text-xs",
                    message.person === "me" ? "text-white" : "text-gray-600"
                  )}
                >
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
