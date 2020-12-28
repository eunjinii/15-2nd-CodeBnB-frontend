import styled from "styled-components";
import { flexCenter, flexAlignCenter } from "../../styles/Theme";

export const BaseButtonForm = styled.div`
  ${flexCenter}
  width: 500px;
  height: 50px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

export const InputForm = styled.input`
  ${flexAlignCenter}
  width: 500px;
  height: 50px;
  margin: 0 25px;
  padding: 15px;
  border: 1.5px solid #eaeaea;
  border-radius: 5px;
  outline-color: #028388;
  font-size: 15px;
  font-weight: 400;
  color: #757575;
`;
