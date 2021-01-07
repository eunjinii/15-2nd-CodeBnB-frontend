import React from "react";
import styled from "styled-components";
import { FOOTER_NAMES } from "./footer_data";
import { FOOTER_FOOTER } from "./footer_data";

const Footer = () => {
  return (
    <Footerbody>
      <Footermain>
        {FOOTER_NAMES.map(({ category_name, subCategory }, index) => {
          return (
            <Section key={index}>
              <Strong>{category_name}</Strong>
              {subCategory.map((sub, index) => {
                return <Spanabove key={index}>{sub}</Spanabove>;
              })}
            </Section>
          );
        })}
      </Footermain>
      <Footersection className="footer">
        <span>© 2020 Codebnb, Inc. All rights reserved · </span>
        {FOOTER_FOOTER.map((footer, index) => {
          return (
            <span key={index}>
              <Footerbottom className="footer">{footer}</Footerbottom>
              {index !== FOOTER_FOOTER.length - 1 ? <span> · </span> : ""}
            </span>
          );
        })}
      </Footersection>
    </Footerbody>
  );
};

const Footerbody = styled.div`
  background-color: #f7f7f7;
  padding: 50px 100px 30px;
  font-size: 14px;
`;

const Footermain = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  color: #222222;
  width: 400px;
`;

const Strong = styled.strong`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 15px;
`;

const Spanabove = styled.span`
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const Footersection = styled.section`
  padding-top: 30px;
  border-top: 1px solid #dddddd;
  color: #222222;
`;

const Footerbottom = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

export default Footer;
