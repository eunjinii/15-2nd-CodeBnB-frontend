import React from "react";
import styled from "styled-components";
import moment from "moment";
import { flexCenter, flexAlignCenter } from "../../../../styles/Theme";
import { ReactComponent as MoveIcon } from "./move_icon.svg";
import { useHistory } from "react-router-dom";

const ReservationCard = ({ reservation }) => {
  const { home_id, address, start_date, end_date, home_image, home_name, resrvation_id } = reservation;
  const history = useHistory();

  const momentToString = date => {
    const newDate = moment(date).format("YYYY-MM-DD").split("-");
    return `${newDate[0]}년 ${newDate[1]}월 ${newDate[2]}일`;
  };

  return (
    <ReservationCardsStyle>
      <CardContainer>
        <ImageContainer src={home_image[0]}></ImageContainer>
        <ContentsContainer>
          <Date>{`${momentToString(start_date)} - ${momentToString(end_date)}`}</Date>
          <header>{`${address.split(",")[1]} ${address.split(",")[0]}`}</header>
          <Content onClick={() => history.push(`/reservation/detail/${resrvation_id}`)}>
            <div>
              <img src={home_image[0]} alt="room_photo" />
              <span>{home_name}</span>
            </div>
            <div>
              <MoveIcon />
            </div>
          </Content>
        </ContentsContainer>
        <ShowDetail onClick={() => history.push(`/reservation/detail/${resrvation_id}`)}>여행 계획 더 보기</ShowDetail>
      </CardContainer>
    </ReservationCardsStyle>
  );
};

export default ReservationCard;

const ReservationCardsStyle = styled.section`
  ${flexAlignCenter}
  height: 100%;
  margin: 0 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  height: 450px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
`;

const ImageContainer = styled.div`
  height: 210px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const ContentsContainer = styled.div`
  padding: 10px 30px 0 30px;

  header {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 25px;
    color: #2a2a2a;
  }
`;

const Date = styled.div`
  color: #999999;
  margin-bottom: 10px;
`;

const Content = styled.div`
  ${flexAlignCenter}
  justify-content: space-between;
  cursor: pointer;

  div {
    &:nth-child(1) {
      ${flexAlignCenter}

      img {
        width: 50px;
        height: 50px;
        margin-right: 15px;
        border-radius: 10px;
      }

      span {
        color: #383838;
      }
    }
    &:nth-child(2) {
      .svg-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const ShowDetail = styled.div`
  ${flexCenter}
  height: 60px;
  border-top: 1px solid #dddddd;
  color: #222222;
  cursor: pointer;
`;
