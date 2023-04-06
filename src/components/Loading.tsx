import React from 'react';
import styled, { keyframes } from 'styled-components';

type LoadingProps = {
  theme: {
    textColor: string;
  };
};

const pulsate = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
`;

const LoadingText = styled.span<LoadingProps>`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.textColor};
  animation: ${pulsate} 1s ease-in-out infinite;
`;

const Loading = ({ theme }: LoadingProps) => {
  return (
      <LoadingText theme={theme}>Nahrajte soubor...</LoadingText>
  );
};

export default Loading;
