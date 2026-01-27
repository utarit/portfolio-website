import { Message, Decision, ResultType, Suspect } from "../types/game";

export const getFinalSentencesEn = (person: Suspect): Decision[] => {
  if (person === Suspect.ZEHRA) {
    return [
      {
        type: ResultType.ESCAPED,
        message: "Maybe you'll never read this, but I know you escaped, Zehra.",
      },
      {
        type: ResultType.SUICIDE,
        message:
          "Writing this feels meaningless... I know you committed suicide.",
      },
    ];
  }

  return [
    {
      type: ResultType.KILLED,
      message: "I know you killed Zehra.",
    },
    {
      type: ResultType.KIDNAPPED,
      message:
        "I know you had a hand in Zehra's disappearance. You kidnapped her.",
    },
  ];
};

export const getFinalAnswerEn = (
  person: Suspect,
  finalDesision: Decision,
): Message[] => {
  const getMessageTime = (minutes: number = 0) => {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60000);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const initialMessage: Message[] = [];

  let result = initialMessage;

  if (person === Suspect.ZEHRA && finalDesision.type === ResultType.ESCAPED) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message: "Hello detective...",
      },
      {
        person: "other",
        time: getMessageTime(),
        message:
          "You didn't think you were the only one trying to solve this case, did you?",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Secret Agent detectives are everywhere, either individually or in teams, examining every detail that security forces miss, fighting to bring justice.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "I can tell you that whatever Zehra did, she didn't do it alone...",
      },
    ]);
  } else if (
    person === Suspect.ZEHRA &&
    finalDesision.type === ResultType.SUICIDE
  ) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message: "Hello detective...",
      },
      {
        person: "other",
        time: getMessageTime(),
        message:
          "You didn't think you were the only one trying to solve this case, did you?",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Secret Agent detectives are everywhere, either individually or in teams, examining every detail that security forces miss, fighting to bring justice.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "I can tell you that Zehra didn't act alone, and she didn't commit suicide either",
      },
    ]);
  } else if (
    (person === Suspect.SEMRA || person === Suspect.NEDIM) &&
    finalDesision.type === ResultType.KILLED
  ) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message: "Kill? KILL?!",
      },
      {
        person: "other",
        time: getMessageTime(),
        message:
          "How could you think that, detective? Are we the kind of people who would do such a thing?",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "We would never hurt a hair on Zehra's head! She's been through so much, so many hardships. We listened to her every week and stood by her.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message: "You got close but didn't find the truth.",
      },
    ]);
  } else if (
    (person === Suspect.SEMRA || person === Suspect.NEDIM) &&
    finalDesision.type === ResultType.KIDNAPPED
  ) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message: "Ahhh, so that's it?",
      },
      {
        person: "other",
        time: getMessageTime(),
        message:
          "We knew the truth would come out eventually. Please listen to us before going to the police, then you can decide what to do.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "We've known Zehra for weeks, we see her. She became much more than just someone who comes and goes from home. She became like family to us. I don't know how she looks from the outside, but there's a lively, energetic and loving woman inside.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "She told us how her father treated her back then, and now her husband. We were so sad just listening. Despite them, she still had a smile on her face and enjoyed spending time with us.",
      },
      {
        person: "other",
        time: getMessageTime(2),
        message:
          "When she told us she was pregnant last month, we were so happy. She was getting ready to turn a new page in her life.",
      },
      {
        person: "other",
        time: getMessageTime(2),
        message:
          "But things changed before she could tell her husband. The man was going through Zehra's phone and found someone who had texted her. That's when hell broke loose.",
      },
      {
        person: "other",
        time: getMessageTime(3),
        message:
          "Zehra had an old love, they couldn't marry because her family didn't allow it. Her husband saw the messages this man sent to Zehra. The man's blood rushed to his brain, he lost himself in anger. Even though Zehra never responded to this man or met him, her husband beat the woman until she was black and blue all over.",
      },
      {
        person: "other",
        time: getMessageTime(3),
        message:
          "No matter how much she tried to hide those wounds and bruises, we saw them of course. We forced her to talk, she told us everything. She cried so much, you should have seen it, that smiling woman suddenly disappeared. Then she suddenly felt sick at our house.",
      },
      {
        person: "other",
        time: getMessageTime(4),
        message:
          "We immediately took her to the emergency room, waited for hours. Then we learned she had a miscarriage. That day was very bad for us, but it was like hell for Zehra. She was making statements that she no longer wanted to live. The sparkle in her eyes was gone.",
      },
      {
        person: "other",
        time: getMessageTime(4),
        message:
          "This couldn't end like this, we had to do our best for Zehra. She had tried to go to the police before, but her husband's connections reached the police. That's why these attempts never ended well.",
      },
      {
        person: "other",
        time: getMessageTime(5),
        message:
          "We decided to kidnap Zehra. We decided to do our best so that she could start a new life away from her husband, away from everything, and live a peaceful life. We arranged everything using our family cottage and some money.",
      },
      {
        person: "other",
        time: getMessageTime(5),
        message:
          "Zehra was safe, but how safe could she remain while that man was out there looking for her? We couldn't stand what he put the poor woman through going unpunished.",
      },
      {
        person: "other",
        time: getMessageTime(6),
        message:
          "To pin the blame on her husband, we caused a commotion on the street and made the apprentice come out of the shop. Then we hid the bag with Zehra's bloody clothes behind a cabinet in the shop. Since everyone was focused on the car accident outside, no one even noticed us going in and out of the shop.",
      },
      {
        person: "other",
        time: getMessageTime(6),
        message: "Later we pinned the blame on Mahmut with an anonymous tip.",
      },
      {
        person: "other",
        time: getMessageTime(6),
        message:
          "Detective, please. If you tell the police about this, Mahmut will be released and will harm Zehra.",
      },
      {
        person: "other",
        time: getMessageTime(7),
        message:
          "If you don't tell anyone, Zehra can live in peace. The decision is yours, Zehra's fate is in your hands.",
      },
      {
        person: "other",
        time: getMessageTime(8),
        message:
          '"Good job detective. You managed to solve the case. Now the final decision is in your hands. Click the link below and make your choice. Then learn what other detectives decided."',
        link: {
          title: "Click to make your final decision.",
          url: "/zehra/final-decision",
        },
      },
    ]);
  } else if (
    person === Suspect.KERIM &&
    finalDesision.type === ResultType.KIDNAPPED
  ) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message: "Hello detective...",
      },
      {
        person: "other",
        time: getMessageTime(),
        message:
          "You might be right to think that Zehra escaped with me, I had very suspicious behaviors.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Being in Ankara, trying to meet with Zehra, wandering around her house might look suspicious on top of what happened, I'm aware.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "But I'm telling you the truth, Zehra never wanted to meet with me. Years had passed, she had forgotten me. For her, I was no different from an acquaintance from the past.",
      },
      {
        person: "other",
        time: getMessageTime(2),
        message:
          "I just wanted to see how she was doing. I wanted to hang around in cafes, on the street, and see her from afar, even if just for a second. She wouldn't even notice me, I wouldn't harm anyone.",
      },
      {
        person: "other",
        time: getMessageTime(2),
        message:
          "I have no idea what happened to her, I hope she's safe. I will never feel at ease until I learn that nothing happened to her.",
      },
    ]);
  } else if (person === Suspect.MAHMUT) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message: "Me? What could I have done to my wife??",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Okay, yes, I had a relationship with my downstairs neighbor, but I was never serious. Zehra wasn't very flirtatious, so I was just meeting my needs.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Other than that, I love my wife, detective. She's a proper, honorable woman. She'll be the mother of my children too.",
      },
      {
        person: "other",
        time: getMessageTime(2),
        message:
          "Whatever happened to her, please find her and bring her home safely. Let her return to her nest safe and sound.",
      },
    ]);
  } else if (person === Suspect.YELIZ) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(1),
        message: "Oh, what am I gonna do with that woman, detective...",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Was I madly jealous of Mahmut and desperately wanted Mahmut to be only mine? Yes... But that doesn't mean I did something bad to that woman.",
      },
      {
        person: "other",
        time: getMessageTime(2),
        message:
          "Mahmut was going to divorce her anyway, then marry me. I have no reason to do anything bad to Zehra.",
      },
      {
        person: "other",
        time: getMessageTime(3),
        message:
          "If you don't have any other questions, let me make a cake. My dear Mahmut must be very upset now... He needs someone to support him during these bad times.",
      },
    ]);
  } else if (person === Suspect.SINAN || person === Suspect.RIZA) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message:
          "I have nothing to do with this incident. Where did you get the idea that I'm guilty?",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "I hope you didn't take the ritual sacrifice messages seriously. Those were just part of the computer game we were playing.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message: "I have no idea what happened to sister Zehra.",
      },
    ]);
  } else {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "What?! How can you think I did it? I have nothing to do with this.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "You caught the wrong person, detective. Don't waste time with me, go over the details again.",
      },
    ]);
  }

  return result.concat({
    person: "system",
    message: "Person is offline...",
  });
};
