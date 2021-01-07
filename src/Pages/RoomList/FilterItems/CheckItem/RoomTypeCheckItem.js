import React from "react";
import styled, { css } from "styled-components";
import { flexCenter } from "../../../../styles/Theme";

const RoomTypeCheckItem = ({ type, handleRoomTypeCheck }) => {
  return (
    <RoomTypeFilter onClick={() => handleRoomTypeCheck(type.id)}>
      {type ? (
        <CheckBox checked={type.isChecked} id={type.id}>
          <CheckImg alt="check" src="/images/RoomList/check.png" />
        </CheckBox>
      ) : (
        <CheckBox />
      )}
      <Explain>
        <FilterItemTitle>{type.title}</FilterItemTitle>
        <FilterItemContent>{type.content}</FilterItemContent>
      </Explain>
    </RoomTypeFilter>
  );
};

const RoomTypeFilter = styled.div`
  ${flexCenter};
  margin: 8px 0;
  width: 100%;
  height: 75px;
`;

const CheckBox = styled.div`
  margin-right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  border: 1px solid #aaa;
  cursor: pointer;
  ${props =>
    props.checked &&
    css`
      ${flexCenter};
      background: #000;
    `}
  ${props =>
    props.prevChecked &&
    css`
      ${flexCenter};
      background: #000;
    `}
`;

const CheckImg = styled.img`
  width: 14px;
  height: 14px;
  filter: brightness(0) invert(1);
`;

const Explain = styled.div`
  width: 280px;
  letter-spacing: -0.2px;
`;

const FilterItemTitle = styled.div`
  margin-bottom: 6px;
  font-weight: ${props => props.theme.fontWeightMedium};
  font-size: ${props => props.theme.fontSizeMedium};
`;

const FilterItemContent = styled.div`
  font-weight: ${props => props.theme.fontWeightRegular};
  font-size: ${props => props.theme.fontSizeSmall};
  line-height: 18px;
`;

export default RoomTypeCheckItem;
