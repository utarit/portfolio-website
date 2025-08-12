"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

import ChatApp from "@/components/zehra-game/chat-app/ChatApp";
import Dialog from "@/components/zehra-game/Dialog";
import { useMessages } from "@/components/zehra-game/lib/useMessages";
import PhoneLockScreen from "@/components/zehra-game/PhoneLockScreen";
import { PhoneShell } from "@/components/zehra-game/PhoneShell";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/design-system/Button";

import FinalChat from "./zehra/FinalChat";
import { HintsModal } from "./HintsModal";

const GameContent = () => {
  const { t, language } = useLanguage();
  const [isChestDialogOpen, setIsChestDialogOpen] = useState(false);
  const [isCorkBoardDialogOpen, setIsCorkBoardDialogOpen] = useState(false);

  const {
    getZehraContacts,
    getMahmutContacts,
    getSemraContacts,
    getKerimContacts,
    getRizaContacts,
  } = useMessages();

  const boardPuzzleImage = language === "tr"
    ? "/zehra/cork-board-tr.png"
    : "/zehra/cork-board-en.png";

  const mailImage = language === "tr"
    ? "/zehra/mail-tr.png"
    : "/zehra/mail-en.png";

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <div className="text-center py-6">
        <Image
          src="/zehra/zehra-is-missing.png"
          width={500}
          height={300}
          alt={t("gameTitle")}
          className="md:rounded-lg mx-auto"
        />
        <div className="mt-4">
          <Button href={t("pdfLink")} target="_blank">
            {t("gamePdf")}
          </Button>
        </div>
      </div>

      {/* Detective Table */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-2xl p-8 mb-8">
          {/* Tech pattern texture */}
          <div
            className="absolute inset-0 rounded-2xl opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff00' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Cpath d='M10 30h40M30 10v40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Hints Modal */}
          <HintsModal />

          <div className="relative space-y-12">
            {/* Row 1: Phones */}
            <div className="flex flex-wrap justify-center gap-4">
              <PhoneComponent
                color="bg-pink-600"
                password="1397"
                owner="Zehra"
                contacts={getZehraContacts()}
              />
              <PhoneComponent
                color="bg-blue-600"
                password="1907"
                owner="Mahmut"
                contacts={getMahmutContacts()}
                lockBackground="/zehra/fenerbahce.jpeg"
              />
              <PhoneComponent
                color="bg-purple-600"
                password="1984"
                owner="Semra"
                contacts={getSemraContacts()}
                lockBackground="/zehra/eye.jpg"
              />
              <PhoneComponent
                color="bg-green-600"
                password="2001"
                owner="Kerim"
                contacts={getKerimContacts()}
                lockText={t("lockTexts.kerim")}
              />
              <PhoneComponent
                color="bg-red-700"
                password="1431"
                owner="Rıza"
                contacts={getRizaContacts()}
                lockText={t("lockTexts.riza")}
                lockBackground="/zehra/skull.jpg"
              />
            </div>

            {/* Row 2: Tablets */}
            <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
              {/* Evidence Tablet */}
              <div className="relative">
                <div className="bg-gray-900 rounded-xl p-2 shadow-2xl border-2 border-gray-700 max-w-md">
                  {/* Tablet Screen */}
                  <div className="bg-black rounded-lg p-4 border border-green-500 shadow-inner">
                    {/* Terminal Header */}
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-green-500">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 text-xs font-mono ml-2">
                        {t("terminal.evidenceDB")}
                      </span>
                    </div>

                    {/* Description Box */}
                    <div className="bg-gray-900 border border-green-500 rounded p-2 mb-4">
                      <div className="text-green-300 font-mono text-xs">
                        {t("cameraReport.description")}
                      </div>
                    </div>

                    {/* Display Image */}
                    <div className="mb-4 rounded border border-green-500 overflow-hidden">
                      <Image
                        src={boardPuzzleImage}
                        width={400}
                        height={400}
                        alt="Evidence board"
                        className="w-full opacity-90"
                      />
                    </div>

                    {/* Terminal Content */}
                    <div className="text-green-400 font-mono text-xs space-y-1 mb-4">
                      <div>$ {t("terminal.analyzingEvidence")}</div>
                      <div>$ {t("terminal.patternRecognition")}</div>
                      <div className="text-green-300">
                        $ {t("terminal.enterKeyword")}
                      </div>
                    </div>

                    <HackerPuzzleInput
                      placeholder={t("cameraReport.placeholder")}
                      answer={/(c|ç|Ç|C)e(s|ş|S|Ş)me/i}
                      onPuzzleSolve={() => setIsCorkBoardDialogOpen(true)}
                      errorMessage={`$ ${t("terminal.errorInvalid")}`}
                    />
                  </div>

                  {/* Tablet Border */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 -z-10">
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {/* Chest Tablet */}
                <div className="relative">
                  <div className="bg-gray-900 rounded-xl p-2 shadow-2xl border-2 border-gray-700 max-w-sm">
                    {/* Tablet Screen */}
                    <div className="bg-black rounded-lg p-4 border border-green-500 shadow-inner">
                      {/* Terminal Header */}
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-green-500">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full">
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full">
                        </div>
                        <span className="text-green-400 text-xs font-mono ml-2">
                          {t("terminal.zehraChest")}
                        </span>
                      </div>

                      {/* Description Box */}
                      <div className="bg-gray-900 border border-green-500 rounded p-2 mb-4">
                        <div className="text-green-300 font-mono text-xs">
                          {t("chestPuzzle.description")}
                        </div>
                      </div>

                      {/* Terminal Content */}
                      <div className="text-green-400 font-mono text-xs space-y-1 mb-4">
                        <div>$ {t("terminal.fieldAgent")}</div>
                        <div>$ {t("terminal.chestLock")}</div>
                        <div className="text-green-300">
                          $ {t("terminal.sendPassword")}
                        </div>
                      </div>

                      <HackerPuzzleInput
                        placeholder={t("chestPuzzle.placeholder")}
                        answer={/k(u|ü|Ü)lked(ı|i|İ)s(ı|i|İ)|cinderella/i}
                        onPuzzleSolve={() => setIsChestDialogOpen(true)}
                        errorMessage={`$ ${t("terminal.errorLock")}`}
                      />
                    </div>

                    {/* Tablet Border */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 -z-10">
                    </div>
                  </div>
                </div>

                {/* Accusation Tablet */}
                <div className="relative">
                  <div className="bg-gray-900 rounded-xl p-2 shadow-2xl border-2 border-gray-700 max-w-sm">
                    {/* Tablet Screen */}
                    <div className="bg-black rounded-lg p-4 border border-red-500 shadow-inner">
                      {/* Terminal Header */}
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-red-500">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full">
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full">
                        </div>
                        <span className="text-red-400 text-xs font-mono ml-2">
                          {t("terminal.accusation")}
                        </span>
                      </div>

                      {/* Accusation Content */}
                      <div className="text-center py-8">
                        <div className="text-red-400 font-mono text-sm mb-4">
                          ⚠️ {t("terminal.finalDecision")} ⚠️
                        </div>
                        <FinalChat />
                      </div>
                    </div>

                    {/* Tablet Border */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 -z-10">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      {isChestDialogOpen && (
        <Dialog onClose={() => setIsChestDialogOpen(false)}>
          <div className="flex justify-center">
            <Image
              src="/zehra/chest.png"
              width={500}
              height={500}
              alt="Chest contents"
            />
          </div>
        </Dialog>
      )}

      {isCorkBoardDialogOpen && (
        <Dialog onClose={() => setIsCorkBoardDialogOpen(false)}>
          <div className="flex flex-col gap-4 p-4 h-full md:h-[600px] overflow-auto">
            <Image
              src={mailImage}
              width={800}
              height={400}
              alt="Mail from agents"
              className="w-full"
            />
            <Image
              src="/zehra/hoodie.jpeg"
              width={500}
              height={500}
              alt="Security footage"
              className="w-full"
            />
          </div>
        </Dialog>
      )}
    </div>
  );
};

// Phone Component that looks realistic with lock icon on screen
const PhoneComponent = ({
  color,
  password,
  owner,
  contacts,
  lockBackground,
  lockText,
}: {
  color: string;
  password: string;
  owner: string;
  contacts: any[];
  lockBackground?: string;
  lockText?: string;
}) => {
  const { t } = useLanguage();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLockDialogOpen, setIsLockDialogOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);

  useEffect(() => {
    const savedUnlockState = sessionStorage.getItem(`phone-unlocked-${owner}`);
    if (savedUnlockState === "true") {
      setIsUnlocked(true);
    }
  }, [owner]);

  const handleClick = () => {
    if (isUnlocked) {
      setIsContentOpen(true);
    } else {
      setIsLockDialogOpen(true);
    }
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    sessionStorage.setItem(`phone-unlocked-${owner}`, "true");
    setIsLockDialogOpen(false);
    setIsContentOpen(true);
  };

  return (
    <>
      <div className="relative group">
        <button
          onClick={handleClick}
          className="relative transform hover:scale-105 transition-all duration-300"
        >
          {/* Phone Shadow */}
          <div className="absolute top-1 left-1 w-24 h-36 bg-black opacity-20 rounded-2xl blur-sm">
          </div>

          {/* Phone Body */}
          <div
            className={classNames(
              "relative w-24 h-36 rounded-2xl shadow-xl border-2 border-gray-700",
              color,
            )}
          >
            {/* Screen */}
            <div className="absolute inset-2 bg-black rounded-xl overflow-hidden flex items-center justify-center">
              {/* Lock Icon on Screen */}
              <div
                className={classNames(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  isUnlocked ? "bg-green-500" : "bg-red-500",
                )}
              >
                <svg width="16" height="16" fill="white" viewBox="0 0 16 16">
                  {isUnlocked
                    ? (
                      <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
                    )
                    : (
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    )}
                </svg>
              </div>
            </div>

            {/* Home Button */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full border border-gray-500">
            </div>

            {/* Side Buttons */}
            <div className="absolute left-0 top-6 w-0.5 h-4 bg-gray-600 rounded-r">
            </div>
            <div className="absolute left-0 top-12 w-0.5 h-6 bg-gray-600 rounded-r">
            </div>
            <div className="absolute right-0 top-8 w-0.5 h-8 bg-gray-600 rounded-l">
            </div>
          </div>
        </button>

        {/* Phone Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50">
          <div className="bg-black text-white text-sm rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
            {owner}
            {t("phone.ownerPhone")}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black">
            </div>
          </div>
        </div>
      </div>

      {/* Phone dialogs */}
      <AnimatePresence>
        {isLockDialogOpen && (
          <PhoneShell onClose={() => setIsLockDialogOpen(false)}>
            <PhoneLockScreen
              password={password}
              onUnlock={handleUnlock}
              text={lockText || ""}
              backgroundImage={lockBackground}
            />
          </PhoneShell>
        )}
        {isContentOpen && (
          <PhoneShell onClose={() => setIsContentOpen(false)}>
            <ChatApp owner={owner} contacts={contacts} />
          </PhoneShell>
        )}
      </AnimatePresence>
    </>
  );
};

// Hacker-styled puzzle input component for tablets
const HackerPuzzleInput = ({
  placeholder,
  answer,
  onPuzzleSolve,
  errorMessage,
}: {
  placeholder?: string;
  answer: RegExp;
  onPuzzleSolve: () => void;
  errorMessage?: string;
}) => {
  const { t } = useLanguage();
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);

    if (answer.test(input)) {
      onPuzzleSolve();
    } else {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-green-400 font-mono text-sm">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent border border-green-500 rounded px-3 py-2 text-green-400 font-mono text-sm placeholder-green-600 focus:outline-none focus:border-green-300 focus:shadow-lg focus:shadow-green-500/20"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-black font-mono font-bold py-2 px-4 rounded transition-colors duration-200 border border-green-400 hover:border-green-300 shadow-lg hover:shadow-green-500/30"
      >
        &gt;&gt; {t("terminal.accessButton")}
      </button>

      {error && (
        <div className="text-red-400 font-mono text-xs">
          {errorMessage || `$ ${t("terminal.errorInvalid")}`}
        </div>
      )}
    </form>
  );
};

export default GameContent;
