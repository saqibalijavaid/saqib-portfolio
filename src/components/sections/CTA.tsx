import React from 'react';
import { Link } from 'react-router-dom';

const CTA: React.FC = () => {
  return (
    /*
     * Dark text on amber, not light. This section kept its original palette
     * through the accent migration and broke: blue-600 is dark, so pale text
     * sat on it comfortably, but amber is light and every pale option fails —
     * white measures 2.15:1 here, and the accent-100/200 it used were worse
     * still at 1.93:1 and 1.72:1.
     *
     * Measured replacements: gray-950 at 9.20:1, gray-800 at 7.06:1 (4.76:1 in
     * dark mode, where the background deepens to accent-600).
     */
    <div className="bg-accent-500 dark:bg-accent-600">
      <div className="max-w-3xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="font-display font-normal text-4xl text-gray-950 sm:text-5xl">
          <span className="block">Got a project in mind?</span>
          <span className="block text-gray-800">Let's build something together.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-gray-800">
          Open to remote frontend roles and freelance work. Usually reply within 24 hours.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          {/* Inverts the hero button — amber on dark there, dark on amber here. */}
          <Link
            to="/contact"
            className="inline-block px-8 py-3 rounded-md font-bold text-white bg-gray-950 hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:ring-offset-accent-500"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
