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


.svg-icon {
  width: 1em;
  height: 1em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: black;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 1;
}
`;
export default GlobalStyle;
