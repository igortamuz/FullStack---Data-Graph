import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
`;

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const FloatingMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: ${props => {
    switch (props.type) {
      case "success":
        return "#4CAF50";
      case "warning":
        return "#c5b62a";
      case "error":
        return "#F44336";
      default:
        return "#F44336";
    }
  }};
  color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: 0;
  animation: ${fadeInOut} 2s forwards;

  &.fade-out {
    animation: ${fadeOut} 2s forwards;
  }
`;

const HeaderContainer = styled.div`
  background-color: #00B8E2;
  padding: 20px;
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    width: 80%;
  }
`;

const Input = styled.input`
  margin: 0 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  outline: none;

  @media only screen and (max-width: 600px) {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
`;

const Button = styled.button`
  background-color: #00B8E2;
  color: white;
  padding: 10px;
  border: 2px solid;
  border-color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin: 10px;
  width: 100px;

  &:hover {
    background-color: #e0f7fa;
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 1px #666;
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
  }

`;

export { HeaderContainer, Input, Button, Form, FloatingMessage, SpinnerIcon };
