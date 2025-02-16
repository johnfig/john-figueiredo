import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
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
    width: 100%;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: contain;
  }

  #root {
    width: 100%;
    overflow-x: hidden;
    position: relative;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.background};
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Exits />
    </ThemeProvider>
  );
}

export default App; 