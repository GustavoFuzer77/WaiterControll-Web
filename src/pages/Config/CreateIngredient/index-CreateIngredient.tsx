// import SideMenu from "../../components/SideMenu/index-sideMenu";
import { TextField, Button } from "@mui/material";
import { Container, Form } from "./styled";
import { useCallback, useEffect, useState } from "react";
import { ModalComponent } from "../../../components/Modal/index-ModalComponent";
import { FieldValues, useForm } from "react-hook-form";
import { api } from "../../../utils/api";
import { toast } from "react-toastify";
import { IIngredients } from "../../../types/types-interfaces";
import { IngredientInfo } from "../../../components/IngredientInfo/index-ingredientInfo";
import { FormDataSet } from "../../../utils/uploader";

const CreateIngredient = () => {
  const [openModalViewAllIngredients, setOpenModalViewAllIngredients] =
    useState(false);

  const { register, handleSubmit } = useForm();

  const [getDataIngredients, setDataIngredients] = useState<IIngredients[]>([]);

  const getData = useCallback(async () => {
    await api.get("/api/v1/ingredients").then(({ data }) => {
      setDataIngredients(data);
    });
  }, [openModalViewAllIngredients]);

  useEffect(() => {
    getData();
  }, [openModalViewAllIngredients]);

  const onSubmit = async (data: FieldValues) => {
    const sender = new FormDataSet();
    sender.rawForm(data);
    sender.setNameFile("ingredients");
    sender.append("image", "icon");
    sender.append("string", "name");

    const formData = sender.getFormData();
    try {
      await api.post("/api/v1/ingredients", formData);
      toast.success("Ingrediente cadastrado com sucesso!");
    } catch (err) {
      toast.error("deu erro HAHHAHA");
    }
  };

  const deleteIngredient = (id: string) => {
    console.log(id, "oi filho");
    setDataIngredients((prev) =>
      prev.filter((ingredient) => ingredient._id !== id)
    );
  };

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
            <button
              type="submit"
              className="save"
              // startIcon={"🚕"}
            >
              Salvar
            </button>
            {/* <Button
              type="submit"
              className="save"
              component="label"
              variant="contained"
              // startIcon={"🚕"}
            >
              Salvar
            </Button> */}
          </Form>
        </body>
        <footer>
          <Button
            className="icon"
            component="label"
            variant="contained"
            onClick={() => setOpenModalViewAllIngredients(true)}
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
