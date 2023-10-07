import { Button } from "./styled";

interface IButtonComponent {
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
}: IButtonComponent) => {
  return (
    <Button bgColor={bcColor} fontWeight={fontWeight} color={color}>
      {text}
    </Button>
  );
};
