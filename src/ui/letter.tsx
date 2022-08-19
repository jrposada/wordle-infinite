import { useMemo } from "react";

import "./letter.scss";

type LetterState = "correct" | "misplaced" | "incorrect";

interface LetterProps {
  state?: LetterState;
  value?: string;
}

function Letter({ value, state }: LetterProps) {
  const cssClasses = useMemo(() => {
    let result = "letter";
    if (state) result += ` letter--${state}`;
    return result;
  }, [state]);

  return <div className={cssClasses}>{value?.toUpperCase()}</div>;
}

export default Letter;
export type { LetterState, LetterProps };
