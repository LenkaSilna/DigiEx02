import { useEffect, useState } from 'react';
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
      backgroundColor: '#333',
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
          <DisplayText theme={Button?.defaultProps?.theme?.textColor} jsonOutput={jsonOutput} file={undefined} />, <MessageDisplay setApiResponse={setApiResponse} apiResponse={apiResponse} isLoading={isLoading} setIsLoading={setIsLoading} />]} />
      </AppWrapper>
    </ThemeProvider>
  )
}

export default App
