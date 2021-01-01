import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { flexCenter, flexAlignCenter } from "../../styles/Theme";

const PopUp = ({ title, handleExit, children, bottom }) => {
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
      handleExit();
    }
  };

  return (
    <PopUpModal ref={backgroundRef}>
      <PopUpContainer ref={popUpRef}>
        <Header>
          <ExitButton
            onClick={() => {
              handleExit();
              document.body.style.overflow = "unset";
            }}
            alt="exit"
            src="/images/Components/close-button.png"
          />
          <Title>{title}</Title>
        </Header>
        <PopUpContents>{children}</PopUpContents>
        {bottom ? <Botton>{bottom}</Botton> : ""}
      </PopUpContainer>
    </PopUpModal>
  );
};

export default PopUp;

const PopUpModal = styled.div`
  ${flexCenter}
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

const PopUpContainer = styled.div`
  position: absolute;
  background: white;
  border-radius: 12px;
`;

const Header = styled.header`
  ${flexCenter}
  position: relative;
  width: 100%;
  height: 65px;
  padding: 4px 24px 0 24px;
  border-bottom: 1px solid #ddd;
`;

const ExitButton = styled.img`
  position: absolute;
  left: 24px;
  top: 27px;
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 18px;
`;

const PopUpContents = styled.div`
  position: relative;
  width: 100%;
  max-height: 70vh;
  overflow: scroll;
  overflow-x: hidden;
`;

const Botton = styled.div`
  ${flexAlignCenter}
  justify-content: space-between;
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  padding: 0 24px 4px 24px;
  background-color: white;
  border-top: 1px solid #ddd;
  border-radius: 0 0 12px 12px;
  font-size: 18px;
`;
