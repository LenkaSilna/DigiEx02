import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

interface Subtitle {
  index: number;
  start: string;
  end: string;
  text: string;
}

interface Props {
  handleFile: (fileContents: string) => void;
  setJsonOutput: (json: string) => void;
}

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  background-color: #fff;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
`;

const FileToJsonConverterWrapper = styled.div`

  button {
    background-color: #fff;
    color: #333;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 10px;
  }
`;

const StyledInput = styled.input`
border-radius: 4px; 
padding: 12px;
width: fit-content;
`;

const FileToJsonConverter: React.FC<Props> = ({ setJsonOutput }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const srtToJson = (srtContent: string): Subtitle[] => {
    const regex = /(\d+)\s*\n(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})\s*\n([\s\S]*?(?=\n{2,}|$))/g;
    const jsonOutput: Subtitle[] = [];
    let match;

    while ((match = regex.exec(srtContent)) !== null) {
      jsonOutput.push({
        index: parseInt(match[1], 10),
        start: match[2],
        end: match[3],
        text: match[4].trim(),
      });
    }

    return jsonOutput;
  };

  const detectDelimiter = (lines: string[]): string => {
    const delimiters = [',', '\t', ';', '|'];
    const delimiterCounts: { [key: string]: number } = {};

    delimiters.forEach((delimiter) => {
      const count = lines[0].split(delimiter).length - 1;
      if (count > 0) {
        delimiterCounts[delimiter] = count;
      }
    });

    return Object.entries(delimiterCounts).sort((a, b) => b[1] - a[1])[0][0];
  };

  const txtToJson = (txtContent: string): Record<string, string>[] => {
    const lines = txtContent.split('\n');
    const delimiter = detectDelimiter(lines);
    const jsonOutput: Record<string, string>[] = [];

    const headers = lines[0].split(delimiter).map((header) => header.trim());

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(delimiter).map((value) => value.trim());
      const record: Record<string, string> = {};

      headers.forEach((header, index) => {
        record[header] = values[index];
      });

      jsonOutput.push(record);
    }

    return jsonOutput;
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        let jsonResult;

        if (file.name.endsWith('.srt')) {
          jsonResult = srtToJson(fileContent);
        } else if (file.name.endsWith('.txt')) {
          jsonResult = txtToJson(fileContent);
        } else {
          console.error('Unsupported file format');
          return;
        }

        setJsonOutput(JSON.stringify(jsonResult, null, 2));
      };

      reader.readAsText(file);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setJsonOutput('');
    location.reload();
  };

  return (
    <FileToJsonConverterWrapper>
    <StyledInput
      type="file"
      accept=".srt,.txt"
      onChange={handleFile}
    />

      <button type="button" onClick={clearFile}>
        X
      </button>

  </FileToJsonConverterWrapper>
  );
};

export default FileToJsonConverter
