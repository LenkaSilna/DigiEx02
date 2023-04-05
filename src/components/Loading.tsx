import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const LoadingText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  animation: ${pulsate} 1s ease-in-out infinite;
`;

const Loading = () => {
  return (
      <LoadingText>Nahrajte soubor...</LoadingText>
  );
};

export default Loading;
