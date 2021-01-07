import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../../../styles/Theme";

const CheckItem = ({ id, item, handleCheckBtn, filterType, checkedItems }) => {
  return (
    <CheckingItem className="CheckItem" onClick={() => handleCheckBtn(id - 1, filterType)} id={id}>
      {checkedItems && checkedItems.includes(item) ? (
        <CheckBox className="checked" id={id}>
          <CheckImg alt="check" src="/images/RoomList/check.png" />
        </CheckBox>
      ) : (
        <CheckBox />
      )}
      <Modifier className="modifier" id={id}>
        {item}
      </Modifier>
    </CheckingItem>
  );
};

const CheckingItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  height: 48px;
  font-size: 16px;
  color: #444;
  cursor: pointer;
`;

const CheckBox = styled.div`
  margin-right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  border: 1px solid #aaa;

  &.checked {
    ${flexCenter};
    background: #000;
  }
`;

const CheckImg = styled.img`
  width: 14px;
  height: 14px;
  filter: brightness(0) invert(1);
`;

const Modifier = styled.div`
  &:hover > span {
    border: 1px solid #000;
  }
`;

export default CheckItem;
