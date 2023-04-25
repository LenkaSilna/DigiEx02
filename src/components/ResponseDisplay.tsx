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

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ apiResponse, isLoading }) => {

  const [jsonData, setJsonData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const jsonObject = apiResponse as ApiResponse;
    setJsonData(jsonObject);
  }, [apiResponse]);

  return (
    <ContainerDiv>
      <div>
      {isLoading && <p>Načítám odpověď...</p>}
        {!isLoading && jsonData && (
          <>
            <h4>Odpověď:</h4>
            <p>{jsonData.answer}</p>
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
