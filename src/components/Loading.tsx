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
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.6);
  }
`;

const LoadingText = styled.span<LoadingProps>`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.textColor};
  animation: ${pulsate} 2s ease-in-out infinite;
  &:nth-child(2) {
    animation-delay: 0.4s;
  }
  &:nth-child(3) {
    animation-delay: 0.8s;
  }
  &:nth-child(4) {
    animation-delay: 1.2s;
  }
  &:nth-child(5) {
    animation-delay: 1.6s;
  }
`;

const Loading = ({ theme }: LoadingProps) => {
  return (
    <div>
      <LoadingText theme={theme}>.</LoadingText>
      <LoadingText theme={theme}>.</LoadingText>
      <LoadingText theme={theme}>.</LoadingText>
      <LoadingText theme={theme}>.</LoadingText>
      <LoadingText theme={theme}>.</LoadingText>
    </div>
  );
};


export default Loading;
