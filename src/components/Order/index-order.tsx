import { useState, useEffect } from "react";
import { OnBoard } from "./Boards/index-board";
import { Container } from "./styled";
import { IOrders } from "../../types/types-interfaces";
import { api } from "../../utils/api";
import socketIo from "socket.io-client";

export const OrderComponent = () => {
  const [getOrders, setOrders] = useState<IOrders[]>([]);

  useEffect(() => {
    const socket = socketIo("http://localhost:3001", {
      transports: ["websocket"],
    });
    socket.on("orders:new", (order) => {
      console.log(order);
      setOrders((prev) => prev.concat(order));
    });

    return () => {
      socket.disconnect(); // Certifique-se de desconectar o socket quando o componente for desmontado
    };
  }, []);

  useEffect(() => {
    api.get("/api/v1/orders").then(({ data }) => {
      setOrders(data);
    });
  }, []);

  const waiting = getOrders.filter((elx) => elx.status === "WAITING");
  const inProd = getOrders.filter((elx) => elx.status === "IN_PRODUCTION");
  const done = getOrders.filter((elx) => elx.status === "DONE");

  const handleCancelOrder = (orderId: string) => {
    setOrders((prevState) =>
      prevState.filter((order) => order._id !== orderId)
    );
  };

  const handleStatusChanged = (id: string, status: IOrders["status"]) => {
    setOrders((prevState) =>
      prevState.map((order) =>
        order._id === id ? { ...order, status } : order
      )
    );
  };

  return (
    <Container>
      <OnBoard
        onCancelOrder={handleCancelOrder}
        onChangeStatus={handleStatusChanged}
        icon="🕒"
        title="Fila de espera"
        orders={waiting}
      />
      <OnBoard
        onCancelOrder={handleCancelOrder}
        onChangeStatus={handleStatusChanged}
        icon="⌛"
        title="Em preparação"
        orders={inProd}
      />
      <OnBoard
        onCancelOrder={handleCancelOrder}
        onChangeStatus={handleStatusChanged}
        icon="✅"
        title="Finalizado"
        orders={done}
      />
    </Container>
  );
};
