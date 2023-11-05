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

  .modal-info {
    background-color: #fff;
    padding: 16px;

    display: flex;
    position: absolute;
    inset: 0;
  }


  .image-previews {
      margin-top: 32px;

      img {
        width: 360px;
        height: 300px;
        object-fit: contain;
      }
    }
`;

export const Form = styled.form`
  display: grid;
  grid-template-areas:
    "nome nome nome nome"
    "icon icon icon icon";
  grid-gap: 10px;

  button {
    padding: 12px;
  }

  .name {
    grid-area: nome;
  }
  .icon {
    grid-area: icon;
  }

  .save {
    background: ${Colors.backgroundGreen400};

    &:hover {
      background: ${Colors.backgroundGreen400};
      color: ${Colors.textGray};
    }
  }
`;
