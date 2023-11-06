// import SideMenu from "../../components/SideMenu/index-sideMenu";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Chip,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

import { Container, Form, IngredientsSelected } from "./styled";
import { ModalComponent } from "../../../components/Modal/index-ModalComponent";
import { useState, ChangeEvent } from "react";
import { api } from "../../../utils/api";
import {
  IIngredients,
  IIngredientsGroups,
} from "../../../types/types-interfaces";
import { FieldValues, useController, useForm } from "react-hook-form";
import { TrashIcon } from "../../../components/Icons/TrashIcon/index-trash";
import { SemiArrow } from "../../../components/Icons/SemiArrow/index-semiArrow";

const GrupoIngredientes = () => {
  const [openModalViewAllIngredients, setOpenModalViewAllIngredients] =
    useState(false);

  const [
    openModalViewAllGroupsIngredients,
    setOpenModalViewAllGroupsIngredients,
  ] = useState(false);

  const { register, handleSubmit, control } = useForm();

  const { field } = useController({
    control,
    name: "createIngredient",
  });
  const [value, setValue] = useState<string[]>(field.value || []);

  const [getDataIngredients, setDataIngredients] = useState<IIngredients[]>([]);
  const [getDataIngredientsGroup, setDataIngredientsGroup] = useState<
    IIngredientsGroups[]
  >([]);

  const openModalAllIngredients = async () => {
    await api.get("/api/v1/ingredients").then(({ data }) => {
      setDataIngredients(data);
    });
    setOpenModalViewAllIngredients(true);
  };

  const openModalAllGroups = async () => {
    await api.get("/api/v1/ingredientsGroup").then(({ data }) => {
      setDataIngredientsGroup(data);
    });
    setOpenModalViewAllGroupsIngredients(true);
  };

  const modObj: { ingredient: string }[] = value
    .filter((elx) => elx)
    .map((ely) => {
      return { ingredient: ely };
    });

  const sendDataObjToCreateGroup = async (data: FieldValues) => {
    try {

      if (data.name === "") {
        toast.error("Nome não pode ser vazio.");
        return;
      }
      if(modObj.length === 0){
        toast.error("É necessario selecionar pelo menos 1 ingrediente.");
        return;
      }

      await api.post(`/api/v1/ingredientsGroup`, {
        name: data.name,
        ingredients: modObj,
      });

      toast.success("Grupo cadastrado com sucesso!");
    } catch (err) {
      toast.error(
        "Ocorreu um erro ao tentar cadastrar um grupo de ingredientes"
      );
    }
  };

  const onSubmit = (data: FieldValues) => {
    sendDataObjToCreateGroup(data);
  };

  const handleDelete = (id: string) => {
    const index = value.indexOf(id);
    if (index > -1) {
      const updatedValue = [...value];
      updatedValue.splice(index, 1);
      setValue(updatedValue);
    }
  };

  const getSelectedIngredient = getDataIngredients.filter((item) => {
    return modObj.some((modItem) => modItem.ingredient === item._id);
  });

  return (
    <Container>
      <header>
        <div className="div-header">
          <h1>Adicionar Grupo de Ingrediente</h1>
        </div>
      </header>
      <body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("name")}
            className="name"
            id="name"
            label="Nome do grupo"
            variant="outlined"
          />
          <Button
            className="iconButton"
            component="label"
            variant="contained"
            onClick={openModalAllIngredients}
          >
            Selecione os Ingredientes
          </Button>

          <button type="submit" className="save">
            Salvar
          </button>
        </Form>
        {getSelectedIngredient.length >= 1 && (
          <div className="title-area">
            <h1>Ingredientes selecionados:</h1>
          </div>
        )}
        <IngredientsSelected>
          {getSelectedIngredient.map((selected) => (
            <div key={selected._id} className="container-ingredient">
              <Chip
                label={`${selected.name}`}
                variant="outlined"
                onDelete={() => handleDelete(selected._id)}
              />
            </div>
          ))}
        </IngredientsSelected>
      </body>
      <footer>
        <div>
          <Button
            onClick={openModalAllGroups}
            className="listGroup"
            component="label"
            variant="contained"
          >
            Ver todos os grupos salvos
          </Button>
        </div>
      </footer>
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
                <div
                  key={ingredients._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px",
                    border: "1px solid #2c2c2c",
                    borderRadius: "6px",
                    marginBottom: "16px",
                  }}
                >
                  <Checkbox
                    key={ingredients._id}
                    checked={value.includes(ingredients._id)}
                    value={ingredients._id}
                    onChange={(e) => {
                      setValue((prev) => {
                        const itemIndex = prev.findIndex(
                          (prev) => prev === ingredients._id
                        ); // 1 true -1 false
                        if (itemIndex < 0) {
                          return prev.concat(ingredients._id);
                        } else {
                          return prev.filter((_, index) => index !== itemIndex); // Remove o item do array
                        }
                      });
                    }}
                  />
                  <p>{ingredients.name}</p>
                </div>
              ))}
            </div>
          }
        />
      )}
      {openModalViewAllGroupsIngredients && (
        <ModalComponent
          title="Todos os Grupos de ingredientes"
          onClose={() => setOpenModalViewAllGroupsIngredients(false)}
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
              {getDataIngredientsGroup.flatMap((groups, i) => {
                return (
                  <Accordion key={i}>
                    <AccordionSummary
                      expandIcon={<SemiArrow width="40px" heigth="40px" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <button
                        style={{
                          marginRight: "12px",
                          display: "flex",
                          alignItems: "center",
                          border: "#fd4659 1px solid",
                          borderRadius: "30%",
                          background: "rgba(254, 144, 155, 0.5)",
                        }}
                      >
                        <TrashIcon heigth="25px" width="25px" />
                      </button>
                      <p>{groups?.name}</p>
                    </AccordionSummary>
                    {groups.ingredients.map(
                      (elx: { ingredient: IIngredients }, i: number) => {
                        return (
                          <AccordionDetails key={i}>
                            <div
                              style={{
                                marginLeft: "32px",
                                fontSize: "13px",
                              }}
                            >
                              <div style={{ marginBottom: "16px" }}></div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                                key={elx.ingredient._id}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    alignItems: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "200px",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {elx.ingredient?.name}
                                  </span>
                                </div>
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
                                    src={`http://localhost:3001/uploads/${elx.ingredient?.icon}`}
                                  />
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        );
                      }
                    )}
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

export default GrupoIngredientes;
