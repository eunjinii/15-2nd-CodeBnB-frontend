import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./styles/Theme";

const { Kakao } = window;
Kakao.init(process.env.REACT_APP_KAKAO_KEY);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Routes />
    <GlobalStyle />
  </ThemeProvider>,
  document.getElementById("root")
);
