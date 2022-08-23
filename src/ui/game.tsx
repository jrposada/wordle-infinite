import { useCallback, useMemo, useRef, useState } from 'react';

import { wordFormatter } from '../core/formatters/word-formatter';
import { getRandomInt } from '../utils/random';
import DICTIONARY from '../core/api/dictionary.json';

import GameGrid from './game-grid';
import Input, { SubmitEventHandler } from './input';
import { WordProps } from './word';
import Result, { GameState } from './result';

function Game() {
    const shakeTimeout = useRef<NodeJS.Timeout>();
    const [incorrect, setIncorrect] = useState(false);
    const [state, setState] = useState<GameState>('in-progress');
    const [currentTry, setCurrentTry] = useState(0);

    const solution = useMemo(() => {
        const filtered = DICTIONARY.map((word) => wordFormatter(word)).filter(
            (word) => word.match(/^[A-z]+$/)
        );

        return filtered[getRandomInt(filtered.length)];
    }, []);

    const numTries = solution.length + 1;

    const [words, setWords] = useState<WordProps[]>(() => {
        const result: WordProps[] = [];
        for (let i = 0; i < numTries; i++) {
            result.push({ letters: [], length: solution.length });
        }
        return result;
    });

    const shake = useCallback(() => {
        setIncorrect(true);

        if (shakeTimeout.current) {
            clearTimeout(shakeTimeout.current);
        }
        shakeTimeout.current = setTimeout(() => {
            setIncorrect(false);
        }, 750);
    }, []);

    const handleSubmit = useCallback<SubmitEventHandler>(
        (value) => {
            if (state === 'victory') return;
            const word = value.join('');

            if (word === solution) {
                setState('victory');
                return;
            }

            if (DICTIONARY.includes(word)) {
                setWords((prev) => {
                    const next = [...prev];

                    const evaluatedLettersCount: { [key: string]: number } = {};
                    const solutionCounts: { [key: string]: number } = {};
                    for (let i = 0; i < solution.length; i++) {
                        solutionCounts[solution[i]] =
                            (solutionCounts[solution[i]] ?? 0) + 1;
                    }

                    // Copy array to change reference. Needed for other nested components to hook into letters change.
                    next[currentTry].letters = [...next[currentTry].letters];

                    // First pass marks correct letters and incorrect
                    value.forEach((letter, index) => {
                        next[currentTry].letters[index] = { value: letter };
                        if (letter === solution[index]) {
                            next[currentTry].letters[index].state = 'correct';
                            evaluatedLettersCount[letter] =
                                (evaluatedLettersCount[letter] ?? 0) + 1;
                        } else {
                            next[currentTry].letters[index].state = 'incorrect';
                        }
                    });

                    // Second pass only check for incorrect letters but consider the number of letters
                    value.forEach((letter, index) => {
                        if (
                            next[currentTry].letters[index].state ===
                                'incorrect' &&
                            (evaluatedLettersCount[letter] ?? 0) <=
                                solutionCounts[letter]
                        ) {
                            next[currentTry].letters[index].state = 'misplaced';
                        }

                        evaluatedLettersCount[letter] =
                            (evaluatedLettersCount[letter] ?? 0) + 1;
                    });

                    // Third pass only check misplaced as they may be incorrect as there are extra after check.
                    value.forEach((letter, index) => {
                        if (
                            next[currentTry].letters[index].state ===
                                'misplaced' &&
                            (evaluatedLettersCount[letter] ?? 0) >
                                solutionCounts[letter]
                        ) {
                            next[currentTry].letters[index].state = 'incorrect';
                            evaluatedLettersCount[letter] -= 1;
                        }
                    });

                    return next;
                });
                setCurrentTry((prev) => prev + 1);
            } else {
                shake();
            }
        },
        [currentTry, shake, solution, state]
    );

    return (
        <>
            <GameGrid words={words} />
            <Input
                incorrect={incorrect}
                length={solution.length}
                onSubmit={handleSubmit}
            />
            <Result state={state} />
        </>
    );
}

export default Game;
