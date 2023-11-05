import { TIcons } from "../../../types/types-interfaces";

export const SemiArrow = ({
  background = "#fff",
  fill = "#2c2c2c",
  heigth,
  width,
}: TIcons) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "80px"}
      height={heigth ? heigth : "80px"}
      viewBox="0 0  24 30"
      fill={background}
    >
      <path
        d="M18 14L12 20L6 14"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
