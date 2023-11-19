import { Button } from "@mui/material";
import { HeaderComponent } from "../../components/Header/index-header";
import { OrderComponent } from "../../components/Order/index-order";
import { Container } from "./styled";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <HeaderComponent />
      <OrderComponent />
      <Container>
        <Link to="/config">
          <Button component="label" variant="contained">
            Configurações
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default Home;
