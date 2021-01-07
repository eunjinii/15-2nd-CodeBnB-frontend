import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import SelectOption from "./SelectOption/SelectOption";
import styled from "styled-components";
import { flexAlignCenter, flexCenter, flexJustCenter } from "../../styles/Theme";
import { ReactComponent as HamburgerIcon } from "./hamburger.svg";

const TOGGLE_HAMBURGER = "toggleHamburger";
const TOGGLE_LOGIN = "toggleLogin";
const TOGGLE_SIGNUP = "toggleSignup";
const LOCATION = "isLocationClicked";
const CALENDAR = "isCalendarClicked";
const GUEST = "isGuestClicked";

const Navigation = ({ state, stateSetter, fetchData, displaySelect = true, navigationPadding = 20 }) => {
  const { location, startDate, endDate, adult, child, infant } = state;
  const { setLocation, setStartDate, setEndDate, setAdult, setChild, setInfant } = stateSetter;

  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
  const [isLogInClicked, setIsLogInClicked] = useState(false);
  const [isSignupClicked, setIsSignupClicked] = useState(false);
  const [requireBirthday, setRequireBirthday] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState({
    isLocationClicked: false,
    isCalendarClicked: false,
    isGuestClicked: false,
  });

  const hamburgerRef = useRef();
  const locationRef = useRef();
  const calendarRef = useRef();
  const guestRef = useRef();
  const menuRef = useRef();
  const searchRef = useRef();
  const history = useHistory();

  const TOGGLE_SET = {
    toggleHamburger: () => setIsHamburgerClicked(!isHamburgerClicked),
    toggleLogin: () => setIsLogInClicked(!isLogInClicked),
    toggleSignup: () => setIsSignupClicked(!isSignupClicked),
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  const handleClickOutside = event => {
    const isAllRefPresent =
      hamburgerRef.current !== null &&
      locationRef.current !== null &&
      calendarRef.current !== null &&
      locationRef.current !== null &&
      guestRef.current !== null;
    if (isAllRefPresent) {
      const shouldHamburgerClose = !hamburgerRef.current.contains(event.target);
      const isOutsideClicked =
        !locationRef.current.contains(event.target) &&
        !calendarRef.current.contains(event.target) &&
        !guestRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target) &&
        !searchRef.current.contains(event.target);
      const shouldLocationClose = isMenuClicked[LOCATION] && isOutsideClicked;
      const shouldCalendarClose = isMenuClicked[CALENDAR] && isOutsideClicked;
      const shouldGuestClose = isMenuClicked[GUEST] && isOutsideClicked;
      if (shouldHamburgerClose) {
        setIsHamburgerClicked(false);
      }
      if (shouldLocationClose || shouldCalendarClose || shouldGuestClose) {
        toggleMenu();
      }
    }
  };

  const handleClick = modifier => {
    setRequireBirthday(false);
    const setState = TOGGLE_SET[modifier];
    setState();
  };

  const toggleMenu = modifier => {
    const newObj = { ...isMenuClicked };
    for (let i in newObj) {
      newObj[i] = false;
    }
    if (modifier) newObj[modifier] = true;
    setIsMenuClicked(newObj);
  };

  const goToEitherSignupOrLogin = bool => {
    setRequireBirthday(false);
    setIsSignupClicked(bool);
    setIsLogInClicked(!bool);
  };

  const clickSearch = () => {
    if (!location) {
      toggleMenu(LOCATION);
    } else if (!startDate || !endDate) {
      toggleMenu(CALENDAR);
    } else if (adult + child + infant === 0) {
      toggleMenu(GUEST);
    } else {
      toggleMenu();
      fetchData();
    }
  };

  return (
    <>
      <NavSpaceTaker></NavSpaceTaker>
      <NavWrapper>
        {isLogInClicked && (
          <Login handleExit={() => handleClick(TOGGLE_LOGIN)} goToEitherSignupOrLogin={goToEitherSignupOrLogin} />
        )}
        {isSignupClicked && (
          <Signup
            requireBirthday={requireBirthday}
            setRequireBirthday={setRequireBirthday}
            goToEitherSignupOrLogin={goToEitherSignupOrLogin}
            handleExit={() => handleClick(TOGGLE_SIGNUP)}
          />
        )}
        <Nav pad={navigationPadding}>
          <Logosection onClick={() => history.push("/")}>
            <img src="/images/Navigation/airbnb.png" alt="codebnb" />
            <span>codebnb</span>
          </Logosection>
          {displaySelect && (
            <SelectOption
              locationRef={locationRef}
              calendarRef={calendarRef}
              guestRef={guestRef}
              menuRef={menuRef}
              searchRef={searchRef}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              location={location}
              setLocation={setLocation}
              handleClick={handleClick}
              isMenuClicked={isMenuClicked}
              toggleMenu={toggleMenu}
              adult={adult}
              setAdult={setAdult}
              child={child}
              setChild={setChild}
              infant={infant}
              setInfant={setInfant}
              clickSearch={clickSearch}
            />
          )}
          <Hamburgersection>
            <div className="host">호스트 되기</div>
            <div onClick={() => handleClick(TOGGLE_HAMBURGER)} className="hamburgerMenu" ref={hamburgerRef}>
              <HamburgerIcon />
              <img
                src={
                  localStorage.getItem("profile")
                    ? localStorage.getItem("profile")
                    : "/images/Navigation/user_default.png"
                }
                alt="user"
              />
              <div className={`popup ${isHamburgerClicked || "hide"}`}>
                {localStorage.getItem("token") ? (
                  <>
                    <div
                      onClick={() => {
                        alert("안전하게 로그아웃! 안녕히 가세요 😊");
                        localStorage.clear();
                      }}
                    >
                      로그아웃
                    </div>
                    <div onClick={() => history.push("/reservation")}>여행</div>
                    <div>저장 목록</div>
                    <div>도움말</div>
                  </>
                ) : (
                  <>
                    <div onClick={() => handleClick(TOGGLE_LOGIN)}>로그인</div>
                    <div onClick={() => handleClick(TOGGLE_SIGNUP)}>회원가입</div>
                    <div>숙소 호스트 되기</div>
                    <div>체험 호스트 되기</div>
                    <div>도움말</div>
                  </>
                )}
              </div>
            </div>
          </Hamburgersection>
        </Nav>
      </NavWrapper>
    </>
  );
};

