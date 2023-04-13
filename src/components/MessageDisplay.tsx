import React, { useState } from 'react';
import styled from 'styled-components';
import MessageIcon from './MessageIcon';
import ResponseDisplay from './ResponseDisplay';

interface Message {
  id: number;
  text: string;
}

interface MessageDisplayProps {
  setApiResponse: (response: any) => void;
  apiResponse: {};
}

const MessageList = styled.ul`
  list-style-type: none;
  padding: 0;
  border: 1px solid #4bcccc;
  border-radius: 4px;
  height: 50%;
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
  justify-content: flex-end;
  align-items: stretch;
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

const MessageDisplay: React.FC<MessageDisplayProps> = ({ setApiResponse, apiResponse }) => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const apiUrl = "https://cors-anywhere.herokuapp.com/ec2-18-198-81-231.eu-central-1.compute.amazonaws.com:5000";

  const handleAddMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage = { id: 0, text: message };
    const maxId = Math.max(...messageList.map((message) => message.id));
    newMessage.id = maxId + 1;
  
    setMessageList([newMessage, ...messageList]);
    setMessage('');
    console.log(newMessage.text);
    const response = await fetch(`${apiUrl}`, {
      method: 'POST',
      headers: {
        mode: 'no-cors',
        'Content-Type': 'text/plain; charset=utf-8',
      },
      body: encodeURIComponent(newMessage.text),
    });
    if (!response.ok) {
      console.log(response);
      console.error(response.statusText);
      return;
    }
  
    const responseData = await response.text();
    console.log('API Response:', responseData);
    setApiResponse(responseData);
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
      <ResponseDisplay />
      <MessageList>
        {messageList.slice().reverse().map((message) => (
          <MessageItem key={message.id}><MessageIcon />{message.text}</MessageItem>
        ))}
      </MessageList>
      <InputContainer>
        <form onSubmit={handleAddMessage}>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Napište zprávu..."
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
