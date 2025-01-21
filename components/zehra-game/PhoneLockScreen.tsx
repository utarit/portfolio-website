import React, { useState } from "react";

import { Button } from "@/design-system/Button";

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

interface PhoneLockScreenProps {
  backgroundImage?: string;
  text: string;
  password: string;
  onUnlock: () => void;
}

const PhoneLockScreen: React.FC<PhoneLockScreenProps> = ({
  backgroundImage,
  text,
  password,
  onUnlock,
}) => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const lockScreenStyle: React.CSSProperties = {
    background: backgroundImage ? `url(${backgroundImage})` : "#0d80d9",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const handleButtonClick = (digit: string) => {
    if (enteredPassword.length < 4) {
      const updatedPassword = enteredPassword + digit;
      setEnteredPassword(updatedPassword);

      if (updatedPassword.length === 4) {
        if (updatedPassword === password) {
          setSuccess(true);
          setTimeout(() => {
            onUnlock();
            setSuccess(false);
          }, 1000);
        } else {
          setError(true);
          setTimeout(() => {
            setEnteredPassword("");
            setError(false);
          }, 1000);
        }
      }
    }
  };

  return (
    <article
      className="w-[300px] h-[500px] flex flex-col justify-center items-center text-white border-4 border-gray-700 rounded-lg overflow-hidden"
      style={lockScreenStyle}
    >
      <h1 className="text-2xl m-4 text-center">{text}</h1>
      <h2 className="text-4xl mb-4 bg-gray-700 bg-opacity-80 px-2">
        {enteredPassword.length > 0 ? enteredPassword : "Locked"}
      </h2>
      {error && <p className="text-red-500 mb-4">Wrong password</p>}
      {success && <p className="text-green-500 mb-4">Unlocked!</p>}
      <div className="grid grid-cols-3 gap-4">
        {numbers.map((val) => (
          <Button
            color="primary"
            key={val}
            className={`w-12 h-12`}
            onClick={() => handleButtonClick(val)}
            disabled={val === "*" || val === "#"}
          >
            {val}
          </Button>
        ))}
      </div>
    </article>
  );
};

export default PhoneLockScreen;
