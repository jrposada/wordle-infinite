import { useCallback, useEffect, useMemo, useState } from "react";

import animals from "./api/animals";

import Input, { ChangeEventHandler, SubmitEventHandler } from "./ui/input";
import { LetterProps } from "./ui/letter";
import Victory from "./ui/victory";
import Word from "./ui/word";

import "./app.scss";
import { getRandomInt } from "./utils/random";

interface Try {
  letters: LetterProps[];
}

const NUM_TRIES = 5;

function App() {
  const [currentTry, setCurrentTry] = useState(0);
  const [victory, setVictory] = useState(false);
  const [tries, setTries] = useState<Try[]>([]);
  const [inputValue, setInputValue] = useState<string[]>([]);

  const word = useMemo(
    () => animals.elementos[getRandomInt(animals.elementos.length)],
    []
  );

  const handleInputChange = useCallback<ChangeEventHandler>((value) => {
    setInputValue(value);
  }, []);

  const handleSubmit = useCallback<SubmitEventHandler>(
    (value) => {
      if (value.join("") === word) {
        setVictory(true);
      }

      if (animals.elementos.includes(value.join("")) || true) {
        setTries((prev) => {
          const next = [...prev];

          value.forEach((letter, index) => {
            // FIXME misplace.
            next[currentTry].letters[index].value = letter;
            next[currentTry].letters[index].state =
              letter === word[index] ? "correct" : "incorrect";
          });

          return next;
        });
        setCurrentTry((prev) => prev + 1);
      }
    },
    [currentTry, word]
  );

  // Fetch word from api.
  useEffect(() => {
    setTries(() => {
      const result = [];
      for (let i = 0; i < NUM_TRIES; i++) {
        const letters: LetterProps[] = [];
        for (let j = 0; j < word.length; j++) {
          letters.push({});
        }
        result.push({ letters });
      }
      return result;
    });
  }, [word]);

  return (
    <div className="app">
      {word}
      {tries?.map((row, index) => (
        <Word key={index} letters={row.letters} />
      ))}
      <Input
        letters={inputValue}
        length={word.length}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      {victory && <Victory />}
    </div>
  );
}

export default App;
