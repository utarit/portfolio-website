import React, { useState } from "react";
import { motion } from "framer-motion";

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", ""];

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
    background: backgroundImage
      ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${backgroundImage})`
      : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const handleButtonClick = (digit: string) => {
    if (!digit || enteredPassword.length >= 4) return;

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
  };

  const renderPasswordDots = () => {
    const dots = [];
    for (let i = 0; i < 4; i++) {
      dots.push(
        <motion.div
          key={i}
          className={`w-4 h-4 rounded-full border-2 ${
            i < enteredPassword.length
              ? "bg-white border-white"
              : "border-white border-opacity-50"
          }`}
          animate={{
            scale: i === enteredPassword.length - 1 ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.2 }}
        />,
      );
    }
    return dots;
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-between text-white overflow-hidden relative"
      style={lockScreenStyle}
    >
      {/* Status/Time Area */}
      <div className="pt-12 pb-8 text-center">
        <div className="text-6xl font-thin mb-2">
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
        <div className="text-lg font-light opacity-80">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Lock Screen Content */}
      <div className="flex flex-col items-center flex-1 px-6">
        {text && (
          <p className="text-lg mb-4 text-center font-light opacity-90 max-w-[280px]">
            {text}
          </p>
        )}

        {/* Password Input */}
        <div className="mb-3">
          {error &&
            (
              <motion.p
                className="text-red-400 text-center text-sm"
                animate={{ x: error ? [0, -10, 10, -10, 10, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                Incorrect Passcode
              </motion.p>
            )}
          {success && (
            <p className="text-green-400 text-center text-sm">Access Granted</p>
          )}
          {!error && !success && (
            <p className="text-sm text-center opacity-75">
              Enter Passcode
            </p>
          )}
          <div className="flex space-x-4 justify-center my-4">
            {renderPasswordDots()}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {numbers.map((val, index) => (
            <motion.button
              key={index}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-light transition-all duration-150 ${
                val
                  ? "bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 active:bg-opacity-30 active:scale-95"
                  : "invisible"
              }`}
              onClick={() => handleButtonClick(val)}
              disabled={!val}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: val ? 1.05 : 1 }}
            >
              {val}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneLockScreen;
