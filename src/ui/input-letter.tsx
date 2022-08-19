import "./input-letter.scss";

interface InputLetterProps {
  value: string;
}

function InputLetter({ value }: InputLetterProps) {
  return <div className="letter-input">{value?.toUpperCase()}</div>;
}

export default InputLetter;
export type { InputLetterProps };
