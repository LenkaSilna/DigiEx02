import envelope from '../assets/envelope.svg';
import styled from 'styled-components';

const MessageIconImg = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;

const MessageIcon = () => (
  <MessageIconImg src={envelope} alt="Message Icon" />
);

export default MessageIcon;
