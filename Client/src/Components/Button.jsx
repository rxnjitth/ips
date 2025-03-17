import React from 'react';
import clsx from 'clsx';

const Button = ({ children, type, color, onclick }) => {
  return (
    <div
      onClick={onclick}
      className={clsx(
        "md:px-7 md:py-4 rounded-lg px-3 py-3.5 cursor-pointer",
        type === "filled" ? `bg-${color} text-white` : `border border-${color} text-${color}`,
      )}
    >
      {children}
    </div>
  );
};

export default Button;
