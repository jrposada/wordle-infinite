import { useCallback, useEffect } from "react";

import "./defeat.scss";

interface DefeatProps {
  solution: string;
}

function Defeat({ solution }: DefeatProps) {
  const restart = useCallback(() => document.location.reload(), []);

  const handleClick = useCallback(() => restart(), [restart]);

  useEffect(() => {});

  return (
    <div className="defeat">
      <div className="defeat__message">
        :( no brains...
        <div>{solution}</div>
        <button onClick={handleClick}>Try again!</button>
      </div>
    </div>
  );
}

export default Defeat;
