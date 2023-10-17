import styled from "styled-components";
import Colors from "../../styles/Colors";

export const Container = styled.div`

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    height: 32px;
    background-color: ${Colors.backgroundLightGray300};
    border-radius: 6px;
    border: 1px solid ${Colors.backgroundLightGray400};
    margin: 0 0 16px 0;
    padding: 22px;
    transition: background-color 0.3s;
    position: relative;
    color: ${Colors.textGray};
    opacity: 0.8;
    cursor: pointer;

    &:hover {
      background-color: ${Colors.backgroundLightGray400};
    }

    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: ${Colors.backgroundLightGray700};
      transform: scaleX(0);
      transition: transform 0.3s;
      transform-origin: bottom;
    }

    &:hover::after {
      transform: scaleX(1);
    }

    .div-icon {
      padding: 0 0 0 16px;
    }
  }
`;
