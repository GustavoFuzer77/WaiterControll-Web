// import SideMenu from "../../components/SideMenu/index-sideMenu";
import { Button, TextField } from "@mui/material";
import { Container, Form } from "./styled";

const GrupoIngredientes = () => {
  return (
    <Container>
      <header>
        <div className="div-header">
          <h1>Adicionar Grupo de Ingrediente</h1>
        </div>
      </header>
      <body>
        <Form>
          <TextField
            className="name"
            id="name"
            label="Nome do grupo"
            variant="outlined"
          />
          <Button
            className="iconButton"
            component="label"
            variant="contained"
            // startIcon={"🚕"}
          >
            Selecione os Ingredientes
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
        <div>
          <Button
            className="listGroup"
            component="label"
            variant="contained"
            // startIcon={"🚕"}
          >
            Ver todos os grupos salvos
          </Button>
        </div>
      </footer>
    </Container>
  );
};

export default GrupoIngredientes;
