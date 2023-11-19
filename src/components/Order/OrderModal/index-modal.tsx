import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ContainerModal,
  ModalBodyItems,
  ModalContent,
  ModalFooter,
} from "../styled";
import { ButtonComponent } from "../../Button/index-button";
import { IOrders, IProducts } from "../../../types/types-interfaces";
import { formatPrice } from "../../../utils/fn";

interface IProdModal {
  handleClose: () => void;
  order: IOrders | null;
  handleCancelOrder: () => void;
  handleChangeStatus: () => void;
  loading: boolean;
}

export const OrderModal = ({
  handleClose,
  order,
  handleCancelOrder,
  handleChangeStatus,
  loading,
}: IProdModal) => {

  if (order === null) {
    return null;
  }

  useEffect(() => {
    const handlePressToCloseModal = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } // Esc
    };
    document.addEventListener("keydown", handlePressToCloseModal);

    return () => {
      document.removeEventListener("keypress", handlePressToCloseModal);
    };
  }, [handleClose]);

  const total = order.products.reduce((acc, { product, quantity }) => {
    return acc + product.price * quantity;
  }, 0);

  const changeTextButtonStatus = (): string => {
    switch (order.status) {
      case "WAITING":
        return "Iniciar Produção 👨‍🍳";
      case "IN_PRODUCTION":
        return "Concluir pedido ✔";
      default:
        return "";
    }
  };

  return createPortal(
    <ContainerModal>
      <ModalContent>
        <header>
          <div className="header-top">
            <h1>Mesa {order.table}</h1>
            <button onClick={handleClose}>✖</button>
          </div>
          <div className="header-body">
            <span>Status do Pedido:</span>
            <p>
              {order.status === "WAITING" && "🕒 Fila de espera"}
              {order.status === "DONE" && "✅ Finalizado"}
              {order.status === "IN_PRODUCTION" && "🕑 Em Produção"}
            </p>
          </div>
        </header>
        <ModalBodyItems>
          <span>Itens:</span>
          <div className="item-container">
            {order.products.map((prod: IProducts) => (
              <div className="item" key={prod._id}>
                <img
                  src={`http://localhost:3001/uploads/${prod.product.imagePath}`}
                  alt=""
                />
                <p>{prod.quantity}x</p>
                <div className="description">
                  <h1>{prod.product.name}</h1>
                  <span>R$ {formatPrice(prod.product.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </ModalBodyItems>
        <ModalFooter>
          <div className="total-value">
            <span>Total</span>
            <p>R$ {formatPrice(total)}</p>
          </div>
          {order.status !== "DONE" && (
            <ButtonComponent
              disabled={loading}
              onClick={handleChangeStatus}
              color="#fff"
              bgcolor="#666"
              text={changeTextButtonStatus()}
              fontWeight="600"
            />
          )}
          <ButtonComponent
            disabled={loading}
            onClick={handleCancelOrder}
            color="#ff0000"
            bgcolor="#ffffff"
            text={order.status !== "DONE" ? "Cancelar Pedido" : "Finalizar pedido"}
            fontWeight="400"
          />
        </ModalFooter>
      </ModalContent>
    </ContainerModal>,
    document.getElementById("modal") as HTMLElement
  );
};
