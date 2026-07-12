import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset'; // <--- This is the part you need!
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  type = 'button', // Default is standard button, but you can override it
}) => {
  const baseStyle = 'px-6 py-2 rounded-md font-semibold transition-all duration-200 cursor-pointer';
  const primaryStyle = 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer';
  const secondaryStyle = 'bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer';

  const style = `${baseStyle} ${variant === 'primary' ? primaryStyle : secondaryStyle}`;

  return (
    <button
      type={type} // <--- This passes "submit" to the HTML element
      className={style}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
