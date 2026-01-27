import { useLanguage } from "../../contexts/LanguageContext";
import { ResultType, Suspect } from "../../types/game";

// Translation mappings for decisions
const decisionTranslations = {
  en: {
    [Suspect.ZEHRA]: {
      [ResultType.ESCAPED]:
        "Maybe you'll never read these lines, but I know you escaped, Zehra.",
      [ResultType.SUICIDE]:
        "Writing this is so meaningless... I know you committed suicide.",
      [ResultType.KILLED]: "I know you killed Zehra.",
      [ResultType.KIDNAPPED]:
        "I know you're involved in Zehra's disappearance. You kidnapped her.",
    },
    default: {
      [ResultType.KILLED]: "I know you killed Zehra.",
      [ResultType.KIDNAPPED]:
        "I know you're involved in Zehra's disappearance. You kidnapped her.",
      [ResultType.ESCAPED]: "I know you helped Zehra escape.",
      [ResultType.SUICIDE]: "I know you drove Zehra to suicide.",
    },
  },
  tr: {
    [Suspect.ZEHRA]: {
      [ResultType.ESCAPED]:
        "Belki bu satırları hiç okumayacaksın ama kaçtığını biliyorum Zehra.",
      [ResultType.SUICIDE]:
        "Bunu yazmak çok anlamsız... İntihar ettiğini biliyorum.",
      [ResultType.KILLED]: "Zehra'yı senin öldürdüğünü biliyorum.",
      [ResultType.KIDNAPPED]:
        "Zehra'nın kaybolmasında parmağın olduğunu biliyorum. Onu sen kaçırdın.",
    },
    default: {
      [ResultType.KILLED]: "Zehra'yı senin öldürdüğünü biliyorum.",
      [ResultType.KIDNAPPED]:
        "Zehra'nın kaybolmasında parmağın olduğunu biliyorum. Onu sen kaçırdın.",
      [ResultType.ESCAPED]: "Zehra'nın kaçmasına yardım ettiğini biliyorum.",
      [ResultType.SUICIDE]: "Zehra'yı intihara sürüklediğini biliyorum.",
    },
  },
};

const systemMessages = {
  en: {
    personOffline: "Person is offline...",
    detectiveWin:
      "Good job detective. You managed to solve the case. Now the final decision is in your hands. Click the link below and make your choice. Then learn what other detectives decided.",
    finalDecisionLink: "Click to make your final decision.",
  },
  tr: {
    personOffline: "Kişi çevirimdışı...",
    detectiveWin:
      "İyi iş dedektif. Davayı çözmeyi başardın. Şimdi son karar senin elinde. Aşağıdaki linke tıkla ve seçimini yap. Sonrasında diğer dedektiflerin ne karar verdiğini de öğren.",
    finalDecisionLink: "Son kararını vermek için tıkla.",
  },
};

export const useTranslatedDecisions = () => {
  const { language } = useLanguage();

  const getTranslatedDecision = (person: Suspect, type: ResultType): string => {
    const lang = language() as keyof typeof decisionTranslations;

    if (person === Suspect.ZEHRA && decisionTranslations[lang][person]) {
      return decisionTranslations[lang][person][type];
    }

    return decisionTranslations[lang].default[type];
  };

  const getSystemMessage = (key: keyof typeof systemMessages.en): string => {
    const lang = language() as keyof typeof systemMessages;
    return systemMessages[lang][key];
  };

  return {
    getTranslatedDecision,
    getSystemMessage,
  };
};
