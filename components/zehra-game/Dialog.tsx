import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const PhoneIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="inline mx-2"
      viewBox="0 0 16 16"
    >
      <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
    </svg>
  );
};

const Dialog = ({ children, onClose }: Props) => {
  useEffect(() => {
    // Prevent body scroll when dialog is open
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tablet Frame */}
        <div className="relative w-[900px] h-[600px] max-w-[90vw] max-h-[85vh] bg-gray-900 rounded-3xl ring-4 ring-gray-700 shadow-2xl overflow-hidden">
          {/* Screen Bezel */}
          <div className="absolute inset-3 bg-black rounded-2xl overflow-hidden flex flex-col">
            {/* Header Bar */}
            <div className="flex-shrink-0 bg-gray-800 border-b border-gray-700">
              <div className="flex justify-between items-center px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <PhoneIcon />
                  Detective&apos;s Tablet
                  <PhoneIcon />
                </h3>
                <button
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="p-2 rounded-full bg-red-600 hover:bg-red-500 text-gray-300 hover:text-white transition-all duration-200 active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden bg-gray-800">
              {children}
            </div>
          </div>

          {/* Home Button */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gray-600 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default Dialog;
