import { ReactNode } from "react";
import { Container } from "./styled";
import { Link } from "react-router-dom";
interface ISelectOption {
  data: { description: string; icon: string | ReactNode; route: string };
}

const SelectOptionSideMenu = ({ data }: ISelectOption) => {
  return (
    <Container>
      <Link to={data.route}>
        <div className="div-icon">
          <p>{data.icon}</p>
        </div>
        <div>
          <p>{data.description}</p>
        </div>
      </Link>
    </Container>
  );
};

export default SelectOptionSideMenu;
