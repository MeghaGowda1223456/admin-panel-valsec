import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useState } from 'react';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { getDeviceToken } from './utils/firebase';
import Button from './theme/overrides/Button';

// ----------------------------------------------------------------------

export default function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  getDeviceToken(setTokenFound);

  return (
    <>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}
