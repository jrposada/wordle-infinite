import { useCallback, useEffect, useMemo, useState } from "react";

import animals from "./api/animals";

import { getRandomInt } from "./utils/random";
import { LetterProps } from "./ui/letter";
import Input, { ChangeEventHandler, SubmitEventHandler } from "./ui/input";
import Victory from "./ui/victory";
import Word from "./ui/word";
import Defeat from "./ui/defeat";

import "./app.scss";

interface Try {
  letters: LetterProps[];
}

function App() {
  const [currentTry, setCurrentTry] = useState(0);
  const [victory, setVictory] = useState<boolean>();
  const [tries, setTries] = useState<Try[]>([]);
  const [inputValue, setInputValue] = useState<string[]>([]);

  const solution = useMemo(
    () => animals.elementos[getRandomInt(animals.elementos.length)],
    []
  );
  const numTries = solution.length + 1;

  const handleInputChange = useCallback<ChangeEventHandler>((value) => {
    setInputValue(value);
  }, []);

  const handleSubmit = useCallback<SubmitEventHandler>(
    (input) => {
      if (victory) return;
      if (input.join("") === solution) {
        setVictory(true);
      }

      if (animals.elementos.includes(input.join("")) || true) {
        setTries((prev) => {
          const next = [...prev];

          const evaluatedLettersCount: { [key: string]: number } = {};
          const solutionCounts: { [key: string]: number } = {};
          for (let i = 0; i < solution.length; i++) {
            solutionCounts[solution[i]] =
              (solutionCounts[solution[i]] ?? 0) + 1;
          }

          // First pass marks correct letters and incorrect
          input.forEach((letter, index) => {
            next[currentTry].letters[index].value = letter;
            if (letter === solution[index]) {
              next[currentTry].letters[index].state = "correct";
              evaluatedLettersCount[letter] =
                (evaluatedLettersCount[letter] ?? 0) + 1;
            } else {
              next[currentTry].letters[index].state = "incorrect";
            }
          });

          // Second pass only check for incorrect letters but consider the number of letters
          input.forEach((letter, index) => {
            if (
              next[currentTry].letters[index].state === "incorrect" &&
              (evaluatedLettersCount[letter] ?? 0) <= solutionCounts[letter]
            ) {
              next[currentTry].letters[index].state = "misplaced";
            }

            evaluatedLettersCount[letter] =
              (evaluatedLettersCount[letter] ?? 0) + 1;
          });

          return next;
        });
        setCurrentTry((prev) => prev + 1);
        setInputValue([]);
      }
    },
    [currentTry, solution, victory]
  );

  // Fetch word from api.
  useEffect(() => {
    setTries(() => {
      const result = [];
      for (let i = 0; i < numTries; i++) {
        const letters: LetterProps[] = [];
        for (let j = 0; j < solution.length; j++) {
          letters.push({});
        }
        result.push({ letters });
      }
      return result;
    });
  }, [numTries, solution]);

  return (
    <div className="app">
      {tries?.map((row, index) => (
        <Word key={index} letters={row.letters} />
      ))}
      <Input
        letters={inputValue}
        length={solution.length}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      {victory && <Victory />}
      {currentTry === numTries && <Defeat solution={solution} />}
    </div>
  );
}

export default App;
