import { css } from "styled-components";

const theme = {
  fontSizeSupersmall: "12px",
  fontSizeExtrasmall: "13px",
  fontSizeSmall: "14px",
  fontSizeRegular: "15px",
  fontSizeMedium: "16px",
  fontWeightLight: "200",
  fontWeightRegular: "300",
  fontWeightMedium: "400",
  fontWeightBold: "600",
  fontColorLightgray: "#bdbdbd",
  fontColorGray: "#909090",
  fontColorBlack: "#191919",
  fontColorLighterblack: "#333",
  fontColorLightblue: "#bbd6ed",
  fontColorBlue: "#1e93f2",
  primaryColor: "#ff395c",
  bgColorGray: "#f7f7f7",
  borderColor: "#f8f9fa",
};
export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const flexJustCenter = css`
  display: flex;
  justify-content: center;
`;
export const flexAlignCenter = css`
  display: flex;
  align-items: center;
`;
export default theme;
