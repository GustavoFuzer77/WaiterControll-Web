import { ButtonHTMLAttributes } from "react";
import { Button } from "./styled";

interface IButtonComponent extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: string;
  fontWeight?: string;
  bgcolor?: string;
}

export const ButtonComponent = ({
  text,
  color,
  fontWeight,
  bgcolor,
  ...props
}: IButtonComponent) => {
  return (
    <Button {...props} bgcolor={bgcolor} fontWeight={fontWeight} color={color}>
      {text}
    </Button>
  );
};
