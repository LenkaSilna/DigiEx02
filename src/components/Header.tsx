import React from "react";
import styled from "styled-components";
import FileToJsonConverter from "./FileToJsonConverter";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  background-color: #333;
  color: #fff;
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
};

const Header = ({ logo, onThemeChange, setJsonOutput }: HeaderProps) => {

  const handleThemeChange = () => {
    onThemeChange();
  };

  return (
    <HeaderContainer>
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
