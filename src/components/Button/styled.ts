import styled from "styled-components";
import Colors from "../../styles/Colors";

interface IButton {
  color?: string;
  bgcolor?: string;
  fontWeight?: string;
}

export const Button = styled.button<IButton>`
  border: none;
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "400")};
  color: ${({ color }) => (color ? color : `${Colors.textGray}`)};
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : "#fafafa")};
  width: 100%;
  border-radius: 16px;
  max-height: 60px;
  height: 45px;
  min-height: 16px;
`;
