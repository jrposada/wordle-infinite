import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { take, timer } from 'rxjs';

import Letter, { LetterProps } from './letter';

import './word.scss';

interface WordProps {
    letters: LetterProps[];
    length: number;
    incorrect: boolean;
}

function Word({ incorrect, letters: lettersData, length }: WordProps) {
    // TODO: add incorrect css
    const cssClasses = classNames('word', { 'word--incorrect': incorrect });

    const [letters, setLetters] = useState<LetterProps[]>(() => {
        const result: LetterProps[] = [];
        for (let i = 0; i < length; i++) {
            result.push({});
        }
        return result;
    });

    useEffect(() => {
        if (lettersData.length !== length) return;

        setLetters(lettersData.map((letter) => ({ value: letter.value })));

        const subscription = timer(0, 75)
            .pipe(take(length))
            .subscribe((index) => {
                setLetters((prev) => {
                    const next = [...prev];

                    next[index].state = lettersData[index].state;
                    next[index].value = lettersData[index].value;

                    return next;
                });
            });

        return () => subscription.unsubscribe();
    }, [length, lettersData]);

    return (
        <div className={cssClasses}>
            {letters.map((letterProps, index) => (
                <Letter key={index} {...letterProps} />
            ))}
        </div>
    );
}

export default Word;
export type { WordProps };
