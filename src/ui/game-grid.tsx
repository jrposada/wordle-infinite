import Word, { WordProps } from './word';

import './game-grid.scss';

interface GameGridProps {
    words: WordProps[];
}

function GameGrid({ words }: GameGridProps) {
    return (
        <div className="game-grid">
            {words.map((wordProps) => (
                <Word {...wordProps} />
            ))}
        </div>
    );
}

export default GameGrid;
