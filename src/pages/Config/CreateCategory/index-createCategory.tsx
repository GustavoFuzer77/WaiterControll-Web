// import SideMenu from "../../components/SideMenu/index-sideMenu";
import { TextField, Button } from "@mui/material";
import { Container, Form } from "./styled";

const CreateCategory = () => {
  return (
    <Container>
      <header>
        <div className="div-header">
          <h1>Adicionar Categoria</h1>
        </div>
      </header>
      <body>
        <Form>
          <TextField
            className="name"
            id="name"
            label="Nome da Categoria"
            variant="outlined"
          />
          <TextField
            className="icon"
            id="name"
            label="Emoji de icone"
            variant="outlined"
          />
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
          // startIcon={"🚕"}
        >
          Ver todas as Categorias Salvas
        </Button>
      </footer>
    </Container>
  );
};

export default CreateCategory;
