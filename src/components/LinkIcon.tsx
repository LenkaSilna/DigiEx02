import link from '../assets/link.svg';
import styled from 'styled-components';
import { RefObject } from 'react';

const LinkIconImg = styled.img`
  width: 15px;
  height: 15px;
  color: #4bcccc;
  margin-right: 10px;
`;

const LinkIconWrapper = styled.a`
  display: inline-block;
`;

const LinkText = styled.span`
  display: inline-block;
  margin-top: 10px;
  font-size: 12px;
  margin-right: 10px;
  font-family: monospace;
  color: rgb(75, 204, 204);
  `

const LinkIcon = ({ href = '' })  => {
    return (
      <LinkIconWrapper href={`#`} onClick={()=>{console.log(href)}}>
        <LinkIconImg src={link} alt="Link Icon" /><LinkText>link</LinkText>
      </LinkIconWrapper>
    );
};

export default LinkIcon;
