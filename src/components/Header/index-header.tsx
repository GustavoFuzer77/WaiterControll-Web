// import { AddProductModal } from "../AddProductModal/index-addProductModal";
import { Container } from "./styled";

export const HeaderComponent = () => {
  return (
    <Container>
      {/* <AddProductModal /> */}
      <div className="group-1">
        <div className="subText">
          <p>PEDIDOS</p>
          <span>
            Acompanhe os pedidos dos clientes em <strong>TEMPO REAL!</strong>
          </span>
        </div>
      </div>
      <div className="group-2">
        <img src="../../../public/logo.png" />
        <div className="title">
          <h1>WAITER</h1>
          <span>Controll</span>
        </div>
      </div>
    </Container>
  );
};
