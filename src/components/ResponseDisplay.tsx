import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ApiResponse } from './types';

interface ResponseDisplayProps {
  apiResponse: ApiResponse | null;
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

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ apiResponse }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [jsonData, setJsonData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const jsonObject = apiResponse as ApiResponse;
    setIsLoading(true);
    setJsonData(jsonObject);
  }, []);

  return (
    <ContainerDiv>
      <div>
        {!isLoading && <p>Probíhá komunikace se serverem...</p>}
        {jsonData && (
          <>
            <h4>Odpověď:</h4>
            <p>{jsonData.answer}</p>
            <h4>Kontext:</h4>
            <List>
              {jsonData.context_list.map((context, index) => (
                <ListItem key={index}>{context}</ListItem>
              ))}
            </List>
          </>
        )}
      </div>
    </ContainerDiv>
  );
};

export default ResponseDisplay;
