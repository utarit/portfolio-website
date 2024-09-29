"use client";
import {
  kerimContacts,
  mahmutContacts,
  rizaContacts,
  semraContacts,
  zehraContacts,
} from "@/data/zehraMessages";

import ChatApp from "../chat-app/ChatApp";
import PuzzleSection from "../helpers/PuzzleSection";
import LockedPhone from "../LockedPhone";

const hints = [
  {
    name: "Zehra",
    help: "Zehra'nın sandığını açabildin mi?",
    solution: "Şifre: 1397",
  },
  {
    name: "Mahmut",
    help: "Mahmut sıkı bir Fenerbahçe hayranı gibi duruyor.",
    solution: "Şifre: 1907",
  },
  {
    name: "Kerim",
    help: "Kerim ile Zehra hangi yılda tanıştılar?",
    solution: "Şifre: 2001",
  },
  {
    name: "Semra",
    help: "Semra'nın okuduğu kitaplara bakabildin mi? Georde Orwell okumayı seviyor gibi",
    solution: "Şifre: 1984",
  },
  {
    name: "Rıza",
    help: "Rıza, Kont Dracula'ya kafayı takmış gibi. Şifre onunla ilgili bir şey olabilir mi?",
    solution: "Şifre: 1431",
  },
];

const HiddenMessages = () => {
  return (
    <PuzzleSection className="row-span-2">
      <h2 className="text-xl ">2. Telefon kayıtları</h2>
      <p className="my-4">
        Ajanlarımız bazı kişilerin telefonlarındaki mesajların datasını
        yakalamayı başardı. Onlara ulaşabilmek için mesaj uygulamasının
        şifresini bulman gerekiyor.
      </p>

      <div className="flex flex-wrap justify-center gap-4 py-4">
        <LockedPhone text="Zehra'nın telefonu" password="1397">
          <ChatApp owner="Zehra" contacts={zehraContacts} />
        </LockedPhone>
        <LockedPhone
          text="Mahmut'un telefonu"
          password="1907"
          lockBackground="/zehra/fenerbahce.jpeg"
        >
          <ChatApp owner="Mahmut" contacts={mahmutContacts} />
        </LockedPhone>
        <LockedPhone
          text="Semra'nın telefonu"
          password="1984"
          lockBackground="/zehra/eye.jpg"
        >
          <ChatApp owner="Semra" contacts={semraContacts} />
        </LockedPhone>
        <LockedPhone
          text="Kerim'in telefonu"
          password="2001"
          lockText="Onu ilk gördüğüm zaman <3"
        >
          <ChatApp owner="Kerim" contacts={kerimContacts} />
        </LockedPhone>
        <LockedPhone
          text="Rıza'nın telefonu"
          password="1431"
          lockText="M'lord"
          lockBackground="/zehra/skull.jpg"
        >
          <ChatApp owner="Rıza" contacts={rizaContacts} />
        </LockedPhone>
      </div>
      <h6 className="text-lg">Telefon şifrelerini bulamadınız mı?</h6>
      <ul>
        {hints.map((hint) => (
          <li
            key={hint.name}
            className="flex gap-2 border border-white p-2 my-2 justify-between bg-orange-200 dark:bg-gray-800"
          >
            <p>{hint.name}</p>
            <div>
              <button
                className="hover:underline text-cyan-700 active:text-cyan-600 dark:text-cyan-400 dark:active:text-cyan-300 mr-4"
                type="button"
                onClick={() => alert(hint.help)}
              >
                İpucu Al
              </button>
              <button
                className="hover:underline text-purple-700 active:text-purple-600 dark:text-purple-400 dark:active:text-purple-300"
                type="button"
                onClick={() => alert(hint.solution)}
              >
                Cevabı göster
              </button>
            </div>
          </li>
        ))}
      </ul>
    </PuzzleSection>
  );
};

export default HiddenMessages;
