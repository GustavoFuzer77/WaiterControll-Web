import { useState } from "react";
import { EditIngredient } from "../../pages/Config/CreateIngredient/Edit/index-edit";
// import { IIngredients } from "../../types/types-interfaces";

import { Container } from "./styled";
import { IIngredients } from "../../types/types-interfaces";
import { api } from "../../utils/api";

interface IIngredientsInfo {
  ingredient: IIngredients;
  onDelete: (id: string) => void;
}

export const IngredientInfo = ({ ingredient, onDelete }: IIngredientsInfo) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleEditIngredients = (bool?: boolean) => {
    setOpenEdit(bool ?? true);
  };

  const handleDeleteIngredient = async () => {
    await api.delete(`/api/v1/ingredients/${ingredient._id}`);
    onDelete(ingredient._id);
  };

  return (
    <>
      <Container key={ingredient._id}>
        <div>
          <h1>{ingredient.name}</h1>
        </div>
        <div className="icons-methods">
          <button onClick={() => handleEditIngredients()}>Editar</button>
          <button onClick={handleDeleteIngredient}>Deletar</button>
        </div>
      </Container>
      {openEdit && (
        <EditIngredient
          dataIngredients={ingredient}
          onClose={() => handleEditIngredients(false)}
        />
      )}
    </>
  );
};
