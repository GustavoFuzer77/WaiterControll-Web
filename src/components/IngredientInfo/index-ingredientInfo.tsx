import { useState } from "react";
import { EditIngredient } from "../../pages/Config/CreateIngredient/Edit/index-edit";
// import { IIngredients } from "../../types/types-interfaces";

import { Container } from "./styled";
import { IIngredients } from "../../types/types-interfaces";
import { api } from "../../utils/api";
import React from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

interface IIngredientsInfo {
  ingredient: IIngredients;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const IngredientInfo = ({
  ingredient,
  onUpdate,
  onDelete,
}: IIngredientsInfo) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleEditIngredients = (bool?: boolean) => {
    setOpenEdit(bool ?? true);
  };

  const handleDeleteIngredient = async () => {
    try {
      await api.delete(`/api/v1/ingredients/${ingredient._id}`);
      onDelete(ingredient._id);
    } catch (err: any) {
      const errorData = err.response.data;
      toast.error(errorData.message);
    }
  };

  return (
    <React.Fragment key={ingredient._id}>
      <Container key={ingredient._id}>
        <div>
          <h1>{ingredient.name}</h1>
        </div>
        <div className="icons-methods">
          <Button onClick={() => handleEditIngredients()}>Editar</Button>
          <Button onClick={handleDeleteIngredient}>Deletar</Button>
        </div>
      </Container>
      {openEdit && (
        <EditIngredient
          dataIngredients={ingredient}
          onUpdate={onUpdate}
          onClose={() => handleEditIngredients(false)}
        />
      )}
    </React.Fragment>
  );
};
