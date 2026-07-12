import React from 'react';

const HeroPattern: React.FC = () => {
  // Config: Adjust these to change density/size
  const rows = 12; // Number of rows
  const cols = 8; // Number of dots per row

  return (
    <div className="absolute top-0 right-0 h-full w-full md:w-2/3 overflow-hidden z-0 pointer-events-none">
      {/* 1. The Container Wrapper
         - Rotated -12deg to give the diagonal flow.
         - Translated to position correctly on the right side.
         - Opacity set low for subtlety.
      */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 -rotate-12 opacity-60">
        <div className="flex flex-col gap-8 md:gap-12">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              // 2. The Row Offset Logic
              // We shift every even row to create the "interlocked" look
              className={`flex gap-8 md:gap-12 ${rowIndex % 2 === 0 ? 'pl-12 md:pl-20' : ''}`}
            >
              {Array.from({ length: cols }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  // 3. The Pill Shape
                  // - w-24 h-8 + rounded-full = Pill
                  // - bg-blue-200/30 = Soft semi-transparent blue
                  // - blur-sm = Removes harsh edges for the "airy" feel

                  className="w-16 h-6 md:w-24 md:h-8 rounded-full bg-blue-300/50 dark:bg-blue-500/30 blur-sm"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Soft Fade Masks (Optional but recommended)
          This gradient overlay fades the pattern out as it approaches the text area (left)
          and the bottom, ensuring it doesn't look like a hard rectangle cut-off.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent dark:from-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-gray-900" />
    </div>
  );
};

export default HeroPattern;
