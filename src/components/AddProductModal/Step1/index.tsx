import { ModalBodyItems, ModalContent, ModalFooter } from "../styled";

interface IStep1 {
  goForward: () => void;
  step: boolean;
}

const Step1 = ({ goForward, step }: IStep1) => {
  return (
    <ModalContent step={step}>
      <header>
        <h1>etapa 1</h1>
      </header>
      <ModalBodyItems></ModalBodyItems>
      <ModalFooter></ModalFooter>
    </ModalContent>
  );
};

export default Step1;
