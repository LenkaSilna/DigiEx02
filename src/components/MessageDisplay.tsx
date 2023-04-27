import React, { useState } from 'react';
import styled from 'styled-components';
import MessageIcon from './MessageIcon';
import ResponseDisplay from './ResponseDisplay';
import { ApiResponse } from './types';

interface Message {
  id: number;
  text: string;
}

interface MessageDisplayProps {
  setApiResponse: (response: any) => void;
  apiResponse: ApiResponse | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  handleSearch: (timeFrom: string, timeTo: string) => void;
}

const MessageList = styled.ul`
  list-style-type: none;
  padding: 0;
  border: 1px solid #4bcccc;
  border-radius: 4px;

  margin-bottom: 15px;
`;

const MessageItem = styled.li`
  margin: 8px;
  padding: 8px;
  border: 1px solid #4bcccc;
  border-radius: 4px;
`;


const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InputContainer = styled.div`
  font-family: monospace;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  font-family: monospace;
  margin: 10px;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => props.color || '#ccc'};
  color: ${(props) => props.color || '#fff'};
  opacity: ${(props) => props.disabled ? 0.5 : 1};
  pointer-events: ${(props) => props.disabled ? 'none' : 'auto'};
`;

const MessageDisplay: React.FC<MessageDisplayProps> = ({ setApiResponse, apiResponse, isLoading, setIsLoading, handleSearch }) => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const apiUrl = `http://localhost:8080/${import.meta.env.VITE_APP_URL}`;

  //todo: pokud začnu psát zprávu aktualizuji state v ResponseDisplay na null nebo loader
  const handleAddMessage = async () => {
    setIsLoading(true);
    const newMessage = { id: 0, text: message };
    const maxId = Math.max(...messageList.map((message) => message.id));
    newMessage.id = maxId + 1;
  
    setMessageList([newMessage, ...messageList]);
    setMessage('');
    console.log(newMessage.text);
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
      body: encodeURIComponent(newMessage.text),
    });    
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
  
    const responseData = await response.text();
    console.log('API Response:', JSON.parse(responseData));
    setApiResponse(JSON.parse(responseData));
    setIsLoading(false);
    handleSearch(JSON.parse(responseData).time_from_list, JSON.parse(responseData).time_to_list);
  };
  

  const handleRemoveLastMessage = () => {
    if (messageList.length > 0) {
      const updatedMessageList = messageList.slice(0, messageList.length - 1);
      setMessageList(updatedMessageList);
    }     
  };

  const handleRemoveAllMessages = () => {
    setMessageList([]);
  };

  return (
    <>
      <ResponseDisplay apiResponse={apiResponse} isLoading={isLoading} />
      <MessageList>
        {messageList.slice().reverse().map((message) => (
          <MessageItem key={message.id}><MessageIcon />{message.text}</MessageItem>
        ))}
      </MessageList>
      <InputContainer>
      <form onSubmit={(e) => {
            e.preventDefault();
            handleAddMessage();
            }}>
      <Input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        placeholder="Položte dotaz k videu..."
      />
          <ButtonContainer>
            <Button type="submit" disabled={!message}>
              Odeslat
            </Button>
            <Button onClick={handleRemoveLastMessage} disabled={messageList.length === 0}>
              Kvíz
            </Button>
            <Button onClick={handleRemoveAllMessages} disabled={messageList.length === 0}>
              Shrnutí
            </Button>
          </ButtonContainer>
        </form>
      </InputContainer>
    </>
  );
};

export default MessageDisplay;
