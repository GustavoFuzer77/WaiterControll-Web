// import SideMenu from "../../components/SideMenu/index-sideMenu";
import { Button, Checkbox, TextField } from "@mui/material";
import { Container, Form, Footer } from "./styled";
import { useCallback, useState } from "react";
import { FieldValues, useController, useForm } from "react-hook-form";
import { ICategory, IIngredientsGroups } from "../../../types/types-interfaces";
import { api } from "../../../utils/api";
import { toast } from "react-toastify";
import { ModalComponent } from "../../../components/Modal/index-ModalComponent";
import { FormDataSet } from "../../../utils/uploader";

const CreateProduct = () => {
  const [
    openModalViewAllGroupsIngredients,
    setOpenModalViewAllGroupsIngredients,
  ] = useState(false);

  const [openModalViewAllCategories, setOpenModalViewAllCategories] =
    useState(false);

  // const [openModalCategory, setOpenModalCategory] = useState(false);

  const { register, handleSubmit, control } = useForm();

  const { field: groups } = useController({
    control,
    name: "ingredientsGroups",
  });

  const { field: category } = useController({
    control,
    name: "category",
  });

  const [groupsState, setGroupsState] = useState<IIngredientsGroups[]>(
    groups.value || []
  );

  const [getDataIngredientsGroup, setDataIngredientsGroup] = useState<
    IIngredientsGroups[]
  >([]);

  const [categoryState, setCategoryState] = useState<string[]>(
    category.value || []
  );

  const [getDataCategory, setDataCategory] = useState<ICategory[]>([]);

  const openModalAllGroups = async () => {
    await api.get("/api/v1/ingredientsGroup").then(({ data }) => {
      setDataIngredientsGroup(data);
    });
    setOpenModalViewAllGroupsIngredients(true);
  };

  const openModalAllCategory = async () => {
    await api.get("/api/v1/categories").then(({ data }) => {
      setDataCategory(data);
    });
    setOpenModalViewAllCategories(true);
  };

  const selectAndMountObjGroupIngredients = useCallback(() => {
    let obj: { name: string; icon: string }[] = [];
    groupsState
      .filter((elx) => elx)
      .forEach((ely) => {
        ely.ingredients.map((data) => {
          obj.push({
            name: data.ingredient.name,
            icon: data.ingredient.icon,
          });
        });
      });
    return obj;
    // return obj;
  }, [groupsState]);

  const sendDataToCreateProduct = async (data: FieldValues) => {
    const sender = new FormDataSet();
    sender.rawForm(data);
    sender.setNameFile("product");

    if (data.name === "") {
      toast.error("Nome não pode ser vazio.");
      return;
    }
    if (data.description === "") {
      toast.error("descrição não pode ser vazio.");
      return;
    }
    if (data.price === "") {
      toast.error("Preço não pode ser vazio.");
      return;
    }
    if (data.image.length === 0) {
      toast.error("Imagem não pode ser vazio.");
      return;
    }
    if (data.categoryId === "") {
      toast.error("Categoria não pode ser vazio.");
      return;
    }
    if (selectAndMountObjGroupIngredients().length === 0) {
      toast.error("Selecione pelo menos 1 grupo de ingrediente.");
      return;
    }

    sender.append("image", "image");
    sender.append("string", "name");
    sender.append("string", "description");
    sender.append("string", "price");
    sender.append("custom", "categoryId", categoryState[0]);
    sender.append(
      "custom",
      "ingredients",
      JSON.stringify(selectAndMountObjGroupIngredients())
    );

    const formData = sender.getFormData();
    try {
      await api.post(`/api/v1/products`, formData);
      toast.success("Produto cadastrado com sucesso!");
    } catch (err) {
      toast.error("Ocorreu um erro ao tentar cadastrar um produto");
    }
  };

  const onSubmit = (data: FieldValues) => {
    sendDataToCreateProduct(data);
  };

  return (
    <Container>
      <header>
        <div className="div-header">
          <h1>Adicionar Produtos</h1>
        </div>
      </header>
      <body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("name")}
            className="name"
            id="name"
            label="Nome do produto"
            variant="outlined"
          />
          <TextField
            {...register("description")}
            className="description"
            id="description"
            label="Descrição do produto"
            variant="filled"
          />
          <Button
            onClick={openModalAllCategory}
            id="category"
            className="category"
            variant="outlined"
          >
            Selecionar Categoria
          </Button>
          <Button
            onClick={openModalAllGroups}
            className="ingredients"
            variant="outlined"
          >
            Selecionar Grupo de ingrediente
          </Button>

          <Button className="image" component="label" variant="contained">
            Selecione uma imagem para o Produto
            <input
              {...register("image")}
              style={{ display: "none" }}
              type="file"
            />
          </Button>

          <TextField
            {...register("price")}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            type="number"
            className="price"
            id="price"
            label="Preço"
            variant="outlined"
          />
          <button className="save">Salvar</button>
        </Form>
      </body>

      {openModalViewAllGroupsIngredients && (
        <ModalComponent
          title="Todos os Grupos"
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
              {getDataIngredientsGroup.map((groups) => {
                return (
                  <div
                    key={groups._id}
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
                      key={groups._id}
                      checked={groupsState.includes(groups)}
                      value={groups._id}
                      onChange={() => {
                        setGroupsState((prev) => {
                          const itemIndex = prev.findIndex(
                            (prev) => prev === groups
                          );
                          if (itemIndex < 0) {
                            return prev.concat(groups);
                          } else {
                            return prev.filter(
                              (_, index) => index !== itemIndex
                            );
                          }
                        });
                      }}
                    />
                    <p>{groups.name}</p>
                  </div>
                );
              })}
            </div>
          }
        />
      )}
      {openModalViewAllCategories && (
        <ModalComponent
          title="Todos as Categorias"
          onClose={() => setOpenModalViewAllCategories(false)}
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
              {getDataCategory.map((categories) => {
                return (
                  <div
                    key={categories._id}
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
                      key={categories._id}
                      checked={categoryState.includes(categories._id)}
                      value={categories._id}
                      onChange={() => {
                        setCategoryState((prev) => {
                          const itemIndex = prev.findIndex(
                            (prevItem) => prevItem === categories._id
                          );

                          if (itemIndex < 0) {
                            if (prev.length >= 1) {
                              return [categories._id];
                            } else {
                              return prev.concat(categories._id);
                            }
                          } else {
                            return [categories._id];
                          }
                        });
                      }}
                    />
                    <p>{categories.name}</p>
                  </div>
                );
              })}
            </div>
          }
        />
      )}
      <Footer>
        <Button component="label" variant="contained">

        </Button>
      </Footer>
    </Container>
  );
};

export default CreateProduct;
