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

const BodyContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  border: 1px solid;
  border-radius: 15px;
  padding: 10px;
  border-color: #00B8E2;

  .content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  @media only screen and (max-width: 1430px) {
    .content {
      flex-direction: column;
    }
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  height: 50px;

  th, td {
    border: 1px solid #B5B5B5;
    padding: 8px;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: 80px;
    max-width: 200px;
    overflow: hidden;
  }

  th:nth-child(1) {
    min-width: 60px;
    max-width: 60px;
  }

  td:nth-child(1) { 
    text-align: center;
    cursor: pointer;
    min-width: 30px;
    max-width: 30px;
  }

  td:nth-child(3) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: 120px;
    max-width: 120px;
  }

  td:nth-child(4) { 
    text-align: center;
  }

  td:nth-child(5) { 
    text-align: center;

    svg {
      cursor: pointer; 
    }
  }

  td:nth-child(6) { 
    text-align: center;

    svg {
      cursor: pointer; 
    }
  }

  @media only screen and (max-width: 600px) {
    margin-top: 0;
    font-size: 12px;

    th, td {
      min-width: 60px;
      max-width: 60px;
    }

    th {
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    td:nth-child(3) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: 60px;
    max-width: 60px;
  }
  }
`;

const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  position: relative;

  @media only screen and (max-width: 600px) {
    width: 100%;
    margin-top: -35px;
  }
`;

const GeralContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;

  @media only screen and (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  margin-left: 10px;

  @media only screen and (max-width: 600px) {
    margin-bottom: 35px;
    margin-top: -40px;
    margin-left: 0px;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  &:before {
    content: '';
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: ${props => props.color};
    color:  ${props => props.color};
    margin-right: 5px;
  }
`;

const ChartAndLegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  align-items: center;

  @media only screen and (max-width: 600px) {
    flex-direction: column-reverse;
    margin-left: 0px;
    align-items: start;
  }
`

const LegendText = styled.span`
  color: ${props => props.color};
  font-weight: bold;
  overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: 150px;
    max-width: 150px;
    text-align: start;
  
`;

export { BodyContainer, Table, ChartContainer, GeralContainer, LegendContainer, LegendItem, ChartAndLegendContainer, LegendText, SpinnerIcon, FloatingMessage };
