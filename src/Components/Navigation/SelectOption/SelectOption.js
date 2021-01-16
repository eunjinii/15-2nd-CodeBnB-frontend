import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "../../DatePicker/DatePicker";
import MenuForm from "../../Menus/MenuForm";
import { ReactComponent as SearchIcon } from "./search_icon.svg";
import { ReactComponent as ClearButton } from "./clear_btn.svg";
import { flexCenter, flexAlignCenter } from "../../../styles/Theme";

const LOCATION = "isLocationClicked";
const CALENDAR = "isCalendarClicked";
const GUEST = "isGuestClicked";

const LOCATION_MAPPING = {
  seoul: "서울시 전체",
  gangnam: "서울시 강남구",
  mapo: "서울시 마포구",
  dongjak: "서울시 동작구",
  joonggu: "서울시 중구",
};

const SelectOption = ({
  locationRef,
  calendarRef,
  guestRef,
  menuRef,
  searchRef,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  location,
  setLocation,
  isMenuClicked,
  toggleMenu,
  adult,
  setAdult,
  child,
  setChild,
  infant,
  setInfant,
  clickSearch,
}) => {
  const [isSearchHovered, setIsSearchHovered] = useState(false);

  const LOCATION_PICK = (
    <LocationContainer>
      <div onClick={() => setLocation(LOCATION_MAPPING.seoul)}>
        <img src="/images/Navigation/search_history.png" alt="marker_icon" />
        <span>서울시 전체</span>
      </div>
      <div onClick={() => setLocation(LOCATION_MAPPING.gangnam)}>
        <img src="/images/Navigation/search_history.png" alt="marker_icon" />
        <span>서울시 강남구</span>
      </div>
      <div onClick={() => setLocation(LOCATION_MAPPING.mapo)}>
        <img src="/images/Navigation/search_history.png" alt="marker_icon" />
        <span>서울시 마포구</span>
      </div>
      <div onClick={() => setLocation(LOCATION_MAPPING.dongjak)}>
        <img src="/images/Navigation/search_history.png" alt="marker_icon" />
        <span>서울시 동작구</span>
      </div>
      <div onClick={() => setLocation(LOCATION_MAPPING.joonggu)}>
        <img src="/images/Navigation/search_history.png" alt="marker_icon" />
        <span>서울시 중구</span>
      </div>
    </LocationContainer>
  );

  const DATE_PICK = (
    <DatePickerWrapper>
      <DatePicker
        start={startDate}
        end={endDate}
        updateStartDate={setStartDate}
        updateEndDate={setEndDate}
        gapBetweenMonth={50}
        clearPosition={90}
      />
    </DatePickerWrapper>
  );

  const GUEST_PICK = (
    <GuestContainer>
      <GuestContainerSection>
        <div>
          <span>성인</span>
          <span>만 13세 이상</span>
        </div>
        <div>
          <Minus
            className={Number(adult) === 0 ? "noClick" : ""}
            onClick={() => {
              if (Number(adult) !== 0) setAdult(Number(adult) - 1);
            }}
          />
          <span>{Number(adult)}</span>
          <Plus onClick={() => setAdult(Number(adult) + 1)} />
        </div>
      </GuestContainerSection>
      <GuestContainerSection>
        <div>
          <span>어린이</span>
          <span>2 - 12세</span>
        </div>
        <div>
          <Minus
            className={Number(child) === 0 ? "noClick" : ""}
            onClick={() => {
              if (Number(child) !== 0) setChild(Number(child) - 1);
            }}
          />
          <span>{Number(child)}</span>
          <Plus onClick={() => setChild(Number(child) + 1)} />
        </div>
      </GuestContainerSection>
      <GuestContainerSection lastSection>
        <div>
          <span>유아</span>
          <span>2세 미만</span>
        </div>
        <div>
          <Minus
            className={Number(infant) === 0 ? "noClick" : ""}
            onClick={() => {
              if (Number(infant) !== 0) setInfant(Number(infant) - 1);
            }}
          />
          <span>{Number(infant)}</span>
          <Plus onClick={() => setInfant(Number(infant) + 1)} />
        </div>
      </GuestContainerSection>
    </GuestContainer>
  );

  return (
    <SelectOptionContainer>
      <SelectField>
        <LocationSection ref={locationRef} onClick={() => toggleMenu(LOCATION)}>
          <span>위치</span>
          {location ? <span className="makeBlack">{location}</span> : <span>어디로 여행가세요?</span>}
          {location ? (
            <div
              className="clearLocation"
              onClick={() => {
                setLocation("");
              }}
            >
              <ClearButton />
            </div>
          ) : (
            ""
          )}
        </LocationSection>
        <DateSection ref={calendarRef} onClick={() => toggleMenu(CALENDAR)}>
          <CheckInSection>
            <span>체크인</span>
            {startDate ? <span className="makeBlack">{startDate}</span> : <span>날짜추가</span>}
          </CheckInSection>
          <CheckOutSection>
            <span>체크아웃</span>
            {endDate ? <span className="makeBlack">{endDate}</span> : <span>날짜추가</span>}
          </CheckOutSection>
        </DateSection>
        <GuestSection className={isSearchHovered ? "makeWhite" : ""}>
          <div ref={guestRef} onClick={() => toggleMenu(GUEST)}>
            <span>인원</span>
            {adult + child + infant > 0 ? (
              <span className="makeBlack">게스트 {Number(adult) + Number(child) + Number(infant)}명</span>
            ) : (
              <span>게스트 추가</span>
            )}
          </div>
          <SelectButton
            ref={searchRef}
            onClick={clickSearch}
            onMouseEnter={() => {
              setIsSearchHovered(true);
            }}
            onMouseLeave={() => {
              setIsSearchHovered(false);
            }}
          >
            <SearchIcon />
          </SelectButton>
        </GuestSection>
      </SelectField>
      <MenuWrapper
        justContent={isMenuClicked[CALENDAR] ? "center" : isMenuClicked[LOCATION] ? "flex-start" : "flex-end"}
        ref={menuRef}
      >
        <MenuForm>
          {isMenuClicked[LOCATION] && LOCATION_PICK}
          {isMenuClicked[CALENDAR] && DATE_PICK}
          {isMenuClicked[GUEST] && GUEST_PICK}
        </MenuForm>
      </MenuWrapper>
    </SelectOptionContainer>
  );
};

