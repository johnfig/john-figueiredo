import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Partners from './components/Partners';
import Portfolio from './components/Portfolio';
import Exits from './components/Exits';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    position: fixed;
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: none;
    touch-action: pan-y pinch-zoom;
  }

  #root {
    width: 100%;
    overflow-x: hidden;
    position: relative;
  }

  body {
    overscroll-behavior-y: none;
    overscroll-behavior-x: none;
    overflow-x: hidden !important;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <Hero />
      <About />
      <Partners />
      <Portfolio />
      <Exits />
    </ThemeProvider>
  );
}

export default App; 