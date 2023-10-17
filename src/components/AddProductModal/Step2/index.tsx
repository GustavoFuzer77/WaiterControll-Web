import { ModalBodyItems, ModalContent, ModalFooter } from "../styled";

interface IStep2 {
  goBack: () => void;
  step: boolean;
}

const Step2 = ({ goBack, step }: IStep2) => {
  return (
    <ModalContent step={step}>
      <header></header>
      <ModalBodyItems></ModalBodyItems>
      <ModalFooter></ModalFooter>
    </ModalContent>
  );
};

export default Step2;
