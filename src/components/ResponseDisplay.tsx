import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ApiResponse } from './types';
import ContextItem from "./ContextItem";

interface ResponseDisplayProps {
  apiResponse: ApiResponse | null;
  isLoading: boolean;
}

const ContainerDiv = styled.div`
  border: 1px solid #4bcccc;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 20px;
  overflow: auto;
  word-wrap: break-word;
  font-family: monospace;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 8px;
`;

const AnswerHeadline = styled.h4`
  text-shadow: color(display-p3 0 1 0.92) 0px 0px 15px;  
`;

const Answer = styled.p`
  text-shadow: color(display-p3 0 1 0.92) 0px 0px 15px;  
`;

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ apiResponse, isLoading }) => {

  const [jsonData, setJsonData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const jsonObject = apiResponse as ApiResponse;
    setJsonData(jsonObject);
  }, [apiResponse]);

  return (
    <ContainerDiv>
      <div>
      {isLoading && <AnswerHeadline>Načítám odpověď...</AnswerHeadline>}
        {!isLoading && jsonData && (
          <>
            <AnswerHeadline>Odpověď:</AnswerHeadline>
            <Answer>{jsonData.answer}</Answer>
            <List>
              {jsonData.context_list.map((context, index) => (
                <ContextItem key={index} title={`Kontext ${index + 1}`} content={context}/>
              ))}
            </List>
          </>
        )}
      </div>
    </ContainerDiv>
  );
};

export default ResponseDisplay;
