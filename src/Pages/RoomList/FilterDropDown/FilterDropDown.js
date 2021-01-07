import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RoomTypeCheckItem from "../FilterItems/CheckItem/RoomTypeCheckItem";
import styled, { css } from "styled-components";
import { flexCenter, flexAlignCenter } from "../../../styles/Theme";

const FilterDropDown = ({
  roomTypeFilters,
  setRoomTypeFilters,
  roomTypeFilteredResult,
  setRoomTypeFilteredResult,
  handleRoomTypePopUp,
  fetchFilteredData,
  setIsRoomFiltered,
  stringToQuery,
  arrayToString,
}) => {
  const popUpRef = useRef();
  const backgroundRef = useRef();
  const history = useHistory();

  // [숙소 유형] 체크하기
  const handleRoomTypeCheck = id => {
    const changedStatus = roomTypeFilters.map(filter => {
      if (filter.id === id) return { ...filter, isChecked: !filter.isChecked };
      return filter;
    });
    const filteredRoomTypes = changedStatus
      .filter(filter => filter.isChecked)
      .map(type => {
        return type.id;
      });
    setRoomTypeFilters(changedStatus);
    setRoomTypeFilteredResult(filteredRoomTypes);
  };

  // [숙소 유형] 검색버튼 쿼리스트링, 필터링
  const searchRoomResult = () => {
    const prevQueryArray = Object.entries({
      ...stringToQuery(history.location.search),
    }).filter(el => el[0] !== "room_types");
    const newQueryArray = roomTypeFilteredResult.map(result => [`room_types=${result}`]);
    const nextString = arrayToString([...prevQueryArray, ...newQueryArray]);
    history.push(`/roomlist${nextString}`);
    roomTypeFilteredResult && fetchFilteredData(nextString);
    setRoomTypeFilteredResult(roomTypeFilteredResult);
    roomTypeFilteredResult.length > 0 ? setIsRoomFiltered(true) : setIsRoomFiltered(false);
  };

  // 체크버튼 리셋
  const resetCheckBtn = () => {
    roomTypeFilters.map(filter => {
      filter.isChecked = false;
      return filter;
    });
    setRoomTypeFilteredResult([]);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    backgroundRef.current.addEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = event => {
    event.stopPropagation();
    if (popUpRef.current === null || !popUpRef.current.contains(event.target)) {
      document.body.style.overflow = "unset";
      handleRoomTypePopUp();
    }
  };

  return (
    <RoomTypeFilterBg ref={backgroundRef}>
      <RoomTypeFilterContents ref={popUpRef}>
        <CheckItems>
          {roomTypeFilters.map((type, index) => {
            return (
              <RoomTypeCheckItem key={index} index={index} type={type} handleRoomTypeCheck={handleRoomTypeCheck} />
            );
          })}
        </CheckItems>
        <DropDownBottom>
          <EraseBtn
            active={roomTypeFilteredResult.length > 0}
            className={`${roomTypeFilteredResult.length > 0 ? "active" : ""}`}
            onClick={resetCheckBtn}
          >
            지우기
          </EraseBtn>
          <ConfirmBtn
            onClick={() => {
              searchRoomResult();
              handleRoomTypePopUp();
              document.body.style.overflow = "unset";
            }}
          >
            저장
          </ConfirmBtn>
        </DropDownBottom>
      </RoomTypeFilterContents>
    </RoomTypeFilterBg>
  );
};

const RoomTypeFilterBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
`;

const RoomTypeFilterContents = styled.div`
  ${flexCenter}
  position: absolute;
  left: 0;
  top: 50px;
  flex-direction: column;
  width: 360px;
  height: 405px;
  background: white;
  border-radius: 12px;
  box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.1);
`;

const CheckItems = styled.ul`
  ${flexCenter}
  flex-direction: column;
  padding: 18px 24px;
  width: 100%;
  height: 340px;
`;

const DropDownBottom = styled.div`
  ${flexAlignCenter}
  justify-content: space-between;
  padding: 0 14px;
  width: 100%;
  height: 65px;
  border-top: 1px solid #ddd;
`;

const EraseBtn = styled.div`
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
  color: #ddd;

  ${props =>
    props.active &&
    css`
      color: #000;
    `}
`;

const ConfirmBtn = styled.div`
  ${flexCenter}
  width: 64px;
  height: 38px;
  background: #333;
  font-weight: ${props => props.theme.fontWeightMedium};
  font-size: ${props => props.theme.fontSizeSmall};
  color: #fff;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #000;
  }
`;

export default FilterDropDown;
