import React, { useState } from 'react';
import styled from 'styled-components';
import MessageIcon from './MessageIcon';

interface Message {
  id: number;
  text: string;
}


const MessageList = styled.ul`
  list-style-type: none;
  padding: 0;
  border: 1px solid #4bcccc;
  border-radius: 4px;
  height: 70%;
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

const MessageDisplay: React.FC = () => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  const handleAddMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage = { id: 0, text: message };
    const maxId = Math.max(...messageList.map((message) => message.id));
    newMessage.id = maxId + 1;

    setMessageList([newMessage, ...messageList]);
    setMessage('');
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
              Smazat poslední zprávu
            </Button>
            <Button onClick={handleRemoveAllMessages} disabled={messageList.length === 0}>
              Smazat všechny zprávy
            </Button>
          </ButtonContainer>
        </form>
      </InputContainer>
    </>
  );
};

export default MessageDisplay;
