import React, { useEffect, useState } from 'react';
import './App.css';
import FileToJsonConverter from './components/FileToJsonConverter';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import TwoColumnLayout from './components/TwoColumnLayout';
import DisplayText from './components/DisplayText';
import Loading from './components/Loading';
import MessageDisplay from './components/MessageDisplay';
import { ApiResponse } from './components/types';

const Button = styled.button`
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.backgroundColor};
  border: none;
  padding: 10px;
  border-radius: 5px;
  
  &:hover {
    background-color: ${props => props.theme.hoverColor};
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
      backgroundColor: 'rgb(56,57,57)',
      hoverColor: '#444',
    },
  },
};

const AppWrapper = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  transition: all 0.2s linear;
`;

function App() {
  const [theme, setTheme] = useState(Button?.defaultProps?.theme);
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [searchQueryTime, setSearchQueryTime] = useState<string[]>([]); // [timeFrom, timeTo]
  const [searchedLinks, setSearchedLinks] = useState<{ [key: string]: React.RefObject<HTMLParagraphElement> }>({});
  
  // Funkce pro vyhledávání kontextů
  const handleSearch = (timeFrom: string, timeTo: string) => {
    const refs: { [key: string]: React.RefObject<HTMLParagraphElement> } = {};
    const parsedOutput = JSON.parse(jsonOutput);
    parsedOutput.forEach((context: any, index: number) => {
      if (context.start === timeFrom[0]) {
        console.log("found");
        const ref = React.createRef<HTMLParagraphElement>();
        refs[`context${context.index}`] = ref;
      }
      if (context.start === timeTo[0]) {
        const ref = React.createRef<HTMLParagraphElement>();
        refs[`context${context.index}`] = ref;
      }
    });
    //console.log(refs);
    setSearchedLinks(refs);
  };
  
  // useEffect pro předání searchedLinks do DisplayText komponenty
  useEffect(() => {
    if (jsonOutput.length > 0) {
      setSearchedLinks({});
    }
  }, [jsonOutput]);


  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      setTheme(Button?.defaultProps?.theme.dark);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === Button?.defaultProps?.theme ? Button?.defaultProps?.theme.dark : Button?.defaultProps?.theme);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <Header logo="Logo" onThemeChange={toggleTheme} setJsonOutput={setJsonOutput} handleFile={function (file: File): void {
          throw new Error('Function not implemented.');
        } } theme={theme} /> 
        <TwoColumnLayout theme={theme} children={[
          <DisplayText theme={Button?.defaultProps?.theme?.textColor} jsonOutput={jsonOutput} file={undefined} searchedLinks={searchedLinks} />, <MessageDisplay setApiResponse={setApiResponse} apiResponse={apiResponse} isLoading={isLoading} setIsLoading={setIsLoading} handleSearch={handleSearch} searchedLinks={searchedLinks} />]} />
      </AppWrapper>
    </ThemeProvider>
  )
}

export default App
