import React, { useState } from "react";

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

      <button
        className="bg-slate-700 rounded-sm py-1 px-2 hover:bg-slate-800 focus:bg-slate-900 text-white"
        type="submit"
      >
        {buttonText}
      </button>

      {error && <p className="text-red-700 font-bold">{errorText}</p>}
      <div className="flex gap-4 justify-end mt-2">
        {hintText && (
          <button
            className="hover:underline text-cyan-700 active:text-cyan-600 dark:text-cyan-400 dark:active:text-cyan-300"
            onClick={handleHintClick}
            type="button"
          >
            İpucu Al
          </button>
        )}
        {solutionText && (
          <button
            className="hover:underline text-purple-700 active:text-purple-600 dark:text-purple-400 dark:active:text-purple-300"
            onClick={handleSolutionClick}
            type="button"
          >
            Cevabı göster
          </button>
        )}
      </div>
    </form>
  );
};

export default PuzzleLock;
