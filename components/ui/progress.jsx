import React from "react";

export const Progress = ({ value = 0, max = 100 }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full h-3 bg-[#2E3A48] rounded-full overflow-hidden shadow-inner">
      <div
        className="h-full bg-[#C8A765] transition-all duration-500 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