export default SelectOption;

const SelectOptionContainer = styled.div`
  position: relative;
`;

const SelectField = styled.section`
  ${flexCenter}
  width: 850px;
  height: 65px;
  border-radius: 40px;
  box-shadow: 0px 0px 10px 7px rgba(50, 50, 50, 0.08);
`;

const SectionForm = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 65px;
  padding-left: 24px;
  border-radius: 40px;
  cursor: pointer;

  &:hover {
    background-color: #ebebeb;
  }

  span {
    &:nth-child(1) {
      margin-bottom: 5px;
      font-size: 12px;
      font-weight: bold;
    }
    &:nth-child(2) {
      font-size: 14px;
      color: #717171;

      &.makeBlack {
        color: black;
      }
    }
  }
`;
const DateSection = styled(SectionForm)`
  flex-direction: row;
  padding: 0;

  &:hover {
    background-color: white;
  }
`;

const LocationSection = styled(SectionForm)`
  width: 270px;

  div.clearLocation {
    position: absolute;
    right: 20px;
    cursor: pointer;

    .svg-icon {
      width: 20px;
      height: 20px;
    }
  }
`;

const CheckInSection = styled(SectionForm)`
  width: 180px;
`;

const CheckOutSection = styled(SectionForm)`
  width: 180px;
`;

const GuestSection = styled(SectionForm)`
  position: relative;
  width: 220px;

  div {
    display: flex;
    flex-direction: column;
  }

  &.makeWhite {
    background-color: white;
  }
`;

const SelectButton = styled.button`
  position: absolute;
  right: 10px;
  width: 50px;
  height: 50px;
  background-color: #ff395c;
  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #e61d50;
  }

  .svg-icon {
    width: 20px;
    height: 20px;

    path, polygon, rect {
      fill: white;
    }
    circle {
      stroke: #4691f6;
      stroke-width: 1;
    }
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: ${props => props.justContent};
  position: absolute;
  top: 80px;
  width: 850px;
  display: flex;
`;

const LocationContainer = styled.div`
  padding: 20px 0;
  background-color: white;
  div {
    width: 450px;
    ${flexAlignCenter}
    padding: 15px 30px;
    cursor: pointer;
    &:hover {
      background-color: #f7f7f7;
    }

    img {
      width: 40px;
      margin-right: 10px;
      border: 1px solid #e4e4e4;
      border-radius: 10px;
    }

    span {
      color: #222222;
      font-weight: 400;
      font-size: 15px;
    }
  }
`;

const DatePickerWrapper = styled.div`
  width: 850px;
`;

const GuestContainer = styled.div`
  ${flexCenter}
  flex-direction:column;
  width: 400px;
  padding: 10px 0;
  background-color: white;
`;

const GuestContainerSection = styled.section`
  ${flexAlignCenter}
  justify-content: space-between;
  width: 300px;
  padding: 30px 0;
  border-bottom: ${props => (props.lastSection ? "none" : "1px solid #ebebeb")};

  div {
    &:nth-child(1) {
      display: flex;
      flex-direction: column;

      span {
        &:nth-child(1) {
          margin-bottom: 5px;
          font-size: 16px;
        }

        &:nth-child(2) {
          font-size: 14px;
          color: #717171;
        }
      }
    }
    &:nth-child(2) {
      ${flexAlignCenter}

      div {
        margin: 0 10px;
      }
    }
  }
`;

const Minus = styled.div`
  display: inline-block;
  width: 32px;
  height: 32px;
  background: linear-gradient(#000, #000), linear-gradient(#000, #000);
  background-position: center;
  background-size: 40% 2px;
  background-repeat: no-repeat;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;

  &.noClick {
    opacity: 0.15;
    border: 1px solid rgba(0, 0, 0, 0.8);
    cursor: default;
  }
`;

const Plus = styled.div`
  display: inline-block;
  width: 32px;
  height: 32px;
  background: linear-gradient(#000, #000), linear-gradient(#000, #000);
  background-position: center;
  background-size: 40% 2px, 2px 40%;
  background-repeat: no-repeat;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
`;
