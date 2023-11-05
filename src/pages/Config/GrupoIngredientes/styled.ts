import styled from "styled-components";
import Colors from "../../../styles/Colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  header {
    width: 100%;
  }

  body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 32px;
  }

  footer {
    padding: 32px;
  }

  .div-header {
    display: flex;
    height: 137.7px;
    padding: 32px;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 10%;
      width: 80%;
      height: 1px;
      background-color: black; /* Cor da borda */
    }
  }

  .ingredients-div {
    display: flex;
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-areas:
    "nome nome nome nome"
    "iconButton iconButton iconButton iconButton";
  grid-gap: 10px;

  button {
    padding: 12px;
  }

  .name {
    grid-area: nome;
  }
  .iconButton {
    grid-area: iconButton;
  }

  .save {
    background: ${Colors.backgroundGreen400};

    &:hover {
      background: ${Colors.backgroundGreen400};
      color: ${Colors.textGray};
    }
  }
`;

export const IngredientsSelected = styled.div`
  max-width: 100%;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;
