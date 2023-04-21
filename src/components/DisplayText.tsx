import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "./Loading";

interface Props {
  jsonOutput: string;
  theme: string;
  onApiResponseReady?: (data: any) => void;
  file: File | undefined;
}

const ContainerDiv = styled.div`
  border: 1px solid #4bcccc;
  border-radius: 4px;
  height: 85%;
  padding: 20px;
  overflow: auto;
  word-wrap: break-word;
`;

const DisplayText: React.FC<Props> = ({ jsonOutput, onApiResponseReady, file }) => {
  const [selectedTime, setSelectedTime] = useState<number | undefined>(undefined);
  let parsedOutput: any[] = [];

  if (jsonOutput.length > 0) {
    try {
      parsedOutput = JSON.parse(jsonOutput);
    } catch (err) {
      console.error('Error while parsing JSON:', err);
      return (
        <ContainerDiv>
          <Loading theme={{
            textColor: ""
          }} />
        </ContainerDiv>
      );
    }
  } else if (file) {
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const content: string = reader.result as string;
      parsedOutput.push({ text: content });
    };
    return (
      <ContainerDiv>
        <Loading theme={{
          textColor: ""
        }} />
      </ContainerDiv>
    );
  } else {
    parsedOutput.push({ text: "No content available" });
  }

  useEffect(() => {
    if (onApiResponseReady) {
      onApiResponseReady(null);
    }
  }, [onApiResponseReady]);

  return (
    <ContainerDiv>
      { parsedOutput.map((obj: Record<string, unknown>, index: number) => {
        const text = (obj as { text?: string }).text;
        const paragraphs = text ? text.split("\n") : [];
        let time = 0;
        return (
          <React.Fragment key={index}>
            {paragraphs.map((text: string, pIndex: number) => {
              const timePattern = /\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/;
              const timeMatch = text.match(timePattern);
              if (timeMatch) {
                time = Date.parse(timeMatch[0].substring(0, 12));
              }
              return <JsonOutput key={pIndex}>{text}</JsonOutput>;
            })}
          </React.Fragment>
        );
      })}
    </ContainerDiv>
  );
};

interface JsonOutputProps {
  isSelected: boolean;
}
const Container = styled.div`
  width: 100%;
`;

const JsonOutput = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  margin-bottom: 1em;
`;

export default DisplayText;
