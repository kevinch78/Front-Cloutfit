import React from 'react';

const Card = ({
  children,
  className = '',
  hover = true,
  padding = true,
  onClick,
}) => {
  const hoverClass = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
  const paddingClass = padding ? 'p-4 md:p-6' : '';
  const cursorClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-md transition-all duration-300
        ${hoverClass} ${paddingClass} ${cursorClass} ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;