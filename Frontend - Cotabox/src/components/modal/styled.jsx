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


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  width: 100%;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.primary ? '#00B8E2' : '#ccc'};
  color: white;
  transition: background 0.3s;

  &:hover {
    background: ${props => props.primary ? '#11d100' : '#999999'};
  }
`;

const ButtonCloseModal = styled.div`
  background-color: #00B8E2;
  border-radius: 4px;
  color: white;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${props => props.primary ? '#00B8E2' : '#c74a4a'};
  }

`

const TitleModal = styled.div`
  font-weight: bold;
`


export { ModalOverlay, ModalContainer, ModalHeader, ModalBody, ModalFooter, Label, Button, Input, TitleModal, ButtonCloseModal, SpinnerIcon, FloatingMessage };
