"use client";
import { useMessages } from "@/components/zehra-game/lib/useMessages";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/design-system/Button";

import ChatApp from "../chat-app/ChatApp";
import PuzzleSection from "../helpers/PuzzleSection";
import LockedPhone from "../LockedPhone";

const HiddenMessages = () => {
  const { t } = useLanguage();
  const {
    getZehraContacts,
    getMahmutContacts,
    getSemraContacts,
    getKerimContacts,
    getRizaContacts,
  } = useMessages();

  const hints = [
    {
      name: "Zehra",
      help: t("hiddenMessages.hints.0.help"),
      solution: t("hiddenMessages.hints.0.solution"),
    },
    {
      name: "Mahmut",
      help: t("hiddenMessages.hints.1.help"),
      solution: t("hiddenMessages.hints.1.solution"),
    },
    {
      name: "Kerim",
      help: t("hiddenMessages.hints.2.help"),
      solution: t("hiddenMessages.hints.2.solution"),
    },
    {
      name: "Semra",
      help: t("hiddenMessages.hints.3.help"),
      solution: t("hiddenMessages.hints.3.solution"),
    },
    {
      name: "Riza",
      help: t("hiddenMessages.hints.4.help"),
      solution: t("hiddenMessages.hints.4.solution"),
    },
  ];

  return (
    <PuzzleSection className="row-span-2">
      <h2 className="text-xl ">{t("hiddenMessages.title")}</h2>
      <p className="my-4">
        {t("hiddenMessages.description")}
      </p>

      <div className="flex flex-wrap justify-center gap-4 py-4">
        <LockedPhone
          text={t("hiddenMessages.phoneLabels.zehra")}
          password="1397"
        >
          <ChatApp owner="Zehra" contacts={getZehraContacts()} />
        </LockedPhone>
        <LockedPhone
          text={t("hiddenMessages.phoneLabels.mahmut")}
          password="1907"
          lockBackground="/zehra/fenerbahce.jpeg"
        >
          <ChatApp owner="Mahmut" contacts={getMahmutContacts()} />
        </LockedPhone>
        <LockedPhone
          text={t("hiddenMessages.phoneLabels.semra")}
          password="1984"
          lockBackground="/zehra/eye.jpg"
        >
          <ChatApp owner="Semra" contacts={getSemraContacts()} />
        </LockedPhone>
        <LockedPhone
          text={t("hiddenMessages.phoneLabels.kerim")}
          password="2001"
          lockText={t("lockTexts.kerim")}
        >
          <ChatApp owner="Kerim" contacts={getKerimContacts()} />
        </LockedPhone>
        <LockedPhone
          text={t("hiddenMessages.phoneLabels.riza")}
          password="1431"
          lockText={t("lockTexts.riza")}
          lockBackground="/zehra/skull.jpg"
        >
          <ChatApp owner="Rıza" contacts={getRizaContacts()} />
        </LockedPhone>
      </div>
      <h6 className="text-lg">{t("hiddenMessages.cantFindPasswords")}</h6>
      <ul>
        {hints.map((hint) => (
          <li
            key={hint.name}
            className="flex justify-between items-center gap-2 border border-white p-2 my-2  bg-orange-200 dark:bg-gray-800"
          >
            <p>{hint.name}</p>
            <div className="flex gap-2">
              <Button
                color="primary"
                type="button"
                onClick={() => alert(hint.help)}
              >
                {t("buttons.getHint")}
              </Button>
              <Button
                variant="text"
                type="button"
                onClick={() => alert(hint.solution)}
              >
                {t("buttons.showAnswer")}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </PuzzleSection>
  );
};

export default HiddenMessages;
