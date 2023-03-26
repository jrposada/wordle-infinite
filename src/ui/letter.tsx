import { createRef, CSSProperties, useEffect, useMemo, useState } from 'react';

import './letter.scss';

type LetterState = 'correct' | 'misplaced' | 'incorrect';

interface LetterProps {
    value?: string;
    state?: LetterState;
}

function Letter({ value, state }: LetterProps) {
    const containerRef = createRef<HTMLDivElement>();

    const [width, setWidth] = useState(0);

    const cssClasses = useMemo(() => {
        let result = 'letter';
        if (state) result += ` letter--${state}`;
        return result;
    }, [state]);

    const style = useMemo<CSSProperties>(
        () => ({
            width
        }),
        [width]
    );

    useEffect(() => {
        const onResize = () => {
            console.log(containerRef.current?.getBoundingClientRect().height);
            setWidth(containerRef.current?.getBoundingClientRect().height ?? 0);
        };

        onResize();
        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, [containerRef]);

    return (
        <div ref={containerRef} className={cssClasses} style={style}>
            {value?.toUpperCase()}
        </div>
    );
}

export default Letter;
export type { LetterState, LetterProps };
