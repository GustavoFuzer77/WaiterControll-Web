import { styled, keyframes } from "styled-components";
import Colors from "../../../styles/Colors";

const animate = keyframes`
    0% {
        opacity: 0;
        transform: rotate(45deg) translate(-20px, -20px);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: rotate(45deg) translate(20px, 20px);
    }
`;

export const Container = styled.div`
  position: absolute;
  /* top: 50%; */
  /* left: 50%; */
  top: -120px;
  transform: translate(-50%, -50%);
  transform: rotate(270deg);
  cursor: pointer;

  span {
    display: block;
    width: 16px;
    height: 16px;
    border-bottom: 5px solid ${Colors.backgroundLightGray400};
    border-right: 5px solid ${Colors.backgroundLightGray500};
    transform: rotate(45deg);
    margin: -10px;
    animation: ${animate} 2s infinite;

    &:nth-child(2) {
      animation-delay: -0.2s;
    }

    &:nth-child(3) {
      animation-delay: -0.4s;
    }
  }
`;
