import { ButtonHTMLAttributes } from "react";
import { Button } from "./styled";

interface IButtonComponent extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: string;
  fontWeight?: string;
  bcColor?: string;
}

export const ButtonComponent = ({
  text,
  color,
  fontWeight,
  bcColor,
  ...props
}: IButtonComponent) => {
  return (
    <Button {...props} bgColor={bcColor} fontWeight={fontWeight} color={color}>
      {text}
    </Button>
  );
};
