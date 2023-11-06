import { Button, TextField } from "@mui/material";
import { IIngredients } from "../../../../types/types-interfaces";
import { Body, Container } from "./styled";
import { ChangeEvent, useState } from "react";
import { createPortal } from "react-dom";
import { FieldValues, useForm } from "react-hook-form";
import { FormDataSet } from "../../../../utils/uploader";
import { api } from "../../../../utils/api";
import { toast } from "react-toastify";
import { AnimatedArrow } from "../../../../components/Icons/ArrowAnimated/index-arrow";

interface IEditIngredient {
  dataIngredients: IIngredients;
  onUpdate: (id: string) => void;
  onClose: () => void;
}

export const EditIngredient = ({
  dataIngredients,
  onUpdate,
  onClose,
}: IEditIngredient) => {
  const [initialState, setInitialState] = useState({
    _id: dataIngredients._id,
    name: dataIngredients.name,
    icon: dataIngredients.icon,
  });
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { register, handleSubmit } = useForm();

  // const nameValue = watch("name");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setSelectedFile(null);
    }
  };

  const onSubmit = async (fields: FieldValues) => {
    console.log(fields);
    try {
      const sender = new FormDataSet();
      sender.rawForm(fields);
      sender.setNameFile("ingredients");
      if (selectedFile) {
        sender.append("image", "icon");
      }

      if (fields.name === "") {
        toast.error("Nome não pode ser vazio.");
        return;
      }

      sender.append("string", "name");

      const formData = sender.getFormData();
      await api.patch(`/api/v1/ingredients/${initialState._id}`, formData);
      onClose();
      onUpdate(initialState._id);
      toast.success("Ingrediente editado com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Ocorreu um erro ao editar o ingrediente.");
    }
  };

  // useEffect(() => {
  //   setValue("name", initialState.name);
  // }, [initialState.name, setValue]);

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
              onChange={(e) => {
                setInitialState((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
              id="name"
              value={initialState.name}
              label="Digite o novo nome para o ingrediente"
              variant="outlined"
            />
            <Button className="icon" component="label" variant="contained">
              Selecione uma imagem para o Ingrediente
              <input
                {...register("icon", {
                  onChange: (e) => {
                    handleFileChange(e);
                  },
                })}
                style={{ display: "none" }}
                type="file"
              />
            </Button>
            <div className="image-area">
              <p>Imagem atual:</p>
              <div
                className="imagem-preview-add"
                style={{
                  justifyContent: `${preview ? "space-between" : "center"}`,
                }}
              >
                <img
                  src={`http://localhost:3001/uploads/${initialState.icon}`}
                  alt={initialState.name}
                />
                {preview && (
                  <div className="arrow-image">
                    <AnimatedArrow />
                    <img
                      src={preview.toString()}
                      alt="Preview"
                      className="image-area"
                    />
                  </div>
                )}
              </div>
            </div>
            <button type="submit">Salvar</button>
          </form>
        </body>
      </Body>
    </Container>,
    document.getElementById("modal") as HTMLElement
  );
};
