import React, { useState, useEffect } from "react";
import PopUp from "../../PopUp/PopUp";
import styled from "styled-components";
import { flexAlignCenter } from "../../../styles/Theme";
import { BaseButtonForm, InputForm } from "../../Buttons/Button";
import { ReactComponent as NoIcon } from "./no_icon.svg";
import { ReactComponent as YesIcon } from "./yes_icon.svg";
import { KAKAO_API, SIGNUP_API as API } from "../../../config";
const { Kakao } = window;

const Signup = ({ goToEitherSignupOrLogin, handleExit, requireBirthday, setRequireBirthday }) => {
  const [emailSignup, setEmailSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [subscribe, setSubscribe] = useState(false);
  const [isEverythingOk, setIsEverythingOk] = useState(false);

  const REGEXP_PASSWORD_MORE_THAN_SIX_DIGITS = password => /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/.test(password);
  const IS_EMAIL_VALID = email => email.includes("@") && email.includes(".com");

  useEffect(() => {
    if (
      REGEXP_PASSWORD_MORE_THAN_SIX_DIGITS(password) &&
      IS_EMAIL_VALID(email) &&
      lastName &&
      firstName &&
      date &&
      month &&
      year <= 2002
    ) {
      setIsEverythingOk(true);
    }
  }, [email, lastName, firstName, password, date, month, year]);

  const signUp = () => {
    if (isEverythingOk) {
      fetch(API, {
        method: "POST",
        body: JSON.stringify({
          birthdayDate: String(date),
          birthdayMonth: String(month),
          birthdayYear: String(year),
          email: email,
          first_name: firstName,
          last_name: lastName,
          password: String(password),
          mailing_check: subscribe ? 1 : 0,
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.MESSAGE === "SUCCESS") {
            alert("회원가입에 성공하였습니다 😙");
            goToEitherSignupOrLogin(false);
          } else if (res.MESSAGE === "ALREADY_EXISTS") {
            alert("아이디가 이미 존재합니다 ☺️");
            goToEitherSignupOrLogin(false);
          } else {
            alert("잘못된 정보 입니다. 입력 정보를 확인해주세요 😋");
          }
        });
    }
  };

  const kakaoSignup = () => {
    if (month === 0 || month === "월" || date === 0 || date === "일" || year === 0 || year === "년") {
      alert("생년월일을 입력해 주세요 🙂");
    } else if (Number(year) > 2002) {
      alert("만 18세 이하는 가입할 수 없습니다. 😊");
      clearInformation();
      goToEitherSignupOrLogin(true);
    } else {
      Kakao.Auth.login({
        success: authObj => {
          fetch(KAKAO_API, {
            method: "POST",
            body: JSON.stringify({
              Authorization: authObj.access_token,
              birthdayDate: String(date),
              birthdayMonth: String(month),
              birthdayYear: String(year),
            }),
          })
            .then(res => res.json())
            .then(res => {
              alert("회원가입에 성공하였습니다 🤪");
              goToEitherSignupOrLogin(false);
            });
        },
        fail: error => {
          alert("kakao 로그인 실패하였습니다 😙");
          document.body.style.overflow = "unset";
          handleExit();
        },
      });
    }
  };

  const clearInformation = () => {
    setEmail("");
    setLastName("");
    setFirstName("");
    setPassword("");
    setDate(0);
    setMonth(0);
    setYear(0);
    setSubscribe(false);
  };

  const bottom = (
    <Custombottom>
      <span>이미 에어비앤비 계정이 있나요?</span>
      <span onClick={() => goToEitherSignupOrLogin(false)} className="로그인버튼">
        로그인
      </span>
    </Custombottom>
  );

  return (
    <PopUp title={requireBirthday ? "생일 입력" : "회원가입"} bottom={bottom} handleExit={() => handleExit()}>
      {emailSignup ? (
        <>
          <Emailform onChange={event => setEmail(event.target.value)} />
          {(email.length === 0 || !IS_EMAIL_VALID(email)) && (
            <Validation>
              {!IS_EMAIL_VALID(email) && (
                <div>
                  <NoIcon />
                  유효한 이메일 형식이 아닙니다
                </div>
              )}
            </Validation>
          )}
          <Lastnameform onChange={event => setLastName(event.target.value)} />
          {lastName.length === 0 && (
            <Validation>
              <div>
                <NoIcon />
                성을 입력해주십시요.
              </div>
            </Validation>
          )}
          <Firstnameform onChange={event => setFirstName(event.target.value)} />
          {firstName.length === 0 && (
            <Validation>
              <div>
                <NoIcon />
                이름을 입력해주십시요.
              </div>
            </Validation>
          )}
          <Passwordform onChange={event => setPassword(event.target.value)} />
          {password && (
            <Validation>
              {!REGEXP_PASSWORD_MORE_THAN_SIX_DIGITS(password) ? (
                <div>
                  <NoIcon />
                  비밀번호 보안 수준: 약함
                </div>
              ) : (
                <div>
                  <YesIcon />
                  비밀번호 보안 수준: 강함
                </div>
              )}
              {!REGEXP_PASSWORD_MORE_THAN_SIX_DIGITS(password) ? (
                <div>
                  <NoIcon />
                  문자와 숫자를 포함해서 6자리 이상
                </div>
              ) : (
                ""
              )}
            </Validation>
          )}

          <Birthday>
            <strong>생일</strong>
            <p>
              만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른 코드비앤비 이용자에게 공개되지 않습니다.
            </p>
            <div className="selectOptions">
              <Monthselect onChange={event => setMonth(event.target.value)}>
                <option>월</option>
                {[...Array(12).keys()].map((num, index) => {
                  return <option key={index} value={`${num + 1}`}>{`${num + 1}월`}</option>;
                })}
              </Monthselect>
              <DateSelect onChange={event => setDate(event.target.value)}>
                <option>일</option>
                {[...Array(31).keys()].map((num, index) => {
                  return <option key={index} value={`${num + 1}`}>{`${num + 1}일`}</option>;
                })}
              </DateSelect>
              <Yearselect onChange={event => setYear(event.target.value)}>
                <option>년</option>
                {[...Array(30).keys()].reverse().map((num, index) => {
                  return <option key={index} value={`${num + 1991}`}>{`${num + 1991}`}</option>;
                })}
              </Yearselect>
            </div>
            {(month === 0 || month === "월") && (
              <Validation>
                <div>
                  <NoIcon />
                  월을 선택해주세요
                </div>
              </Validation>
            )}
            {(date === 0 || date === "일") && (
              <Validation>
                <div>
                  <NoIcon />
                  일을 선택해주세요
                </div>
              </Validation>
            )}
            {year === 0 || year === "년" ? (
              <Validation>
                <div>
                  <NoIcon />
                  년도를 선택해주세요
                </div>
              </Validation>
            ) : year > 2002 ? (
              <Validation>
                <div>
                  <NoIcon />만 18세 이하는 서비스를 이용할 수 없습니다. 🤔
                </div>
              </Validation>
            ) : (
              ""
            )}
          </Birthday>
          <SubscriptionPolicy>
            코드비앤비의 회원 전용 할인, 추천 여행 정보, 프로모션 및 정책 변경사항을 이메일로 보내드립니다. 계정 관리의
            환경설정 또는 프로모션 알림에서 언제든지 메시지 수신을 거부할 수 있습니다.
          </SubscriptionPolicy>
          <Subscription>
            <input onClick={event => setSubscribe(event.target.checked)} id="doYouWantSub" type="checkbox" />
            <label htmlFor="doYouWantSub"></label>
            <span>에어비앤비에서 보내는 마케팅 메시지를 받고 싶지 않습니다.</span>
          </Subscription>
          <SignupButton onClick={signUp}>가입하기</SignupButton>
        </>
      ) : requireBirthday ? (
        <KakaoBirthday>
          <strong>생일</strong>
          <p>코드 비앤비의 서비스를 이용하기 위해서는 생년월일을 입력해 주셔야 합니다 🙂</p>
          <div className="selectOptions">
            <Monthselect onChange={event => setMonth(event.target.value)}>
              <option>월</option>
              {[...Array(12).keys()].map((num, index) => {
                return <option key={index} value={`${num + 1}`}>{`${num + 1}월`}</option>;
              })}
            </Monthselect>
            <DateSelect onChange={event => setDate(event.target.value)}>
              <option>일</option>
              {[...Array(31).keys()].map((num, index) => {
                return <option key={index} value={`${num + 1}`}>{`${num + 1}일`}</option>;
              })}
            </DateSelect>
            <Yearselect onChange={event => setYear(event.target.value)}>
              <option>년</option>
              {[...Array(30).keys()].reverse().map((num, index) => {
                return <option key={index} value={`${num + 1991}`}>{`${num + 1991}`}</option>;
              })}
            </Yearselect>
          </div>
          {(month === 0 || month === "월") && (
            <Validation>
              <div>
                <NoIcon />
                월을 선택해주세요
              </div>
            </Validation>
          )}
          {(date === 0 || date === "일") && (
            <Validation>
              <div>
                <NoIcon />
                일을 선택해주세요
              </div>
            </Validation>
          )}
          {(year === 0 || year === "년") && (
            <Validation>
              <div>
                <NoIcon />
                년도를 선택해주세요
              </div>
            </Validation>
          )}
          <KakaoLogin onClick={kakaoSignup}>카카오 계정으로 회원가입</KakaoLogin>
        </KakaoBirthday>
      ) : (
        <Signupmain>
          <Googlebutton>구글 계정으로 회원가입하기</Googlebutton>
          <Kakaobutton onClick={() => setRequireBirthday(true)}>카카오 계정으로 회원가입하기</Kakaobutton>
          <Divider>
            <div></div>
            <div>또는</div>
            <div></div>
          </Divider>
          <Emailbutton onClick={() => setEmailSignup(!emailSignup)}>이메일로 회원가입하기</Emailbutton>
        </Signupmain>
      )}
    </PopUp>
  );
};

export default Signup;

const Custombottom = styled.div`
  font-size: 16px;
  font-weight: 400;

  span {
    margin-right: 10px;

    &:nth-child(2) {
      color: #008388;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Signupmain = styled.main`
  ${flexAlignCenter}
  flex-direction: column;
  width: 550px;
`;

export const Kakaobutton = styled(BaseButtonForm)`
  background-color: #f6d503;
  border: 2px solid #f6d503;
  color: #492900;
`;

export const Googlebutton = styled(BaseButtonForm)`
  margin: 25px 0 15px 0;
  background-color: white;
  border: 2px solid #757575;
  color: #484848;
`;

const Emailbutton = styled(BaseButtonForm)`
  margin-bottom: 25px;
  background-color: #fe5b5f;
  border: 2px solid #fe5b5f;
  color: white;
`;

const SignupButton = styled(BaseButtonForm.withComponent("button"))`
  margin: 15px 25px;
  background-color: #fe5b5f;
  border: 2px solid #fe5b5f;
  color: white;
  outline: none;
`;

export const Divider = styled.section`
  ${flexAlignCenter}
  justify-content: space-between;
  width: 500px;
  margin: 20px 0px;

  div {
    color: #757575;

    &:nth-child(1),
    &:nth-child(3) {
      height: 1px;
      width: 200px;
      background-color: #e3e3e3;
    }
  }
`;

const Emailform = styled(InputForm).attrs(() => ({
  placeholder: "이메일 주소",
  type: "email",
}))`
  margin: 25px;
`;

const Lastnameform = styled(InputForm).attrs(() => ({
  placeholder: "성(예: 홍)",
}))`
  margin: 25px;
`;

const Firstnameform = styled(InputForm).attrs(() => ({
  placeholder: "이름(예: 길동)",
}))`
  margin: 25px;
`;

const Passwordform = styled(InputForm).attrs(() => ({
  placeholder: "비밀번호 설정하기",
  type: "password",
}))`
  margin: 25px;
  ime-mode: disabled;
`;

export const Validation = styled.div`
  width: 500px;
  margin: 0px auto 20px;
  div {
    ${flexAlignCenter}
    margin-bottom: 10px;
    font-size: 13px;
    color: red;

    .svg-icon {
      width: 20px;
      height: 20px;
      margin-right: 5px;
      path,
      polygon,
      rect {
        fill: red;
      }
    }
  }
`;

export const Birthday = styled.div`
  margin: 0 25px;
  width: 500px;
  strong {
    font-size: 20px;
    font-weight: 400;
    color: #484848;
  }
  p {
    margin: 15px 0;
    font-size: 14px;
    font-weight: 300;
    color: #484848;
  }

  div.selectOptions {
    ${flexAlignCenter}
    justify-content: space-between;
    margin-bottom: 10px;
  }
`;

const Selectform = styled.select`
  padding: 10px 0;
  height: 50px;
  outline: none;
  border: 1.5px solid #eaeaea;
  border-radius: 5px;
  font-size: 17px;
  color: #484848;
`;

export const Monthselect = styled(Selectform)`
  width: 190px;
`;

export const DateSelect = styled(Selectform)`
  width: 130px;
`;

export const Yearselect = styled(Selectform)`
  width: 160px;
`;

const SubscriptionPolicy = styled.p`
  margin: 15px 25px;
  width: 500px;
  font-size: 14px;
  font-weight: 300;
  color: #484848;
`;

const Subscription = styled.div`
  ${flexAlignCenter}
  margin: 15px 25px;
  width: 500px;

  input {
    display: none;

    & + label {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-right: 10px;
      border: 2px solid #038389;
      border-radius: 5px;
      cursor: pointer;
    }
    &:checked + label {
      background-color: #038389;
    }
  }
  span {
    margin: 15px 0;
    font-size: 14px;
    font-weight: 300;
    color: #484848;
  }
`;

const KakaoBirthday = styled(Birthday)`
  margin: 20px 25px 20px;
`;

const KakaoLogin = styled(BaseButtonForm)`
  background-color: #f6d503;
  border: 2px solid #f6d503;
  color: #492900;
  margin: 0px auto 10px;
`;
