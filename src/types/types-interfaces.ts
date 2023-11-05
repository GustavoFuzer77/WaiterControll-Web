export interface IProducts {
  product: {
    _id: string;
    name: string;
    description: string;
    imagePath: string;
    price: number;
    ingredients: Array<{
      name: string;
      icon: string;
      _id: string;
    }>;
    categoryId: string;
    __v: number;
  };
  quantity: number;
  _id: string;
}

export interface IOrders {
  _id: string;
  table: string;
  status: "WAITING" | "IN_PRODUCTION" | "DONE";
  products: IProducts[];
}

export interface IIngredients {
  _id: string;
  name: string;
  icon: string;
}

export interface IIngredientsGroups {
  _id: string;
  name: string;
  ingredients: {ingredient: IIngredients}[];
}

export interface ICategory {
  _id: string;
  name: string;
  icon: string;
}

export type TIcons = {
  width?: string;
  heigth?: string;
  fill?: string;
  background?: string;
};
