import React from "react";
import styled, { css } from "styled-components";
import { flexAlignCenter } from "../../../styles/Theme";

const BedFilterItem = ({ id, filter, handleModifyBtn, filteredCounts }) => {
  return (
    <BedFilter className="BedFilterItem">
      <div>{filter}</div>
      <Modifier className="modifier">
        <Minus onClick={() => handleModifyBtn(id, "minus")} count={filteredCounts[id]} />
        <div>{filteredCounts[id]}</div>
        <Plus onClick={() => handleModifyBtn(id, "plus")} />
      </Modifier>
    </BedFilter>
  );
};

const BedFilter = styled.li`
  ${flexAlignCenter}
  justify-content: space-between;
  width: 100%;
  height: 56px;
  font-size: 17px;
  color: #444;
`;

const Modifier = styled.div`
  ${flexAlignCenter}
  justify-content: space-between;
  width: 104px;
`;

const Plus = styled.div`
  display: inline-block;
  width: 32px;
  height: 32px;
  background: linear-gradient(#000, #000), linear-gradient(#000, #000);
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
  background-size: 40% 2px, 2px 40%;
`;

const Minus = styled(Plus)`
  background-size: 40% 2px;
  ${props =>
    !props.count &&
    css`
      opacity: 0.15;
      border: 1px solid rgba(0, 0, 0, 0.8);
      cursor: default;
    `}
`;

export default BedFilterItem;
