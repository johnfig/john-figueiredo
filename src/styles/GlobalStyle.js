import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.body};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.5;
  }

  section {
    position: relative;
    z-index: 1;
  }

  /* Smooth transitions */
  * {
    transition: background-color 0.3s ease,
                transform 0.3s ease,
                opacity 0.3s ease;
  }
`;

export default GlobalStyle; 