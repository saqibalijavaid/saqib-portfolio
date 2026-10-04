import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Resets scroll position on navigation.
 *
 * React Router changes the URL without a page load, so the browser keeps
 * whatever scroll offset the previous page had. Clicking a footer link from the
 * bottom of the homepage was landing visitors at the bottom of the next page —
 * on Projects that meant opening on project 05/05 and the footer, never seeing
 * the heading.
 *
 * POP (browser back/forward) is deliberately left alone so returning to a page
 * still puts people back where they were.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'POP') return;
    window.scrollTo(0, 0);
  }, [pathname, navigationType]);

  return null;
}
