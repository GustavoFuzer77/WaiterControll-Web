import { styled } from "styled-components";

export const Container = styled.div`
  position: absolute;
  inset: 0;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Body = styled.div`
  width: 480px;
  min-height: 500px;
  background: #fff;
  border-radius: 12px;
  padding: 32px;

  .arrow-image {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .arrow{

    }
  }

  .imagem-preview-add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .arrow-image-changer {
      position: relative;
      width: 100px;
      height: 100px;
      background-color: #f0f0f0;
    }

    .arrow-image-changer::after {
      content: "";
      position: absolute;
      top: 50%;
      right: -20px; /* ajuste conforme necessário para a posição da seta */
      width: 0;
      height: 0;
      border-top: 10px solid transparent; /* tamanho da seta */
      border-bottom: 10px solid transparent; /* tamanho da seta */
      border-left: 10px solid #f0f0f0;
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;

    p {
      font-size: 22px;
    }

    button {
      padding: 0;
      /* width: 30px; */
      border: none;
      background: #fff;
      font-weight: 600;
    }
  }

  body {
    display: flex;
    background: #fff;

    width: 100%;
    height: 100%;

    /* flex: 1; */
    flex-direction: column;

    .div-inputs {
      flex: 1;
      div {
        width: 100%;
        margin-bottom: 12px;
      }
    }

    .image-area {
      margin-top: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 3px;
      img {
        width: 160px;
        height: 160px;
        object-fit: contain;
      }
    }
  }
`;
