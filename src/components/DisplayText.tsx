import React, { FC } from "react";
import Loading from "./Loading";


interface Props {
    fileContents: string;
    jsonOutput: string;
  }

const DisplayText: React.FC<Props> = ({ fileContents, jsonOutput }) => {
    console.log(fileContents);
    return (
        <div>
      {fileContents && (
        <div>
          <pre>{jsonOutput}</pre>
        </div>
      )}
    </div>
    )
};

export default DisplayText;
