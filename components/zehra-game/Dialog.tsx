import React, { useEffect } from "react";

import { Button } from "@/design-system/Button";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  disabledCloseButton?: boolean;
}

const EyeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="inline mx-2"
      viewBox="0 0 16 16"
    >
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
    </svg>
  );
};

const Dialog = ({ children, disabledCloseButton, onClose }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-60">
      <dialog
        open
        className="top-0 w-full h-full md:top-[20px] md:w-fit md:h-fit md:rounded-md z-10 bg-gray-200"
      >
        <div className="text-black flex justify-between items-center border-b border-black p-4">
          <h3 className="text-2xl font-bold">
            <EyeIcon />
            Your eyes only
            <EyeIcon />
          </h3>
          <div className="flex justify-end">
            <Button
              disabled={disabledCloseButton}
              onClick={onClose}
              variant="contained"
              color="error"
            >
              <CloseIcon />
            </Button>
          </div>
        </div>
        {children}
      </dialog>
    </div>
  );
};

export default Dialog;
