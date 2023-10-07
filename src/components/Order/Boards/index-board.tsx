import { useState } from "react";

import { Board, OrderContainer } from "../styled";
import { ProductModal } from "../OrderModal/index-modal";
import { IOnBoard, IOrders } from "../../../types/types-interfaces";

export const OnBoard = ({ title, icon, orders }: IOnBoard) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProd, setSelectedProd] = useState<IOrders | null>(null);

  const handleOpenProductDetail = (order: IOrders) => {
    setOpenModal(true);
    setSelectedProd(order);
  };

  return (
    <>
      {openModal && (
        <ProductModal
          handleClose={() => setOpenModal(false)}
          order={selectedProd}
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
