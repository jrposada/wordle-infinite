import { useCallback } from "react";

import "./defeat.scss";

interface DefeatProps {
  solution: string;
}

function Defeat({ solution }: DefeatProps) {
  const handleClick = useCallback(() => {
    document.location.reload();
  }, []);

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
