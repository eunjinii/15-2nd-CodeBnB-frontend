import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
body {
  font-family: 'proxima-nova', 'Noto Sans KR', sans-serif;
  letter-spacing: -0.1px;
}
`;
export default GlobalStyle;
