import Word, { WordProps } from './word';

import './game-grid.scss';

interface GameGridProps {
    words: WordProps[];
}

function GameGrid({ words }: GameGridProps) {
    return (
        <div className="game-grid">
            {words.map((wordProps, index) => (
                <Word key={index} {...wordProps} />
            ))}
        </div>
    );
}

export default GameGrid;
