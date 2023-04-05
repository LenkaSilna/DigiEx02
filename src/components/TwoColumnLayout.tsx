import React, { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Column = styled.div`
  flex: 1;
  height: 100%;
  padding: 20px;
  overflow: auto;
  word-wrap: break-word;
`;

const LeftColumn = styled(Column)`
  background-color: #f5f5f5;
`;

const RightColumn = styled(Column)`
  background-color: #dcdcdc;
`;

type TwoColumnLayoutProps = {
  children: [ReactNode, ReactNode];
};

const TwoColumnLayout = ({ children }: TwoColumnLayoutProps) => {
  return (
    <Container>
      <LeftColumn>{children[0]}</LeftColumn>
      <RightColumn>{children[1]}</RightColumn>
    </Container>
  );
};

export default TwoColumnLayout;
