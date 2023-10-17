import styled from "styled-components";

interface IModalContent {
  step: boolean;
}

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

  span {
  }

  h1 {
  }

  p {
  }
`;
export const ModalBodyItems = styled.div`
  width: 560px;
  min-height: 600px;
  padding: 32px;
  border-radius: 16px;
  background: #fff;
`;
export const ModalContent = styled.div<IModalContent>`
  ${({ step }) =>
    step === true && {
      display: "none",
    }}
`;
export const ModalFooter = styled.div``;
