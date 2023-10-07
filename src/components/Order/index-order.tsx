import { IOrders } from "../../types/types-interfaces";
import { OnBoard } from "./Boards/index-board";
import { Container } from "./styled";

export const OrderComponent = () => {
  const order: IOrders[] = [
    {
      _id: "4",
      table: "4",
      status: "IN_PRODUCTION",
      products: [
        {
          product: {
            _id: "104",
            name: "Hawaiian Pizza",
            description: "Classic Hawaiian pizza",
            imagePath: "pizza4.jpeg",
            price: 15.99,
            ingredients: [
              {
                name: "Ham",
                icon: "🍖",
                _id: "206",
              },
              {
                name: "Pineapple",
                icon: "🍍",
                _id: "207",
              },
            ],
            categoryId: "301",
            __v: 0,
          },
          quantity: 3,
          _id: "404",
        },
      ],
    },
    {
      _id: "3",
      table: "3",
      status: "DONE",
      products: [
        {
          product: {
            _id: "103",
            name: "Vegetarian Pizza 1",
            description: "Healthy vegetarian pizza",
            imagePath: "1696102938720-OIP.jpeg",
            price: 13.99,
            ingredients: [
              {
                name: "Mushrooms",
                icon: "🍄",
                _id: "204",
              },
              {
                name: "Bell Peppers",
                icon: "🌶️",
                _id: "205",
              },
            ],
            categoryId: "301",
            __v: 0,
          },
          quantity: 1,
          _id: "403",
        },
        {
          product: {
            _id: "103",
            name: "Vegetarian Pizza 2",
            description: "Healthy vegetarian pizza",
            imagePath: "1696102938720-OIP.jpeg",
            price: 13.99,
            ingredients: [
              {
                name: "Mushrooms",
                icon: "🍄",
                _id: "204",
              },
              {
                name: "Bell Peppers",
                icon: "🌶️",
                _id: "205",
              },
            ],
            categoryId: "301",
            __v: 0,
          },
          quantity: 1,
          _id: "403",
        },
        {
          product: {
            _id: "103",
            name: "Vegetarian Pizza 3",
            description: "Healthy vegetarian pizza",
            imagePath: "1696102938720-OIP.jpeg",
            price: 13.99,
            ingredients: [
              {
                name: "Mushrooms",
                icon: "🍄",
                _id: "204",
              },
              {
                name: "Bell Peppers",
                icon: "🌶️",
                _id: "205",
              },
            ],
            categoryId: "301",
            __v: 0,
          },
          quantity: 1,
          _id: "403",
        },
      ],
    },
    {
      _id: "1",
      table: "1",
      status: "WAITING",
      products: [
        {
          product: {
            _id: "101",
            name: "Pizza Margherita",
            description: "Delicious Margherita pizza",
            imagePath: "pizza1.jpeg",
            price: 12.99,
            ingredients: [
              {
                name: "Mozzarella",
                icon: "🧀",
                _id: "201",
              },
              {
                name: "Basil",
                icon: "🌿",
                _id: "202",
              },
            ],
            categoryId: "301",
            __v: 0,
          },
          quantity: 1,
          _id: "401",
        },
      ],
    },
  ];

  return (
    <Container>
      <OnBoard icon="🕒" title="Fila de espera" orders={order} />
      <OnBoard icon="⌛" title="Em preparação" orders={[]} />
      <OnBoard icon="✅" title="Finalizado" orders={[]} />
    </Container>
  );
};
