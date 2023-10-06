import React from "react";
import styled from "@emotion/styled";
import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <StyledHeader>
      <TitleHeader>Sentiment Analysis</TitleHeader>
      <Navbar />
    </StyledHeader>
  );
};

const StyledHeader = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 2rem;
  background-color: #010101;
  color: white;
  width: 100%;
  height: 60px;
`;

const TitleHeader = styled("h2")`
  margin: 0;
`;
