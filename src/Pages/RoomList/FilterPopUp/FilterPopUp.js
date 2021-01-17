import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import FilterItems from "../FilterItems/FilterItems";
import BedFilterItem from "../FilterItems/BedFilterItem";
import { flexCenter, flexAlignCenter } from "../../../styles/Theme";

const FilterPopUp = ({
  handlePopUp,
  filters,
  handleModifyBtn,
  viewMoreBtn,
  handleCheckBtn,
  filteredResult,
  setFilteredResult,
  handleSearchBtn,
}) => {
  const popUpRef = useRef();
  const backgroundRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    backgroundRef.current.addEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = event => {
    event.stopPropagation();
    if (popUpRef.current === null || !popUpRef.current.contains(event.target)) {
      document.body.style.overflow = "unset";
      handlePopUp();
    }
  };

  return (
    <FilterBackground className="FilterPopUp" ref={backgroundRef}>
      <FilterContainer className="popUpContainer" ref={popUpRef} style={{ width: "780px" }}>
        <PopUpHeader>
          <ExitBtn alt="exit" src="/images/RoomList/close-button.png" onClick={handlePopUp} />
          <PopUpTitle>필터 추가하기</PopUpTitle>
        </PopUpHeader>
        <PopUpContents className="popUpContents">
          <FilterListBed className="bedroom">
            <h3>{filters[0].filterType}</h3>
            <ul>
              {filters[0].filterItem.map((item, index) => {
                return (
                  <BedFilterItem
                    key={index}
                    id={index}
                    filter={item}
                    handleModifyBtn={handleModifyBtn}
                    filteredCounts={filters[0].filterChecked}
                  />
                );
              })}
            </ul>
          </FilterListBed>
          <FilterListsRest className="filterLists">
            {filters.slice(1).map((filter, index) => {
              return (
                <FilterItems
                  key={index}
                  id={index}
                  viewMoreBtn={viewMoreBtn}
                  filter={filter}
                  handleCheckBtn={handleCheckBtn}
                  filteredResult={filteredResult}
                />
              );
            })}
          </FilterListsRest>
        </PopUpContents>
        <BottomContainer>
          <ResetBtn active={filteredResult} onClick={() => setFilteredResult([])}>
            전체 삭제
          </ResetBtn>
          <ConfirmBtn onClick={handleSearchBtn}>숙소 검색 결과</ConfirmBtn>
        </BottomContainer>
      </FilterContainer>
    </FilterBackground>
  );
};

const FilterBackground = styled.div`
  ${flexCenter};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

const FilterContainer = styled.div`
  position: absolute;
  background: white;
  border-radius: 12px;
`;

const PopUpHeader = styled.header`
  position: relative;
  ${flexCenter};
  padding: 4px 24px 0 24px;
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #ddd;
`;

const ExitBtn = styled.img`
  position: absolute;
  left: 24px;
  top: 27px;
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

const PopUpTitle = styled.div`
  font-size: 18px;
`;

const PopUpContents = styled.div`
  position: relative;
  width: 100%;
  max-height: 70vh;
  overflow: scroll;
  overflow-x: hidden;
`;

const FilterListBed = styled.div`
  padding: 0 50px 20px;
  width: 780px;

  h3 {
    ${flexAlignCenter};
    justify-content: flex-start;
    padding-top: 10px;
    height: 90px;
    font-weight: ${props => props.theme.fontWeightMedium};
    font-size: 22px;
  }
`;

const FilterListsRest = styled.div`
  padding: 0 50px 20px;
`;

const BottomContainer = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  ${flexAlignCenter};
  justify-content: space-between;
  padding: 0 24px 4px 24px;
  width: 100%;
  height: 80px;
  background: white;
  font-size: 18px;
  border-radius: 0 0 12px 12px;
  border-top: 1px solid #ddd;
`;

const ResetBtn = styled.div`
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
  color: #ddd;

  ${props =>
    props.active &&
    css`
      color: black;
    `}
`;

const ConfirmBtn = styled.div`
  ${flexCenter};
  width: 140px;
  height: 48px;
  background: #333;
  font-size: ${props => props.theme.fontSizeMedium};
  color: #fff;
  border: 1px solid #000;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: #000;
  }
`;

export default FilterPopUp;
