import { useCallback } from "react";

import "./victory.scss";

function Victory() {
  const handleClick = useCallback(() => {
    document.location.reload();
  }, []);

  return (
    <div className="victory">
      <div className="victory__message">
        Big brains!
        <button onClick={handleClick}>Start again</button>
      </div>
    </div>
  );
}

export default Victory;
