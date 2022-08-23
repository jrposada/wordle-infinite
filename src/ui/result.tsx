import { useCallback } from 'react';

import './result.scss';

type GameState = 'victory' | 'defeat' | 'in-progress';

interface ResultProps {
    state: GameState;
}

function Result({ state }: ResultProps) {
    const handleClick = useCallback(() => {
        document.location.reload();
    }, []);

    return (
        (state !== 'in-progress' && (
            <div className="result">
                <div className="result__message">
                    {state === 'victory' ? 'Victory!' : 'Defeat'}
                    <button onClick={handleClick}>Start again</button>
                </div>
            </div>
        )) ||
        null
    );
}

export default Result;
export type { ResultProps, GameState };
