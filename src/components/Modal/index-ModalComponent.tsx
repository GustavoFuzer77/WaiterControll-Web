import { createPortal } from "react-dom";
import { Container, Modal } from "./styled";
import { Button } from "../Button/styled";

interface IModalProps {
  onClose: () => void;
  title: string;
  onChildrenBody?: React.ReactNode;
  onChildrenFooter?: React.ReactNode;
}

export const ModalComponent = ({
  onClose,
  title,
  onChildrenBody,
  onChildrenFooter,
}: IModalProps) => {
  return createPortal(
    <Container>
      <Modal>
        <header>
          <div className="required-modal-items">
            <h1>{title}</h1>
            <button onClick={onClose}>X</button>
          </div>
        </header>
        <body>{onChildrenBody}</body>
        <footer>{onChildrenFooter}</footer>
      </Modal>
    </Container>,
    document.getElementById("modal") as HTMLElement
  );
};
