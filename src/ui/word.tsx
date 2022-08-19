import Letter, { LetterProps } from "./letter";

import "./word.scss";

interface WordProps {
  letters: LetterProps[];
}

function Word({ letters }: WordProps) {
  return (
    <div className="word">
      {letters.map((letter, index) => (
        <Letter key={index} state={letter.state} value={letter.value} />
      ))}
    </div>
  );
}

export default Word;
