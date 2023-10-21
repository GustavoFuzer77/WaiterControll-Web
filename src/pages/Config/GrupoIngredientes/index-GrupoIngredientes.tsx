// import SideMenu from "../../components/SideMenu/index-sideMenu";
import {
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { Container, Form, IngredientsSelected } from "./styled";
import { ModalComponent } from "../../../components/Modal/index-ModalComponent";
import { useState } from "react";
import { api } from "../../../utils/api";
import { IIngredients } from "../../../types/types-interfaces";
import { FieldValues, useController, useForm } from "react-hook-form";

const GrupoIngredientes = () => {
  const [openModalViewAllIngredients, setOpenModalViewAllIngredients] =
    useState(false);

  const { register, handleSubmit, control } = useForm();

  const { field } = useController({
    control,
    name: "createIngredient",
  });
  const [value, setValue] = useState(field.value || []);

  const [getDataIngredients, setDataIngredients] = useState<IIngredients[]>([]);

  const openModalAllIngredients = async () => {
    await api.get("/api/v1/ingredients").then(({ data }) => {
      console.log(data);
      setDataIngredients(data);
    });
    setOpenModalViewAllIngredients(true);
  };

  const modObj: { ingredient: string }[] = value
    .filter((elx: string[]) => elx)
    .map((ely: string[]) => {
      return { ingredient: ely };
    });

  const sendDataObjToCreateGroup = async (data: FieldValues) => {
    await api.post(`/api/v1/ingredientsGroup`, {
      name: data.name,
      ingredients: modObj,
    });
  };

  const onSubmit = (data: FieldValues) => {
    sendDataObjToCreateGroup(data);
  };

  const handleDelete = (id: string) => {
    const index = value.indexOf(id);
    if (index > -1) {
      const updatedValue = [...value]; // Cópia do array
      updatedValue.splice(index, 1);
      setValue(updatedValue);
    }
  };
  console.log(value);
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
            <h1>ingredientes selecionados:</h1>
          </div>
        )}
        {getSelectedIngredient.map((selected) => (
          <IngredientsSelected>
            <div className="container-ingredient">
              <Chip
                label={`${selected.name} - ${selected._id}`}
                variant="outlined"
                onDelete={() => handleDelete(selected._id)}
              />
            </div>
          </IngredientsSelected>
        ))}
      </body>
      <footer>
        <div>
          <Button className="listGroup" component="label" variant="contained">
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
              {getDataIngredients.map((ingredients, index) => (
                <div
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
                      setValue((prev: string[]) => {
                        const itemIndex = prev.findIndex(
                          (item) => item === ingredients._id
                        ); // 1 true -1 false
                        if (itemIndex < 0) {
                          return prev.concat(ingredients._id);
                        }

                        const newItem = [...prev];

                        const restItem = newItem[itemIndex];
                        console.log(restItem, "restItem");
                        // newItem[itemIndex] = {
                        //   quantity: newItem[itemIndex].quantity + 1,
                        // };
                      });
                      // const valueCopy = [...value];
                      // console.log(valueCopy, "a");
                      // valueCopy.push(e.target.checked ? e.target.value : null);

                      // const findIdx = valueCopy.findIndex(
                      //   (elx) => elx === ingredients._id
                      // );
                      // if (findIdx < 0) {
                      //   return valueCopy.push(
                      //     e.target.checked ? e.target.value : null
                      //   );
                      // }

                      // field.onChange(valueCopy);

                      // setValue(valueCopy);
                    }}
                  />
                  <p>{ingredients.name}</p>
                </div>
              ))}
            </div>
          }
        />
      )}
    </Container>
  );
};

export default GrupoIngredientes;
