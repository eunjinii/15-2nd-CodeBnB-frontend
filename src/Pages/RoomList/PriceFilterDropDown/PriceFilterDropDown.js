import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import PriceSlider from "./PriceSlider";
import { flexCenter, flexAlignCenter } from "../../../styles/Theme";

const PriceFilterDropDown = ({
  handleExit,
  data,
  setIsPriceFiltered,
  isPriceFiltered,
  fetchFilteredData,
  stringToQuery,
  queryToString,
}) => {
  const popUpRef = useRef();
  const backgroundRef = useRef();
  const [value, setValue] = useState([]);
  const [curVal, setCur] = useState([]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [avg, setAvg] = useState();

  useEffect(() => {
    if (data.homes.length > 0) {
      const prices = data.homes.map(home => +home.price["1박비용"]);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setAvg(Math.ceil(data.avg_price));
      setValue([min, max]);
      setMin(min);
      setMax(max);
      if (curVal.length > 0) {
        setValue([curVal[0], curVal[1]]);
      }
    }
  }, [curVal, data]);

  const history = useHistory();
  const getPriceFilterResult = () => {
    const nextQueryObj = { ...stringToQuery(history.location.search) };
    nextQueryObj["price_min"] = curVal[0];
    nextQueryObj["price_max"] = curVal[1];
    const nextString = queryToString(nextQueryObj);
    curVal && history.push(`/roomlist${nextString}`);
    fetchFilteredData(nextString);
    !value[0] || !curVal[0] ? setIsPriceFiltered(false) : setIsPriceFiltered(true);
  };

  const getMinInputValue = e => {
    setCur([+e.target.value, curVal[1]]);
  };

  const getMaxInputValue = e => {
    setCur([curVal[0], +e.target.value]);
  };

  const handleChange = (e, newValue) => {
    setCur(newValue);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    backgroundRef.current.addEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = e => {
    if (popUpRef.current === null || !popUpRef.current.contains(e.target)) {
      document.body.style.overflow = "unset";
      handleExit();
    }
  };

  return (
    <PriceFilterContainer ref={backgroundRef}>
      <PriceFilterContents ref={popUpRef}>
        <PriceInfo>
          <div>평균 1박 요금은 ₩{avg && avg.toLocaleString()}입니다.</div>
          <PriceSlider
            min={min}
            curVal={curVal}
            value={value}
            max={max}
            handleChange={handleChange}
            getMinInputValue={getMinInputValue}
            getMaxInputValue={getMaxInputValue}
          />
        </PriceInfo>
        <Button>
          <EraseBtn active={min !== value[0] || value[1] !== max || isPriceFiltered} onClick={() => setCur([min, max])}>
            지우기
          </EraseBtn>
          <ConfirmBtn
            onClick={() => {
              getPriceFilterResult();
              handleExit();
              document.body.style.overflow = "unset";
            }}
          >
            저장
          </ConfirmBtn>
        </Button>
      </PriceFilterContents>
    </PriceFilterContainer>
  );
};

export default PriceFilterDropDown;

const PriceFilterContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
`;

const PriceFilterContents = styled.div`
  ${flexCenter};
  flex-direction: column;
  position: absolute;
  left: 102px;
  top: 50px;
  width: 440px;
  background: white;
  border-radius: 12px;
  box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.1);
`;

const PriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  height: 130px;
  margin: 50px;

  div {
    margin-bottom: 20px;
  }
`;

const Button = styled.div`
  ${flexAlignCenter}
  justify-content: space-between;
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65px;
  padding: 0 24px 4px 24px;
  background-color: white;
  border-top: 1px solid #ddd;
  border-radius: 0 0 12px 12px;
  font-size: 18px;
  padding: 0 14px;
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
  ${flexCenter};
  font-weight: 400;
  font-size: 14px;
  width: 64px;
  height: 38px;
  background: #333;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #000;
  }
`;
