import styled from "@emotion/styled";
import { LoadingOverlay } from "@mantine/core";
import { Header } from "./Header";
import React from "react";

interface IPropsLayout {
  title?: string;
  children: React.ReactNode;
  isLoading: boolean;
}



export const Layout = ({ children, isLoading = false }: IPropsLayout) => {
  return (
    <Content>
      <Header />
      <Main>
        {children}
      </Main>
      <LoadingOverlay visible={isLoading} />
    </Content>
  );
};

const Content = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  position: relative;
  height: calc(100vh - 60px);
  overflow-y: auto;
`;
