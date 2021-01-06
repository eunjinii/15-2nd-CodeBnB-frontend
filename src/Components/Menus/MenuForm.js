import React from "react";
import styled from "styled-components";

const MenuForm = ({ children }) => {
  return <Menu>{children}</Menu>;
};

export default MenuForm;

const Menu = styled.div`
  border-radius: 40px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
`;
