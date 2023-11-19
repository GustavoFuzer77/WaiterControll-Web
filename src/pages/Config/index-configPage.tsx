import { useEffect } from "react";
import SideMenu from "../../components/SideMenu/index-sideMenu";
import { Container, RightBar } from "./styled";
import { Outlet, useNavigate } from "react-router-dom";
import { ProductIcon } from "../../components/Icons/ProductIcon";

const Config = () => {
  const navigator = useNavigate();
  useEffect(() => {
    navigator("config/produtos");
  }, []);

  return (
    <Container>
      <SideMenu />
      <Outlet />
      <RightBar>
        <div>
          <button>
            <ProductIcon width="32px" heigth="32px" />
          </button>
        </div>
      </RightBar>
    </Container>
  );
};

export default Config;
