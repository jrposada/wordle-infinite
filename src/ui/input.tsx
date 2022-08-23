import classNames from 'classnames';
import {
    ChangeEventHandler,
    createRef,
    FormEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';

import InputLetter from './input-letter';

import './input.scss';

type SubmitEventHandler = (value: string[]) => void;

interface InputProps {
    incorrect: boolean;
    length: number;
    onSubmit: SubmitEventHandler;
}

function Input({ incorrect, length, onSubmit }: InputProps) {
    const inputRef = createRef<HTMLInputElement>();
    const [clear, setClear] = useState(false);
    const [value, setValue] = useState('');

    const letters = useMemo<string[]>(() => {
        const result: string[] = [];
        for (let i = 0; i < length; i++) {
            result.push(value[i] ?? '');
        }
        return result;
    }, [length, value]);

    const cssClasses = classNames('input', { 'input--incorrect': incorrect });

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            if (event.target.value.length <= length) {
                setValue(event.target.value);
            }
        },
        [length]
    );

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        (event) => {
            event.preventDefault();
            if (value.length !== length) return;

            onSubmit(value.split(''));
            setClear(true);
        },
        [length, onSubmit, value]
    );

    useEffect(() => {
        if (clear && !incorrect) {
            setValue('');
            setClear(false);
        }
    }, [clear, incorrect]);

    // Focus trap
    const handleBlur = useCallback(() => inputRef.current?.focus(), [inputRef]);
    useEffect(() => inputRef.current?.focus(), [inputRef]);

    return (
        <div className={cssClasses}>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    className="input__input"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </form>
            {letters.map((letter, index) => (
                <InputLetter key={index} value={letter} />
            ))}
        </div>
    );
}

export default Input;
export type { SubmitEventHandler };
