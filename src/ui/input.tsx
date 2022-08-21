import {
  createRef,
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import InputLetter from "./input-letter";

import "./input.scss";

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
  const inputRef = createRef<HTMLInputElement>();

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

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => onChange(event.target.value.toLocaleLowerCase().split("")),
    [onChange]
  );

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      letters.length === length && onSubmit(letters);
    },
    [length, onSubmit, letters]
  );

  const handleBlur = useCallback(() => inputRef.current?.focus(), [inputRef]);

  // Focus
  useEffect(() => inputRef.current?.focus(), [inputRef]);

  return (
    <div className={cssClasses}>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={letters.join("")}
          onChange={handleChange}
          onBlur={handleBlur}
          className="input__input"
        />
      </form>
      {values.map((letter, index) => (
        <InputLetter key={index} value={letter} />
      ))}
    </div>
  );
}

export default Input;
export type { ChangeEventHandler, SubmitEventHandler };
