import styled from "styled-components";
// import Colors from "../../../styles/Colors";
// import Colors from "../../styles/Colors";

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
`;

export const Form = styled.form`
  display: grid;
  grid-template-areas:
    "nome nome nome nome"
    "description description description description"
    "description description description description"
    "category category ingredients ingredients"
    "imagem imagem imagem price";
  grid-gap: 10px;

  button {
    padding: 12px;
  }

  .name {
    grid-area: nome;
  }
  .description {
    grid-area: description;
  }
  .category {
    grid-area: category;
  }
  .ingredients {
    grid-area: ingredients;
  }
  .image {
    grid-area: imagem;
  }
  .price {
    grid-area: price;
  }
`;
