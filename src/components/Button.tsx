import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

// Komponenty
const Button = styled.button`
  color: ${(props: { theme: { textColor: any; }; }) => props.theme.textColor};
  background-color: ${(props: { theme: { backgroundColor: any; }; }) => props.theme.backgroundColor};
  border: none;
  padding: 10px;
  border-radius: 5px;
  
  &:hover {
    background-color: ${(props: { theme: { hoverColor: any; }; }) => props.theme.hoverColor};
  }
`;

Button.defaultProps = {
  theme: {
    // světlý režim
    textColor: '#333',
    backgroundColor: '#fff',
    hoverColor: '#eee',
    
    // tmavý režim
    dark: {
      textColor: '#fff',
      backgroundColor: '#333',
      hoverColor: '#444',
    },
  },
};



