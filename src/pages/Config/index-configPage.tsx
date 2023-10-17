import { useEffect } from "react";
import SideMenu from "../../components/SideMenu/index-sideMenu";
import { Container } from "./styled";
import { Outlet, useNavigate } from "react-router-dom";

const Config = () => {
  const navigator = useNavigate();
  useEffect(() => {
    navigator("config/produtos");
  }, []);
  return (
    <Container>
      <SideMenu />
      <Outlet />
    </Container>
  );
};

export default Config;
