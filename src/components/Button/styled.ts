import styled from "styled-components";

interface IButton {
  color?: string;
  bgColor?: string;
  fontWeight?: string;
}

export const Button = styled.button<IButton>`
  border: none;
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "400")};
  color: ${({ color }) => (color ? color : "#2c2c2c")};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#fafafa")};
  width: 100%;
  border-radius: 16px;
  max-height: 60px;
  height: 45px;
  min-height: 16px;
`;
