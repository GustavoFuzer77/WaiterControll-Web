import SelectOptionSideMenu from "../SelectOptionSideMenu/index-SelectOptionSideMenu";
import { Container } from "./styled";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const options = [
    {
      description: "Adicionar produtos",
      icon: "🥕",
      route: "/config/produtos",
    },
    {
      description: "Adicionar categoria",
      icon: "🥕",
      route: "/config/categorias",
    },
    {
      description: "Adicionar Grupo de ingredientes",
      icon: "🥕",
      route: "/config/grupos",
    },
    {
      description: "Adicionar ingredientes",
      icon: "🥕",
      route: "/config/ingredientes",
    },
  ];

  return (
    <Container>
      <header>
        <div className="logo-div">
          <img src="../../../public/logo.png" />
          <div className="title">
            <h1>WAITER</h1>
            <span>Controll</span>
          </div>
        </div>
      </header>
      <body>
        {options.map((elements) => (
          <SelectOptionSideMenu data={elements} />
        ))}
      </body>
      <footer>
        {/* <Button bgcolor={Colors.backgroundLightGray200}> */}
        <Link className="go-back" to={"/"}>
          Voltar
        </Link>
        {/* </Button> */}
      </footer>
    </Container>
  );
};

export default SideMenu;
