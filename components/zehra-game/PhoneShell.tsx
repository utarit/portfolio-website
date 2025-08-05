import type { ReactNode } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Pause, Play, X } from "lucide-react";

interface PhoneShellProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  musicControls?: {
    isPlaying: boolean;
    onToggle: () => void;
  };
}

export function PhoneShell(
  { children, className = "", onClose, musicControls }: PhoneShellProps,
) {
  useEffect(() => {
    // Prevent body scroll when phone is open
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
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm ${className}`}
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
        {/* Phone Frame */}
        <div className="relative w-80 h-screen max-h-[700px] bg-black rounded-3xl ring-2 ring-gray-700 shadow-2xl overflow-hidden">
          {/* Screen Bezel */}
          <div className="absolute inset-2 bg-gray-900 rounded-3xl overflow-hidden flex flex-col">
            {/* Status Bar - Fixed at top */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-black">
              <StatusBar musicControls={musicControls} onClose={onClose} />
            </div>

            {/* Screen Content */}
            <div className="flex-1 pt-8 overflow-hidden">
              {children}
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white bg-opacity-30 rounded-full" />

          {/* Side Buttons */}
          <div className="absolute left-0 top-20 w-1 h-8 bg-gray-600 rounded-r-sm" />
          <div className="absolute left-0 top-32 w-1 h-12 bg-gray-600 rounded-r-sm" />
          <div className="absolute left-0 top-48 w-1 h-12 bg-gray-600 rounded-r-sm" />
          <div className="absolute right-0 top-32 w-1 h-16 bg-gray-600 rounded-l-sm" />
        </div>
      </motion.div>
    </div>
  );
}

function StatusBar({
  musicControls,
  onClose,
}: {
  musicControls?: { isPlaying: boolean; onToggle: () => void };
  onClose?: () => void;
}) {
  const formatTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 text-white text-sm font-medium">
      <div className="flex items-center space-x-1">
        <span>{formatTime()}</span>
      </div>

      <div className="flex items-center space-x-2">
        {/* Music Control */}
        {musicControls && (
          <button
            onClick={musicControls.onToggle}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            {musicControls.isPlaying
              ? <Pause size={12} className="text-white" />
              : <Play size={12} className="text-white" />}
          </button>
        )}

        {/* Signal bars */}
        <div className="flex items-end space-x-0.5">
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-2 bg-white rounded-sm"></div>
          <div className="w-1 h-3 bg-white rounded-sm"></div>
          <div className="w-1 h-4 bg-white rounded-sm"></div>
        </div>

        {/* WiFi */}
        <div className="w-4 h-3 ml-1">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
        </div>

        {/* Battery */}
        <div className="flex items-center space-x-1">
          <div className="w-6 h-3 border border-white rounded-sm relative">
            <div className="absolute inset-0.5 bg-white rounded-sm"></div>
            <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-white rounded-r-sm">
            </div>
          </div>
          <span className="text-xs">100%</span>
        </div>

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label="Close phone"
          >
            <X size={12} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
