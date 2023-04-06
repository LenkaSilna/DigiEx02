import React, { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Column = styled.div`
  flex: 1;
  flex-basis: 50%;
  padding: 20px;
  overflow: auto;
`;

const LeftColumn = styled(Column)`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
`;

const RightColumn = styled(Column)`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
`;

type TwoColumnLayoutProps = {
  children: [ReactNode, ReactNode];
  theme: {
    backgroundColor: string;
    textColor: string;
  };
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
