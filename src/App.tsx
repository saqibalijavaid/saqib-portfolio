import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

/*
 * Home stays in the main bundle because it is the most common landing page and
 * should paint without a second network round trip. The rest are split out so a
 * visitor does not download the projects gallery, the contact form and the
 * About page's LinkedIn embed just to read the homepage.
 */
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Reserves roughly a viewport of height so swapping in the real page does not
// shift the layout underneath the visitor.
const RouteFallback = () => <div className="min-h-[70vh]" aria-busy="true" />;

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* The Layout wraps all these routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="about"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="projects"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <Projects />
                </Suspense>
              }
            />
            <Route
              path="contact"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
