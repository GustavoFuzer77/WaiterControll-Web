// import SideMenu from "../../components/SideMenu/index-sideMenu";
import { Button, TextField } from "@mui/material";
import { Container, Form } from "./styled";

const CreateProduct = () => {
  return (
    <Container>
      <header>
        <div className="div-header">
          <h1>Adicionar Produtos</h1>
        </div>
      </header>
      <body>
        <Form>
          <TextField
            className="name"
            id="name"
            label="Nome do produto"
            variant="outlined"
          />
          <TextField
            className="description"
            id="description"
            label="Descrição do produto"
            variant="filled"
          />
          <Button id="category" className="category" variant="outlined">
            Selecionar Categoria
          </Button>
          <Button className="ingredients" variant="outlined">
            Selecionar Ingredientes
          </Button>
          <Button
            className="image"
            component="label"
            variant="contained"
            // startIcon={"🚕"}
          >
            Selecione uma imagem para o Produto
            <input style={{ display: "none" }} type="file" />
          </Button>
          <TextField
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            type="number"
            className="price"
            id="price"
            label="Preço"
            variant="outlined"
          />
        </Form>
      </body>
    </Container>
  );
};

export default CreateProduct;
