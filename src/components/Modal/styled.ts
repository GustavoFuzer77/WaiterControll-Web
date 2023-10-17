import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export const Modal = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 32px;
  width: 480px;
  height: 500px;
  z-index: 10;
  header {
    .required-modal-items {
      display: flex;
      justify-content: space-between;

      h1 {
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
  }

  body {
    display: flex;
    min-height: 100%;
    overflow-y: auto;
    background: #fff;
    /* flex: 1; */
  }

  footer {
  }
`;
