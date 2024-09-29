"use client";
import { useState } from "react";

import Dialog from "./Dialog";
import PhoneLockScreen from "./PhoneLockScreen";

const PhoneSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
    </svg>
  );
};

const LockSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    </svg>
  );
};

const UnlockSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
    </svg>
  );
};

const LockedPhone = ({
  text,
  children,
  password,
  lockText = "",
  lockBackground,
}: {
  text: string;
  children: React.ReactNode;
  password: string;
  lockText?: string;
  lockBackground?: string;
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLockDialogOpen, setIsLockDialogOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);

  const handleClick = () => {
    if (isUnlocked) {
      setIsContentOpen(true);
    } else {
      setIsLockDialogOpen(true);
    }
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    setIsLockDialogOpen(false);
    setIsContentOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-[180px] border-2 border-gray-300 rounded-md p-2 flex items-center justify-center flex-col bg-orange-200 hover:bg-orange-100 active:bg-orange-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:active:bg-gray-700"
      >
        <span className="p-2 self-end">
          {isUnlocked ? <UnlockSvg /> : <LockSvg />}
        </span>
        <PhoneSvg />
        <span>{text}</span>
      </button>
      {isLockDialogOpen && (
        <Dialog onClose={() => setIsLockDialogOpen(false)}>
          <div className="flex flex-col items-center justify-center">
            <PhoneLockScreen
              password={password}
              onUnlock={handleUnlock}
              text={lockText}
              backgroundImage={lockBackground}
            />
          </div>
        </Dialog>
      )}
      {isContentOpen && (
        <Dialog onClose={() => setIsContentOpen(false)}>{children}</Dialog>
      )}
    </>
  );
};

export default LockedPhone;
