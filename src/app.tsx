import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import _wordList from "./core/api/list-manual.json";

import { getRandomInt } from "./utils/random";
import { LetterProps } from "./ui/letter";
import Input, { ChangeEventHandler, SubmitEventHandler } from "./ui/input";
import Victory from "./ui/victory";
import Word from "./ui/word";
import Defeat from "./ui/defeat";

import "./app.scss";
import { wordFormatter } from "./core/formatters/word-formatter";

const wordList = _wordList
  .map((word) => wordFormatter(word))
  .filter((word) => word.match(/^[A-z]+$/));
console.log(`Playing with ${wordList.length}`);

interface Try {
  letters: LetterProps[];
}

function App() {
  const animationTimer = useRef<NodeJS.Timeout>();
  const [currentTry, setCurrentTry] = useState(0);
  const [incorrect, setIncorrect] = useState(false);
  const [victory, setVictory] = useState<boolean>();
  const [tries, setTries] = useState<Try[]>([]);
  const [inputValue, setInputValue] = useState<string[]>([]);

  const solution = useMemo(() => wordList[getRandomInt(wordList.length)], []);
  const numTries = solution.length + 1;

  const handleInputChange = useCallback<ChangeEventHandler>((value) => {
    setInputValue(value);
  }, []);

  const shake = useCallback(() => {
    setIncorrect(true);

    if (animationTimer.current) {
      clearTimeout(animationTimer.current);
    }
    animationTimer.current = setTimeout(() => {
      setIncorrect(false);
    }, 750);
  }, []);

  const handleSubmit = useCallback<SubmitEventHandler>(
    (input) => {
      if (victory) return;
      if (input.join("") === solution) {
        setVictory(true);
      }

      if (wordList.includes(input.join(""))) {
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

          // Third pass only check misplaced as they may be incorrect as there are extra after check.
          input.forEach((letter, index) => {
            if (
              next[currentTry].letters[index].state === "misplaced" &&
              (evaluatedLettersCount[letter] ?? 0) > solutionCounts[letter]
            ) {
              next[currentTry].letters[index].state = "incorrect";
              evaluatedLettersCount[letter] -= 1;
            }
          });

          return next;
        });
        setCurrentTry((prev) => prev + 1);
        setInputValue([]);
      } else {
        shake();
      }
    },
    [currentTry, shake, solution, victory]
  );

  // Update tries.
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
        incorrect={incorrect}
        letters={inputValue}
        length={solution.length}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      {victory && <Victory />}
      {currentTry === numTries && !victory && <Defeat solution={solution} />}
    </div>
  );
}

export default App;
