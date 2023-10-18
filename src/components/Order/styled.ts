import styled from "styled-components";
import Colors from "../../styles/Colors";

export const Container = styled.div`
  gap: 32px;
  width: 100%;
  max-width: 1200px;
  margin: 50px auto;
  display: flex;
`;

export const Board = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${Colors.backgroundLightGray600};
  flex: 1;

  header {
    padding: 8px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;

  button {
    background-color: #fff;
    border: 1px solid ${Colors.backgroundLightGray600};
    height: 128px;
    border-radius: 8px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;

    & + button {
      margin-top: 24px;
    }

    span {
      opacity: 0.4;
    }

    strong {
      font-weight: 500;
    }
  }
`;

export const ContainerModal = styled.div`
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
  width: 100%;
  position: fixed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  width: 490px;
  min-height: 600px;
  padding: 32px;
  border-radius: 16px;
  background: #fff;

  span {
    font-size: 16px;
    opacity: 0.6;
  }

  header {
    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;

      button {
        border: none;
        background-color: #fff;
      }
    }

    .header-body {
      margin-bottom: 32px;

      p {
        font-weight: bold;
      }
    }
  }

  body {
  }

  footer {
    button + button {
      margin-top: 16px;
    }
  }
`;

export const ModalBodyItems = styled.body`
  margin: 0 0 16px 0;

  .item-container {
    margin: 0 12px 0 12px;
    max-height: 210px;
    min-height: 208px;
    overflow-y: auto;

    .item {
      display: flex;
      margin: 16px 0;
      gap: 8px;
      padding: 0 0 32px 0;

      .description {
        /* display: flex;
        flex-direction: column;
        justify-content: space-around; */
      }

      h1 {
        font-size: 18px;
      }

      img {
        width: 70px;
        height: 45px;
        object-fit: cover;
        box-shadow: rgb(35 36 36 / 20%) 4px 3px 5px;
        border-radius: 10px;
      }
    }
  }
`;

export const ModalFooter = styled.footer`
  .total-value {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 32px 0;
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
