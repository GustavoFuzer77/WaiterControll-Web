// import SideMenu from "../../components/SideMenu/index-sideMenu";
import { TextField, Button } from "@mui/material";
import { Container, Form } from "./styled";
import { useState } from "react";
import { ModalComponent } from "../../../components/Modal/index-ModalComponent";

const CreateIngredient = () => {
  const [openModalViewAllIngredients, setOpenModalViewAllIngredients] =
    useState(false);

  return (
    <>
      <Container>
        <header>
          <div className="div-header">
            <h1>Adicionar Ingredientes</h1>
          </div>
        </header>
        <body>
          <Form>
            <TextField
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
              <input style={{ display: "none" }} type="file" />
            </Button>
            <Button
              className="save"
              component="label"
              variant="contained"
              // startIcon={"🚕"}
            >
              Salvar
            </Button>
          </Form>
        </body>
        <footer>
          <Button
            className="icon"
            component="label"
            variant="contained"
            onClick={() => setOpenModalViewAllIngredients(true)}
            // startIcon={"🚕"}
          >
            Ver todas os Ingredientes salvos
          </Button>
        </footer>
      </Container>
      {openModalViewAllIngredients && (
        <ModalComponent
          title="Todos os Ingredientes"
          onClose={() => setOpenModalViewAllIngredients(false)}
          onChildrenBody={(
            <div>

            </div>
          )}
        />
      )}
    </>
  );
};

export default CreateIngredient;
