import {
    ChangeEventHandler,
    createRef,
    FormEventHandler,
    useCallback,
    useEffect
} from 'react';

import './input.scss';

type SubmitEventHandler = (value: string[]) => void;

interface InputProps {
    disabled: boolean;
    length: number;
    onSubmit: SubmitEventHandler;
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
}

function Input({ disabled, length, onSubmit, onChange, value }: InputProps) {
    const inputRef = createRef<HTMLInputElement>();

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        (event) => {
            event.preventDefault();
            if (value.length !== length) return;

            onSubmit(value.split(''));
        },
        [length, onSubmit, value]
    );

    // Focus trap
    const handleBlur = useCallback(() => inputRef.current?.focus(), [inputRef]);
    useEffect(() => inputRef.current?.focus(), [inputRef]);

    return (
        <form onSubmit={handleSubmit} className="input">
            <input
                ref={inputRef}
                className="input__input"
                value={value}
                disabled={disabled}
                onChange={onChange}
                onBlur={handleBlur}
            />
        </form>
    );
}

export default Input;
export type { SubmitEventHandler };
