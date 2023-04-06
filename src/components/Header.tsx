import React from "react";
import styled from "styled-components";
import FileToJsonConverter from "./FileToJsonConverter";

const HeaderContainer = styled.header<{ theme: any }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
`;

const Logo = styled.h1`
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const ThemeButton = styled.button`
  background-color: #fff;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-right: 10px;
`;

type HeaderProps = {
  logo: string;
  onThemeChange: () => void;
  handleFile: (file: File) => void;
  setJsonOutput: (json: string) => void;
  theme: any;
};

const Header = ({ logo, onThemeChange, setJsonOutput, theme }: HeaderProps) => {

  const handleThemeChange = () => {
    onThemeChange();
  };

  return (
    <HeaderContainer theme={theme}>
      <Logo>{logo}</Logo>
      <Nav>
        <ThemeButton onClick={handleThemeChange}>Change Theme</ThemeButton>
        <FileToJsonConverter setJsonOutput={setJsonOutput} handleFile={function (fileContents: string): void {
          throw new Error("Function not implemented.");
        } } />
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
