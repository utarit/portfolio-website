import { Contact } from "@/components/zehra-game/chat-app/ChatApp";
import { useLanguage } from "@/contexts/LanguageContext";
// Turkish messages
import {
  kerimContacts,
  mahmutContacts,
  rizaContacts,
  semraContacts,
  zehraContacts,
} from "@/data/zehraMessages";
// English messages
import {
  kerimContactsEn,
  mahmutContactsEn,
  rizaContactsEn,
  semraContactsEn,
  zehraContactsEn,
} from "@/data/zehraMessagesEn";

export const useMessages = () => {
  const { language } = useLanguage();

  const getZehraContacts = (): Contact[] => {
    return language === "en" ? zehraContactsEn : zehraContacts;
  };

  const getMahmutContacts = (): Contact[] => {
    return language === "en" ? mahmutContactsEn : mahmutContacts;
  };

  const getSemraContacts = (): Contact[] => {
    return language === "en" ? semraContactsEn : semraContacts;
  };

  const getKerimContacts = (): Contact[] => {
    return language === "en" ? kerimContactsEn : kerimContacts;
  };

  const getRizaContacts = (): Contact[] => {
    return language === "en" ? rizaContactsEn : rizaContacts;
  };

  return {
    getZehraContacts,
    getMahmutContacts,
    getSemraContacts,
    getKerimContacts,
    getRizaContacts,
  };
};
