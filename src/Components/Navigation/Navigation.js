import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import styled from "styled-components";
import { flexAlignCenter, flexCenter, flexJustCenter } from "../../styles/Theme";
import { ReactComponent as HamburgerIcon } from "./hamburger.svg";

const TOGGLE_HAMBURGER = "toggleHamburger";
const TOGGLE_LOGIN = "toggleLogin";
const TOGGLE_SIGNUP = "toggleSignup";

const Navigation = () => {
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
  const [isLogInClicked, setIsLogInClicked] = useState(false);
  const [isSignupClicked, setIsSignupClicked] = useState(false);
  const [requireBirthday, setRequireBirthday] = useState(false);
  const hamburgerRef = useRef();
  const history = useHistory();

  const TOGGLE_SET = {
    toggleHamburger: () => setIsHamburgerClicked(!isHamburgerClicked),
    toggleLogin: () => setIsLogInClicked(!isLogInClicked),
    toggleSignup: () => setIsSignupClicked(!isSignupClicked),
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = event => {
    if (!hamburgerRef.current.contains(event.target)) {
      setIsHamburgerClicked(false);
    }
  };

  const handleClick = modifier => {
    setRequireBirthday(false);
    const setState = TOGGLE_SET[modifier];
    setState();
  };

  const goToEitherSignupOrLogin = bool => {
    setRequireBirthday(false);
    setIsSignupClicked(bool);
    setIsLogInClicked(!bool);
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
        <Nav>
          <Logosection onClick={() => history.push("/")}>
            <img src="/images/Navigation/airbnb.png" alt="codebnb" />
            <span>codebnb</span>
          </Logosection>
          <Datesection></Datesection>
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
                    <div onClick={() => localStorage.clear()}>로그아웃</div>
                    <div>여행</div>
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
`;

const Nav = styled.nav`
  ${flexAlignCenter}
  justify-content: space-between;
  width: 100%;
  padding: 20px 20px;
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
    font-size: 20px;
    color: ${props => props.theme.primaryColor};
    letter-spacing: -0.5px;
  }
`;

const Datesection = styled.section`
  width: 850px;
  height: 65px;
  border-radius: 40px;
  background-color: red;
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
