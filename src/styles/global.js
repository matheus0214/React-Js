import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  html, body, #root {
    height: 100%
  }

  body {
    background: linear-gradient(90deg, #91e9ff, #3d7bff);
    -webkit-font-smoothing: antialiased !important;
  }

  input, button {
    border: 0;
  }

  button {
    cursor: pointer;
  }
`;
