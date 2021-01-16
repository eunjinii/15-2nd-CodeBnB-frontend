import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../../styles/Theme";

const EmptyState = ({ deleteFilter }) => {
  return (
    <RoomListEmptyState>
      <h4>검색 결과 없음</h4>
      <div>날짜 변경, 필터 삭제, 지도에서 줌아웃 등을 통해 검색 결과를 조정해보세요.</div>
      <FilterDeleteBtn onClick={deleteFilter}>모든 필터 삭제</FilterDeleteBtn>
    </RoomListEmptyState>
  );
};

export default EmptyState;

const RoomListEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0 600px;
  width: 1600px;
  height: 150px;
  border-bottom: 1px solid #ddd;

  h4 {
    margin-bottom: 8px;
    font-size: 22px;
    font-weight: ${props => props.theme.fontWeightMedium};
  }

  div {
    margin-bottom: 24px;
    font-size: ${props => props.theme.fontSizeRegular};
    font-weight: ${props => props.theme.fontWeightRegular};
  }
`;

const FilterDeleteBtn = styled.div`
  ${flexCenter};
  font-weight: 400;
  font-size: 14px;
  width: 130px;
  height: 38px;
  background: #333;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #000;
  }
`;
