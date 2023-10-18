import { useState } from "react";

import { Board, OrderContainer } from "../styled";
import { OrderModal } from "../OrderModal/index-modal";
import { IOrders } from "../../../types/types-interfaces";
import { api } from "../../../utils/api";
import { toast } from "react-toastify";
export interface IOnBoard {
  title: string;
  icon: string;
  orders: IOrders[];
  onCancelOrder: (id: string) => void;
  onChangeStatus: (id: string, status: IOrders["status"]) => void;
}

export const OnBoard = ({
  title,
  icon,
  orders,
  onCancelOrder,
  onChangeStatus,
}: IOnBoard) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProd, setSelectedProd] = useState<IOrders | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenProductDetail = (order: IOrders) => {
    setOpenModal(true);
    setSelectedProd(order);
  };

  const handleChangeStatus = async () => {
    setLoading(true);

    const newStatus =
      selectedProd?.status === "WAITING" ? "IN_PRODUCTION" : "DONE";
    console.log(newStatus, "newStatus");
    await api.patch(`/api/v1/orders/${selectedProd?._id}`, {
      status: newStatus,
    });

    onChangeStatus(selectedProd!._id, newStatus);

    toast.success(`O pedido da mesa ${selectedProd?.table} foi alterado!`);
    setLoading(false);
    setOpenModal(false);
  };

  const handleCancelOrder = async () => {
    setLoading(true);
    await api.delete(`/api/v1/orders/${selectedProd?._id}`);
    onCancelOrder(selectedProd!._id);
    toast.success(`O pedido da mesa ${selectedProd?.table} foi cancelado!`);
    setLoading(false);
    setOpenModal(false);
  };

  return (
    <>
      {openModal && (
        <OrderModal
          handleClose={() => setOpenModal(false)}
          handleCancelOrder={() => handleCancelOrder()}
          handleChangeStatus={() => handleChangeStatus()}
          order={selectedProd}
          loading={loading}
        />
      )}
      <Board>
        <header>
          <span>{icon}</span>
          <strong>{title}</strong>
          <span>({orders.length})</span>
        </header>
        <OrderContainer>
          {orders.map((el) => (
            <button onClick={() => handleOpenProductDetail(el)} key={el._id}>
              <strong>Mesa {el.table}</strong>
              <span>{el.products.length} Itens</span>
            </button>
          ))}
        </OrderContainer>
      </Board>
    </>
  );
};
