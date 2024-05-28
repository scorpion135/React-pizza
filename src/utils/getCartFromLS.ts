import { CartItemProps } from "../redux/cart/types";
import { calcTotalPrice } from "./../utils/calcTotalPrice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const itemsPrice = calcTotalPrice(items);

  return {
    itemsPrice,
    items: items as CartItemProps[],
  };
};
