import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { DayPickerRangeController } from "react-dates";
import { ReactComponent as PrevIcon } from "./prev_button.svg";
import { ReactComponent as NextIcon } from "./next_button.svg";
import "moment/locale/ko";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const DatePicker = ({ start, end, blockedDates, updateStartDate, updateEndDate, gapBetweenMonth, clearPosition }) => {
  const [startDate, setStartDate] = useState(start ? moment(start) : null);
  const [endDate, setEndDate] = useState(end ? moment(end) : null);
  const [focusedInput, setFocusedInput] = useState("startDate");
  const blockedDate = useState(blockedDates)[0];

  const closestNextBlockedDate = (target, blockedDates) => {
    const nextBlockedDate = blockedDates
      ?.map(date => moment(date, "YYYY-MM-DD"))
      .sort(date => date.valueOf())
      .find(date => date.isAfter(target));
    return nextBlockedDate;
  };

  const closestPrevBlockedDate = (target, blockedDates) => {
    const prevBlockedDate = blockedDates
      ?.map(date => moment(date, "YYYY-MM-DD"))
      .sort(date => date.valueOf())
      .reverse()
      .find(date => date.isBefore(target));
    return prevBlockedDate;
  };

  const isBlocked = day => {
    let result = false;
    const newDay = moment(day.format("YYYY-MM-DD"));

    // Case #1. 체크인 체크아웃이 둘다 선택.
    if (startDate !== null && endDate !== null) {
      const newStart = moment(startDate.format("YYYY-MM-DD")).subtract(1, "days");
      const newEnd = moment(endDate.format("YYYY-MM-DD")).add(1, "days");
      result = !newDay.isBetween(newStart, newEnd);
      return result;

      // Case #2. 체크인만 선택.
    } else if (startDate !== null) {
      const newStart = moment(startDate.format("YYYY-MM-DD")).subtract(1, "days");
      const nextBlockedDate = closestNextBlockedDate(newStart, blockedDate);
      if (nextBlockedDate) {
        result = !newDay.isBetween(newStart, nextBlockedDate);
      } else {
        newStart.add(1, "days");
        result = newDay.isBefore(newStart);
      }
      return result;

      // Case #3. 체크아웃만 선택.
    } else if (endDate !== null) {
      const newEnd = moment(endDate.format("YYYY-MM-DD")).add(1, "days");
      const prevBlockedDate = closestPrevBlockedDate(newEnd, blockedDate);
      if (prevBlockedDate) {
        result = !newDay.isBetween(prevBlockedDate, newEnd);
      } else {
        result = !newDay.isBetween(moment(), newEnd);
      }
      return result;

      // Case #4. 둘다 선택 되지 않음.
    } else {
      result = blockedDate?.some(date => day.format("YYYY-MM-DD") === date) || day.isBefore(moment());
      return result;
    }
  };

  const clear = () => {
    setStartDate(null);
    setEndDate(null);
    setFocusedInput("startDate");
    updateStartDate("");
    updateEndDate("");
  };

  return (
    <>
      <DatePickerSection>
        <DayPickerRangeController
          startDate={startDate}
          endDate={endDate}
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
            updateStartDate(startDate?.format("YYYY-MM-DD"));
            updateEndDate(endDate?.format("YYYY-MM-DD"));
          }}
          focusedInput={focusedInput}
          onFocusChange={focusedInput => {
            setFocusedInput(focusedInput || "startDate");
          }}
          numberOfMonths={2}
          horizontalMonthPadding={gapBetweenMonth || 30}
          isDayBlocked={isBlocked}
          monthFormat="YYYY[년 ]MMMM"
          navPrev={
            <PrevButton>
              <PrevIcon />
            </PrevButton>
          }
          navNext={
            <NextButton>
              <NextIcon />
            </NextButton>
          }
          noBorder
        />
        <ClearButtonWrapper>
          <ClearButton clearPosition={clearPosition || "110"} onClick={clear}>
            날짜 지우기
          </ClearButton>
        </ClearButtonWrapper>
      </DatePickerSection>
    </>
  );
};

export default DatePicker;

const DatePickerSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  background-color: white;
  border-radius: 30px;
  font-family: sans-serif;

  .DayPickerKeyboardShortcuts_buttonReset {
    display: none;
  }

  .CalendarDay__default {
    border: none;
    border-radius: 50%;
    vertical-align: middle;
    outline: none;
  }

  .CalendarDay__default:hover {
    background: transparent;
    border: none;
    color: black;
    box-shadow: inset 0 0 0 1px black;
  }

  .CalendarDay__selected_span {
    background-color: #f7f7f7;
    border: none;
    color: black;
  }

  .CalendarDay__selected_span:active,
  .CalendarDay__selected_span:hover {
    color: black;
    background-color: #f7f7f7;
  }

  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: black;
    border: none;
    color: white;
  }

  .CalendarDay__blocked_calendar,
  .CalendarDay__blocked_calendar:active,
  .CalendarDay__blocked_calendar:hover {
    background: white;
    border: none;
    color: #d2d2d2;
    box-shadow: none;
    text-decoration: line-through;
  }
  .CalendarDay__hovered_span,
  .CalendarDay__hovered_span:hover {
    color: black;
    background-color: #f7f7f7;
    border: none;
  }

  .CalendarMonth_caption {
    margin-bottom: 10px;
  }
`;

const NavButtonForm = styled.div`
  position: absolute;
  top: 21px;

  .svg-icon {
    width: 20px;
    height: 20px;

    path,
    polygon,
    rect {
      fill: #484848;
    }
  }
`;

const PrevButton = styled(NavButtonForm)`
  left: 40px;
`;

const NextButton = styled(NavButtonForm)`
  right: 40px;
`;

const ClearButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 20px;
`;

const ClearButton = styled.button`
  width: 80px;
  height: 30px;
  margin-right: ${props => `${props.clearPosition}px`};
  background-color: white;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  color: #484848;
  outline: none;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }
`;
