import React from "react";
import styled from "styled-components";
import Loading from "./Loading";

interface Props {
  jsonOutput: string;
  theme: string;
}

const ContainerDiv = styled.div`
border: 1px solid #4bcccc;
border-radius: 4px;
height: 85%;
padding: 20px;
overflow: auto;
word-wrap: break-word;
flex-basis: 50%;
`;

const DisplayText: React.FC<Props> = ({ jsonOutput }) => {
    let parsedOutput = jsonOutput.length > 0 ? JSON.parse(jsonOutput) : [];
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

  return (
    <ContainerDiv>
      {parsedOutput.map((obj: Record<string, unknown>, index: number) => {
        const text = (obj as { text?: string }).text;
        const paragraphs = text ? text.split("\n") : [];
        return (
          <React.Fragment key={index}>
            {paragraphs.map((text: string, pIndex: number) => (
              <JsonOutput key={pIndex}>{text}</JsonOutput>
            ))}
          </React.Fragment>
        );
      })}
    </ContainerDiv>
  );
};

export default DisplayText;

const Container = styled.div`
  width: 100%;
`;

const JsonOutput = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  margin-bottom: 1em;
`;

