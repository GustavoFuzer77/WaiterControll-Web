import { Button, TextField } from "@mui/material";
import { IIngredients } from "../../../../types/types-interfaces";
import { Body, Container } from "./styled";
import { useState } from "react";
import { createPortal } from "react-dom";
import { FieldValues, useForm } from "react-hook-form";
import { FormDataSet } from "../../../../utils/uploader";
import { api } from "../../../../utils/api";
import { toast } from "react-toastify";

interface IEditIngredient {
  dataIngredients: IIngredients;
  onClose: () => void;
}

export const EditIngredient = ({
  dataIngredients,
  onClose,
}: IEditIngredient) => {
  const [initialState, setInitialState] = useState({
    _id: dataIngredients._id,
    name: dataIngredients.name,
    icon: dataIngredients.icon,
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = async (fields: FieldValues) => {
    const sender = new FormDataSet();
    sender.rawForm(fields);
    sender.setNameFile("ingredients");
    sender.append("image", "icon");
    sender.append("string", "name");

    const formData = sender.getFormData();

    try {
      await api.patch(`/api/v1/ingredients/${initialState._id}`, formData);
      toast.success("Ingrediente editado com sucesso!");
    } catch (err) {
      toast.error("deu erro HAHHAHA");
    }
    // console.log(dataValues, 'dataValues')
  };

  return createPortal(
    <Container>
      <Body>
        <header>
          <p>Editando o ingrediente</p>
          <button onClick={onClose}>X</button>
        </header>
        <body>
          <form className="div-inputs" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("name")}
              className="name"
              id="name"
              value={initialState.name}
              label="Digite o novo nome para o ingrediente"
              variant="outlined"
            />
            <Button
              className="icon"
              component="label"
              variant="contained"
              // startIcon={"🚕"}
            >
              Selecione uma imagem para o Ingrediente
              <input
                {...register("icon")}
                style={{ display: "none" }}
                type="file"
              />
            </Button>
            <div className="image-area">
              <p>Imagem atual:</p>
              <img
                src={`http://localhost:3001/uploads/${initialState.icon}`}
                alt=""
              />
            </div>
            <button>Salvar</button>
          </form>
        </body>
      </Body>
    </Container>,
    document.getElementById("modal") as HTMLElement
  );
};
