import React, { useState } from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/design-system/Button";

interface Props {
  answer: RegExp;
  errorText?: string;
  onPuzzleSolve: () => void;
  label: string;
  placeholder?: string;
  buttonText?: string;
  hintText?: string;
  solutionText?: string;
}

const PuzzleLock = ({
  answer,
  buttonText,
  label,
  placeholder,
  onPuzzleSolve,
  errorText,
  hintText,
  solutionText,
}: Props) => {
  const [error, setError] = useState(false);
  const { t } = useLanguage();

  const handleChange = () => {
    setError(false);
  };

  const handleHintClick = () => {
    if (confirm(t("messages.confirmHint")) === true) {
      alert(hintText);
    }
  };

  const handleSolutionClick = () => {
    if (confirm(t("messages.confirmSolution")) === true) {
      alert(solutionText);
    }
  };

  return (
    <form
      className="m-4"
      onSubmit={(e) => {
        e.preventDefault();
        setError(false);

        // Read the form data
        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);

        const password = formData.get("password") as string;

        if (answer.test(password)) {
          onPuzzleSolve();
        } else {
          setError(true);
        }
      }}
    >
      <label>
        {label}
        <input
          className="mx-2 text-black p-1 border border-black rounded-sm"
          type="text"
          placeholder={placeholder}
          name="password"
          onChange={handleChange}
        />
      </label>

      <Button size="sm" type="submit" color="primary">
        {buttonText || t("buttons.open")}
      </Button>

      {error && (
        <p className="text-red-700 font-bold">
          {errorText || t("messages.wrongPassword")}
        </p>
      )}
      <div className="flex gap-4 justify-end mt-4">
        {hintText && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleHintClick}
            type="button"
          >
            {t("buttons.getHint")}
          </Button>
        )}
        {solutionText && (
          <Button
            variant="text"
            onClick={handleSolutionClick}
            type="button"
          >
            {t("buttons.showAnswer")}
          </Button>
        )}
      </div>
    </form>
  );
};

export default PuzzleLock;
