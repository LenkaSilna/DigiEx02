import link from '../assets/link.svg';
import styled from 'styled-components';

const LinkIconImg = styled.img`
    width: 15px;
    height: 15px;
    color: #4bcccc;
`;

const LinkIcon = () => (
    <LinkIconImg src={link} alt="Link Icon" />
);

export default LinkIcon;
