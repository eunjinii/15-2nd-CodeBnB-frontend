import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { flexCenter, flexAlignCenter } from "../../../styles/Theme";
import Navigation from "../../../Components/Navigation/NavigationWithOutSelect";
import Footer from "../../../Components/Footer/Footer";
import { RESERVATION_LIST as API } from "../../../config";
import ReservationCard from "./ReservationCard/ReservationCard";

const ReservationHome = () => {
  const [status, setStatus] = useState(true);
  const [reservationList, setReservationList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    } else {
      fetchData();
    }
  }, [status]);

  const fetchData = () => {
    fetch(`${API}?status=${status ? "upcoming" : "past"}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.RESERVATIONS_LIST) {
          setReservationList(res.RESERVATIONS_LIST);
        } else {
          setReservationList([]);
        }
      });
  };

  const lookUpcoming = () => {
    setStatus(true);
  };

  const lookPast = () => {
    setStatus(false);
  };

  const ReservationEmpty = (
    <ReservationEmptyStyle>
      <span>과거 코딩 여행이 없습니다. 하지만 코딩 여행을 예약하면 여기서 확인하실 수 있습니다.</span>
      <button onClick={() => history.push("/")}>코드비앤비 둘러보기</button>
    </ReservationEmptyStyle>
  );

  return (
    <>
      <Navigation />
      <Reservation>
        <ReservationContainer>
          <ReservationTitle>여행</ReservationTitle>
          <CardHeader>
            <HeaderItem onClick={lookUpcoming} selected={status}>
              예정된 예약
            </HeaderItem>
            <HeaderItem onClick={lookPast} selected={!status}>
              이전 예약
            </HeaderItem>
          </CardHeader>
          <CardMain horizontal={reservationList?.length !== 0}>
            {reservationList.length === 0 && ReservationEmpty}
            {reservationList?.map(reservation => {
              console.log(reservation);
              return <ReservationCard reservation={reservation} />;
            })}
          </CardMain>
        </ReservationContainer>
      </Reservation>
      <CantFindReservation>
        <div>
          코딩하다 정신이 나갈 것 같나요?<span>영은님께 DM을 보내세요!</span>
        </div>
      </CantFindReservation>
      <Footer />
    </>
  );
};

export default ReservationHome;

const Reservation = styled.div`
  ${flexCenter}
  padding-bottom: 40px;
`;

const ReservationContainer = styled.div`
  width: 1400px;
  border-bottom: 1px solid #e0e0e0;
`;

const ReservationTitle = styled.h1`
  padding: 40px 0px 18px 0;
  font-size: 35px;
  font-weight: bold;
`;

const CardHeader = styled.header`
  ${flexAlignCenter}
  border-bottom: 1px solid #e0e0e0;
`;

const HeaderItem = styled.div`
  ${flexCenter}
  width: 90px;
  margin-right: 40px;
  padding: 22px 0;
  border-bottom: ${props => (props.selected ? "2px solid black" : "none")};
  font-size: 16px;
  font-weight: 500;
  color: ${props => (props.selected ? "black" : "#717171")};
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.selected ? "white" : "#f7f7f7")};
    color: black;
  }
`;

const CardMain = styled.main`
  display: ${props => (props.horizontal ? "flex" : "block")};
  height: 600px;
  overflow-x: scroll;
`;

const ReservationEmptyStyle = styled.section`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 0;
  background-image: url("/images/reservation/reservation_bg.jpg");
  background-repeat: no-repeat;
  background-position-y: 60px;
  background-size: contain;

  span {
    color: #4c4c4c;
    font-weight: 300;
  }

  button {
    width: 180px;
    height: 50px;
    background-color: #222222;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    outline: none;
    color: white;
    cursor: pointer;
  }
`;

const CantFindReservation = styled.div`
  ${flexCenter}
  margin-bottom: 120px;

  div {
    width: 1400px;
    color: #484848;

    span {
      margin-left: 7px;
      color: black;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
