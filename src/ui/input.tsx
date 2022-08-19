import { useEffect, useMemo } from "react";

import InputLetter from "./input-letter";

import "./input.scss";

const VALID_KEYS = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];

type ChangeEventHandler = (value: string[]) => void;
type SubmitEventHandler = (value: string[]) => void;

interface InputProps {
  incorrect: boolean;
  length: number;
  letters: string[];
  onChange: ChangeEventHandler;
  onSubmit: SubmitEventHandler;
}

function Input({ incorrect, onChange, length, onSubmit, letters }: InputProps) {
  let cssClasses = "input";
  if (incorrect) cssClasses += ` input--incorrect`;

  const values = useMemo<string[]>(() => {
    const result = [];
    for (let i = 0; i < length; i++) {
      if (i < letters.length) result.push(letters[i]);
      else result.push("");
    }
    return result;
  }, [length, letters]);

  // Hook to keydown event.
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Enter" && letters.length === length) {
        onSubmit(letters);
      } else if (event.key === "Backspace") {
        onChange(letters.slice(0, -1));
      } else if (VALID_KEYS.includes(event.key) && letters.length < length) {
        onChange([...letters, event.key]);
      }
    };
    document.addEventListener("keydown", handle);

    return () => document.removeEventListener("keydown", handle);
  }, [length, letters, onChange, onSubmit]);

  return (
    <div className={cssClasses}>
      {values.map((letter, index) => (
        <InputLetter key={index} value={letter} />
      ))}
    </div>
  );
}

export default Input;
export type { ChangeEventHandler, SubmitEventHandler };