export default Navigation;

const NavSpaceTaker = styled.div`
  height: 90px;
`;

const NavWrapper = styled.div`
  ${flexAlignCenter}
  position: fixed;
  top: 0;
  background-color: white;
  width: 100%;
  height: 90px;
  z-index: 7;
  box-shadow: 0px 0px 10px 7px rgba(50, 50, 50, 0.08);
`;

const Nav = styled.nav`
  ${flexAlignCenter}
  justify-content: space-between;
  width: 100%;
  padding: 20px ${props => props.pad}px;
`;

const Logosection = styled.section`
  ${flexAlignCenter}
  cursor: pointer;

  img {
    width: 30px;
    margin-right: 5px;
  }

  span {
    font-weight: bolder;
    font-size: 25px;
    color: ${props => props.theme.primaryColor};
    letter-spacing: -0.5px;
  }
`;

const Hamburgersection = styled.section`
  ${flexAlignCenter}

  img {
    border-radius: 50%;
  }

  div.host {
    ${flexCenter}
    height: 45px;
    margin-right: 20px;
    padding: 10px 10px;
    border-radius: 30px;
    font-size: 13px;
    cursor: pointer;

    &:hover {
      background-color: #f7f7f7;
    }
  }

  div.hamburgerMenu {
    ${flexAlignCenter}
    position: relative;
    height: 45px;
    padding: 10px 10px;
    border: 1px solid #dddddd;
    border-radius: 30px;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 3px 3px -1px rgba(50, 50, 50, 0.31);
    }

    .svg-icon {
      margin-right: 10px;

      path,
      polygon,
      rect {
        fill: black;
      }
    }
    img {
      width: 30px;
    }

    div.popup {
      ${flexJustCenter}
      flex-direction: column;
      position: absolute;
      top: 55px;
      right: 0px;
      width: 250px;
      padding: 10px 0;
      background-color: white;
      border-radius: 20px;
      box-shadow: 0px 0px 10px -1px rgba(50, 50, 50, 0.31);
      color: #222222;
      overflow: hidden;
      &.hide {
        display: none;
      }

      div {
        ${flexAlignCenter}
        height: 48px;
        padding-left: 10px;

        &:hover {
          background-color: #f7f7f7;
        }
      }
    }
  }
`;
