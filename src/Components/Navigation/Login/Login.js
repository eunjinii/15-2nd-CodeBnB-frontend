import React, { useState, useEffect } from "react";
import PopUp from "../../PopUp/PopUp";
import styled from "styled-components";
import { BaseButtonForm, InputForm } from "../../Buttons/Button";
import { Divider } from "../Signup/Signup";
const { Kakao } = window;

const API = "http://192.168.219.148:8000/users/signin";
const KAKAO_API = "http://192.168.219.148:8000/users/kakaologin";

const Login = ({ goToEitherSignupOrLogin, handleExit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEverythingOk, setIsEverythingOk] = useState(false);

  const REGEXP_PASSWORD_MORE_THAN_SIX_DIGITS = password => /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/.test(password);
  const IS_EMAIL_VALID = email => email.includes("@") && email.includes(".com");

  useEffect(() => {
    if (REGEXP_PASSWORD_MORE_THAN_SIX_DIGITS(password) && IS_EMAIL_VALID(email)) {
      setIsEverythingOk(true);
    }
  }, [email, password]);

  const signIn = () => {
    if (isEverythingOk) {
      fetch(API, {
        method: "POST",
        body: JSON.stringify({
          email: String(email),
          password: String(password),
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.MESSAGE === "SUCCESS") {
            alert("로그인 성공");
            localStorage.setItem("token", res.AUTHORIZATION);
            localStorage.setItem("username", res.email.split("@")[0]);
            localStorage.setItem("profile", res.profile);
            handleExit();
          } else {
            alert("회원 정보가 잘못되었읍니다. 다시 한번 확인해주세요 😊");
          }
        });
    }
  };

  const kakaoLogin = () => {
    Kakao.Auth.login({
      success: authObj => {
        console.log(authObj);
        fetch(KAKAO_API, {
          method: "POST",
          body: JSON.stringify({
            Authorization: authObj.access_token,
          }),
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            if (res.MESSAGE === "SUCCESS") {
              alert("로그인 성공");
              localStorage.setItem("token", res.AUTHORIZATION);
              localStorage.setItem("username", res.email.split("@")[0]);
              localStorage.setItem("profile", res.profile);
              handleExit();
            } else {
              alert("Kakao 로그인에 실패하였습니다.");
              goToEitherSignupOrLogin(true);
            }
          });
      },
      fail: error => {
        alert("kakao 로그인 실패");
      },
    });
  };

  const bottom = (
    <BottomButton>
      <span>에어비앤비 계정이 없으세요?</span>
      <span onClick={() => goToEitherSignupOrLogin(true)}>회원 가입</span>
    </BottomButton>
  );

  return (
    <PopUp title="로그인" bottom={bottom} handleExit={() => handleExit()}>
      <>
        <GoogleLogin>구글 계정으로 로그인</GoogleLogin>
        <KakaoLogin onClick={() => kakaoLogin()}>카카오 계정으로 로그인</KakaoLogin>
        <SigninDivider>
          <div></div>
          <div>또는</div>
          <div></div>
        </SigninDivider>
        <EmailInput onChange={event => setEmail(event.target.value)} />
        <PasswordInput onChange={event => setPassword(event.target.value)} />
        <LoginButton
          onClick={() => {
            signIn();
          }}
        >
          로그인
        </LoginButton>
      </>
    </PopUp>
  );
};

export default Login;

const KakaoLogin = styled(BaseButtonForm)`
  background-color: #f6d503;
  border: 2px solid #f6d503;
  color: #492900;
  margin: 0px auto 10px;
`;

const GoogleLogin = styled(BaseButtonForm)`
  background-color: white;
  border: 2px solid #757575;
  color: #484848;
  margin: 25px auto 10px;
`;

const EmailInput = styled(InputForm).attrs(() => ({ placeholder: "이메일 주소", type: "email" }))`
  margin-bottom: 15px;
`;
const PasswordInput = styled(InputForm).attrs(() => ({ placeholder: "비밀번호", type: "password" }))`
  margin-bottom: 30px;
`;

const SigninDivider = styled(Divider)`
  margin: 20px auto;
`;

const LoginButton = styled(BaseButtonForm)`
  background-color: #fe5b5f;
  border: 2px solid #fe5b5f;
  color: white;
  margin: 25px 20px 25px;
`;

const BottomButton = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #575757;
  span {
    &:nth-child(2) {
      margin-left: 10px;
      font-weight: 400;
      color: #39989b;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`;
