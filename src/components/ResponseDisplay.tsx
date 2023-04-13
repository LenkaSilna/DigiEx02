import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface ApiResponse {
  answer: string;
  time_from_list: string[];
  time_to_list: string[];
  context_list: string[];
  score_list: number[];
}

interface ApiData {
  data: ApiResponse;
}

const ContainerDiv = styled.div`
  border: 1px solid #4bcccc;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 20px;
  overflow: auto;
  word-wrap: break-word;
`;

const data = `
{
  "answer": "Pokyn D-22 byl nahrazen pokynem D-59.",
  "time_from_list": [
    "00:06:23,940",
    "00:07:03,580"
  ],
  "time_to_list": [
    "00:07:03,580",
    "00:07:51,440"
  ],
  "context_list": [
    "On je to pokyn, který se vlastně zpracovával v první polovině loňského roku. 30. 6. s. Takže jenom, kdybyste hledali pokyn D-22, tak ten platí pro ten loňský rok.",
    "Ten pokyn D-59 je účinný od letošního roku, to znamená pro rok 2023. Ale řekněme si na rovinu, i ten pokyn D-"
  ],
  "score_list": [
    0.6964789911669592,
    0.6205222639655282
  ]
}`;


interface ResponseDisplayProps {
  //apiResponse: ApiData;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({  }) => {
  const [jsonData, setJsonData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const jsonObject = JSON.parse(data) as ApiResponse;
    setJsonData(jsonObject);
  }, []);

  return (
    <ContainerDiv>
      <div>
        {jsonData && (
          <>
            <h4>Odpověď:</h4>
            <p>{jsonData.answer}</p>
            <h4>Kontext:</h4>
            <ul>
              {jsonData.context_list.map((context, index) => (
                <li key={index}>{context}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </ContainerDiv>
  );
};

export default ResponseDisplay;
