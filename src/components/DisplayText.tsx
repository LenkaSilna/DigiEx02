import React from "react";
import styled from "styled-components";
import Loading from "./Loading";

interface Props {
  jsonOutput: string;
  theme: string;
}

const DisplayText: React.FC<Props> = ({ jsonOutput }) => {
    let parsedOutput = jsonOutput.length > 0 ? JSON.parse(jsonOutput) : [];
  try {
    parsedOutput = JSON.parse(jsonOutput);
  } catch (err) {
    console.error('Error while parsing JSON:', err);
    return (
        <Container>
            <Loading theme={{
                textColor: ""
            }} />
        </Container>
      );
  }

  return (
    <Container>
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
    </Container>
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

