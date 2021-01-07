import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";
import styled from "styled-components";
import { flexAlignCenter } from "../../styles/Theme";

const Home = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const history = useHistory();

  const state = {
    location,
    startDate,
    endDate,
    adult,
    child,
    infant,
  };

  const stateSetter = {
    setLocation,
    setStartDate,
    setEndDate,
    setAdult,
    setChild,
    setInfant,
  };

  const convertLocation = location => {
    if (location.split(" ")[1] === "강남구") {
      return "gangnam";
    } else if (location.split(" ")[1] === "마포구") {
      return "mapo";
    } else if (location.split(" ")[1] === "동작구") {
      return "dongjak";
    } else if (location.split(" ")[1] === "중구") {
      return "joonggu";
    } else {
      return "seoul";
    }
  };

  const fetchData = () => {
    const query = `?location=${convertLocation(
      location
    )}&checkin=${startDate}&checkout=${endDate}&adult=${adult}&child=${child}&infant=${infant}`;
    history.push(`/roomlist${query}`);
  };

  return (
    <>
      <Navigation state={state} stateSetter={stateSetter} fetchData={fetchData} />
      <Background>
        <Main>
          <MainText>이제, 코딩은</MainText>
          <MainText>가까운 곳에서</MainText>
        </Main>
      </Background>
      <Footer />
    </>
  );
};

export default Home;

const Background = styled.div`
  ${flexAlignCenter}
  height: 900px;
  background-image: url("/images/Home/home_background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;

const Main = styled.main`
  margin-left: 100px;
`;

const MainText = styled.div`
  font-weight: bolder;
  font-size: 60px;
  color: white;
`;
