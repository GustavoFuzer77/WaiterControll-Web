// import SideMenu from "../../components/SideMenu/index-sideMenu";
import { TextField, Button } from "@mui/material";
import { Container, Form } from "./styled";
import { useCallback, useState, ChangeEvent } from "react";
import { ModalComponent } from "../../../components/Modal/index-ModalComponent";
import { FieldValues, useForm } from "react-hook-form";
import { api } from "../../../utils/api";
import { toast } from "react-toastify";
import { IIngredients } from "../../../types/types-interfaces";
import { IngredientInfo } from "../../../components/IngredientInfo/index-ingredientInfo";
import { FormDataSet } from "../../../utils/uploader";
import Colors from "../../../styles/Colors";

const CreateIngredient = () => {
  const [openModalViewAllIngredients, setOpenModalViewAllIngredients] =
    useState(false);

  const { register, handleSubmit } = useForm();

  const [getDataIngredients, setDataIngredients] = useState<IIngredients[]>([]);
  // const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const getData = useCallback(async () => {
    await api.get("/api/v1/ingredients").then(({ data }) => {
      setDataIngredients(data);
    });
  }, [openModalViewAllIngredients]);

  const handleOpenAllIngredientsModal = () => {
    getData();
    setOpenModalViewAllIngredients(true);
  };

  const deleteIngredient = (id: string) => {
    setDataIngredients((prev) =>
      prev.filter((ingredient) => ingredient._id !== id)
    );
  };

  const updateIngredient = () => {
    getData();
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      console.log(data);
      if (data.name === "") {
        toast.error("Nome não pode ser vazio.");
        return;
      }
      if(data.icon.length === 0){
        toast.error("Imagem não pode ser vazio.");
        return;
      }
      const sender = new FormDataSet();
      sender.rawForm(data);
      sender.setNameFile("ingredients");

      sender.append("image", "icon");
      sender.append("string", "name");
      const formData = sender.getFormData();

      await api.post("/api/v1/ingredients", formData);
      toast.success("Ingrediente cadastrado com sucesso!");
    } catch (err: any) {
      const errorData = err.response.data;
      toast.error(errorData.message);
    }
  };
  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     setSelectedFile(file);

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setPreview(null);
  //     setSelectedFile(null);
  //   }
  // };


  return (
    <>
      <Container>
        <header>
          <div className="div-header">
            <h1>Adicionar Ingredientes</h1>
          </div>
        </header>
        <body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("name")}
              className="name"
              id="name"
              label="Nome do ingrediente"
              variant="outlined"
            />
            <Button className="icon" component="label" variant="contained">
              Selecione uma imagem para o Ingrediente
              <input
                {...register("icon")}
                style={{ display: "none" }}
                type="file"
              />
            </Button>
            <button type="submit" className="save">
              Salvar
            </button>
          </Form>
          {/* {preview && (
            <div className="image-previews">
              <p>Prévia da imagem selecionada: </p>
              <div>
                <img
                  src={preview!.toString()}
                  alt="Preview"
                  className="image-area"
                />
              </div>
            </div>
          )} */}
        </body>

        <footer>
          <Button
            className="icon"
            component="label"
            variant="contained"
            onClick={() => handleOpenAllIngredientsModal()}
          >
            Ver todas os Ingredientes salvos
          </Button>
        </footer>
      </Container>
      {openModalViewAllIngredients && (
        <ModalComponent
          title="Todos os Ingredientes"
          onClose={() => setOpenModalViewAllIngredients(false)}
          onChildrenBody={
            <div
              style={{
                width: "100%",
                marginTop: "16px",
                overflowY: "auto",
                minHeight: "400px",
                maxHeight: "400px",
                padding: "12px",
              }}
            >
              {getDataIngredients.map((ingredients) => (
                <IngredientInfo
                  ingredient={ingredients}
                  onUpdate={updateIngredient}
                  onDelete={deleteIngredient}
                />
              ))}
            </div>
          }
        />
      )}
    </>
  );
};

export default CreateIngredient;
