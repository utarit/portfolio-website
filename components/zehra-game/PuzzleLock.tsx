import React, { useState } from "react";

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
  buttonText = "Aç",
  label,
  placeholder,
  onPuzzleSolve,
  errorText = "Yanlış şifre",
  hintText,
  solutionText,
}: Props) => {
  const [error, setError] = useState(false);

  const handleChange = () => {
    setError(false);
  };

  const handleHintClick = () => {
    if (confirm("İpucu almak istediğinize emin misiniz?") === true) {
      alert(hintText);
    }
  };

  const handleSolutionClick = () => {
    if (confirm("Cevabı öğrenmek istediğinize emin misiniz?") === true) {
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
        {buttonText}
      </Button>

      {error && <p className="text-red-700 font-bold">{errorText}</p>}
      <div className="flex gap-4 justify-end mt-4">
        {hintText && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleHintClick}
            type="button"
          >
            İpucu Al
          </Button>
        )}
        {solutionText && (
          <Button
            variant="text"
            onClick={handleSolutionClick}
            type="button"
          >
            Cevabı göster
          </Button>
        )}
      </div>
    </form>
  );
};

export default PuzzleLock;
