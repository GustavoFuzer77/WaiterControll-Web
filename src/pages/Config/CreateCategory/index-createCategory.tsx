// import SideMenu from "../../components/SideMenu/index-sideMenu";
import {
  TextField,
  Button,
  Accordion,
  AccordionDetails,
  ListItem,
  AccordionSummary,
  ListItemText,
} from "@mui/material";
import { Container, Form } from "./styled";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../../../utils/api";
import { FormDataSet } from "../../../utils/uploader";
import { ModalComponent } from "../../../components/Modal/index-ModalComponent";
import { ICategory } from "../../../types/types-interfaces";
import { toast } from "react-toastify";
import { SemiArrow } from "../../../components/Icons/SemiArrow/index-semiArrow";

const CreateCategory = () => {
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [getDataCategory, setDataCategory] = useState<ICategory[]>([]);

  const { register, handleSubmit } = useForm();

  const openModalAllCategory = async () => {
    await api.get("/api/v1/categories").then(({ data }) => {
      setDataCategory(data);
    });
    setOpenModalCategory(true);
  };

  const handleDelete = async (id: string) => {
    try {
      // setDataCategory((prev) => prev.filter((category) => category._id !== id));
      await api.delete(`/api/v1/categories/${id}`);
      toast.success('Deletado com sucesso');
    } catch (err: any) {
      const errorData = err.response.data;
      toast.error(errorData.message);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const sender = new FormDataSet();
    sender.rawForm(data);
    sender.setNameFile("categories");

    if (data.name === "") {
      toast.error("Nome não pode ser vazio.");
      return;
    }
    if(data.icon.length === 0){
      toast.error("Imagem não pode ser vazio.");
      return;
    }

    sender.append("image", "icon");
    sender.append("string", "name");
    const formData = sender.getFormData();

    try {
      await api.post(`/api/v1/categories`, formData);
      toast.success("Categoria cadastrado com sucesso!");
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <Container>
      <header>
        <div className="div-header">
          <h1>Adicionar Categoria</h1>
        </div>
      </header>
      <body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className="name"
            id="name"
            label="Nome da Categoria"
            variant="outlined"
            {...register("name")}
          />
          <Button className="icon" component="label" variant="contained">
            Selecione uma imagem para a Categoria
            <input
              {...register("icon")}
              style={{ display: "none" }}
              type="file"
            />
          </Button>
          <button className="save" type="submit">
            Salvar
          </button>
        </Form>
      </body>
      <footer>
        <Button
          className="icon"
          component="label"
          variant="contained"
          onClick={() => openModalAllCategory()}
        >
          Ver todas as Categorias Salvas
        </Button>
      </footer>
      {openModalCategory && (
        <ModalComponent
          title="Todas as Categorias"
          onClose={() => setOpenModalCategory(false)}
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
              {getDataCategory.flatMap((category, i) => {
                return (
                  <Accordion key={i}>
                    <AccordionSummary
                      expandIcon={<SemiArrow width="40px" heigth="40px" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <p>{category?.name}</p>
                    </AccordionSummary>
                    <AccordionDetails key={i}>
                      <div
                        style={{
                          fontSize: "13px",
                        }}
                      >
                        <ListItem
                          key={i}
                          disableGutters
                          // secondaryAction={}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              margin: "16px",
                              width: "100%",
                            }}
                          >
                            <ListItemText primary={`${category.name}`} />
                            <div
                              style={{
                                width: "100px",
                                height: "60px",
                                borderRadius: "12px",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                                src={`http://localhost:3001/uploads/${category.icon}`}
                              />
                            </div>
                          </div>
                        </ListItem>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <button onClick={() => handleDelete(category._id)}>
                          <p>Deletar</p>
                        </button>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          }
        />
      )}
    </Container>
  );
};

export default CreateCategory;
