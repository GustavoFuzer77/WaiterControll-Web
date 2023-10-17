import { useState } from "react";
import { createPortal } from "react-dom";
import { ContainerModal } from "./styled";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { useForm } from "react-hook-form";

export const AddProductModal = () => {
  const [step, setStep] = useState(1);

  const avancarParaProximaEtapa = () => {
    setStep(step + 1);
  };

  const voltarParaEtapaAnterior = () => {
    setStep(step - 1);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // Enviar os dados para a API ou realizar outras ações necessárias aqui
    console.log(data);
  };
alert(step)
  return createPortal(
    <ContainerModal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Step1 step={step === 1} goForward={avancarParaProximaEtapa} />
        <Step2 step={step === 2} goBack={voltarParaEtapaAnterior} />
      </form>
    </ContainerModal>,
    document.getElementById("modal") as HTMLElement
  );
};
