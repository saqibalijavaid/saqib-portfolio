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
  const baseStyle =
    'px-6 py-2 rounded-md font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900';
  /*
   * Dark text on amber, not white. White on accent-500 measures 2.15:1 —
   * nowhere near the 4.5:1 AA requirement — while near-black measures
   * 9.20:1 and reads sharper.
   */
  const primaryStyle = 'bg-accent-500 text-gray-950 hover:bg-accent-400';
  const secondaryStyle =
    'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700';

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
