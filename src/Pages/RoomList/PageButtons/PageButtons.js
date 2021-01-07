import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../../styles/Theme";

const PageButtons = ({ paging, homesCount }) => {
  return (
    <Pagination>
      <PageBtnContainer onClick={paging}>
        <PrevPage className="noClick" />
        {[...Array(5)].map((_, idx) => (
          <PageBtn data-index={idx + 1}>{idx + 1}</PageBtn>
        ))}
        <NextPage />
      </PageBtnContainer>
      <PageRange>숙소 {homesCount}개 중 1 - 15</PageRange>
      <AdditionalFee>추가 수수료가 부과됩니다. 세금도 부과될 수 있습니다.</AdditionalFee>
    </Pagination>
  );
};

const Pagination = styled.div`
  ${flexCenter};
  flex-direction: column;
  margin-bottom: 60px;
  height: 160px;
`;

const PageBtnContainer = styled.div`
  ${flexCenter}
  margin-bottom: 14px;
`;

const PageBtn = styled.div`
  ${flexCenter};
  margin: 0 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: ${props => props.theme.fontSizeSmall};
  font-weight: ${props => props.theme.fontWeightMedium};
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  /* &.active {
    background: #000;
    color: white;
  } */
`;

const NextPage = styled(PageBtn)`
  margin: 0 16px;
  position: relative;
  border-radius: 50%;
  cursor: pointer;
  background: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 26%;
    height: 4%;
    top: 41%;
    left: 52%;
    background: #000;
    z-index: 2;
    transform: translate(-50%, -50%) rotate(45deg);
    transition: all 0.2s linear;
  }

  &::after {
    z-index: 3;
    top: 59%;
    left: 52%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const PrevPage = styled(NextPage)`
  transform: rotate(180deg);
`;

// const NoClickPage = styled(NextPage)`
//   transform: rotate(180deg);
//   cursor: default;

//   &::before,
//   &::after {
//     background: rgba(0, 0, 0, 0.3);
//   }
// `;

const PageRange = styled.div`
  margin: 4px;
  font-size: ${props => props.theme.fontSizeSmall};
  font-weight: ${props => props.theme.fontWeightMedium};
`;

const AdditionalFee = styled.div`
  margin: 26px;
  font-size: ${props => props.theme.fontSizeExtrasmall};
  font-weight: ${props => props.theme.fontWeightRegular};
  color: #777;
`;

export default PageButtons;
