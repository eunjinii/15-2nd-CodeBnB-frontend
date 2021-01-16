import React from "react";
import styled from "styled-components";
import CheckItem from "./CheckItem/CheckItem";
import { flexAlignCenter } from "../../../styles/Theme";

const FilterItems = ({ filter, id, viewMoreBtn, handleCheckBtn }) => {
  let checkedItems = [];
  filter.filterChecked.forEach((itemStatus, index) => {
    if (itemStatus) {
      checkedItems.push(filter.filterItem[index]);
    }
  });

  return (
    <ul>
      <FilterTitle>{filter.filterType}</FilterTitle>
      <FilterCheckItems>
        {filter.filterItem.length > 0 &&
          (filter.isViewOpen ? filter.filterItem : filter.filterItem.slice(0, 4)).map((item, index) => {
            return (
              <CheckItem
                key={index}
                id={index}
                index={index}
                item={item}
                filterType={filter.filterType}
                handleCheckBtn={handleCheckBtn}
                checkedItems={checkedItems}
              />
            );
          })}
      </FilterCheckItems>
      {filter.filterItem.length > 4 && (
        <ModalToggleBtn className="modalToggle" onClick={() => viewMoreBtn(id)}>
          <ModalToggleWord>
            {filter.isViewOpen ? `${filter.filterType} 닫기` : `${filter.filterType} 모두 보기`}
          </ModalToggleWord>
          <ModalToggleImg
            alt="arrow"
            src="/images/RoomList/arrow-down.png"
            className={filter.isViewOpen ? "opened" : ""}
          />
        </ModalToggleBtn>
      )}
    </ul>
  );
};

const FilterTitle = styled.h3`
  ${flexAlignCenter}
  justify-content: flex-start;
  padding-top: 10px;
  width: 100%;
  height: 90px;
  font-weight: $font-weight-medium;
  font-size: 22px;
  border-top: 1px solid #ddd;
`;

const FilterCheckItems = styled.li`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ModalToggleBtn = styled.div`
  ${flexAlignCenter}
  justify-content: flex-start;
  margin: 20px 0;
  padding-bottom: 20px;
  cursor: pointer;
`;

const ModalToggleWord = styled.div`
  margin-right: 8px;
  font-size: ${props => props.theme.fontSizeMedium};
  text-decoration: underline;
`;

const ModalToggleImg = styled.img`
  width: 10px;

  &.opened {
    transform: rotate(180deg);
  }
`;

export default FilterItems;
