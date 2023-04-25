import React, { useState } from "react";
import styled from "styled-components";

interface AccordionProps {
  title: string;
  content: string;
  key: number;
  children?: React.ReactNode;
}

const AccordionContainer = styled.div`
  border: 1px solid #4bcccc;
  border-radius: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  font-family: monospace;
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  &.active {
    font-weight: bold;
  }
`;

const AccordionTitle = styled.h4`
  margin: 0;
`;

const AccordionContent = styled.p`
  margin: 0;
  padding: 8px;
`;

const ContextItem: React.FC<AccordionProps> = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  const handleHeaderClick = () => {
    setIsActive(!isActive);
  }

  return (
    <AccordionContainer>
      <AccordionHeader
        className={isActive ? 'active' : ''}
        onClick={handleHeaderClick}
      >
        <AccordionTitle>{title}</AccordionTitle>
        {isActive ? '-' : '+'}
      </AccordionHeader>
      {isActive && <AccordionContent>{content}</AccordionContent>}
    </AccordionContainer>
  );
};

export default ContextItem;
