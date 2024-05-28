export type CartItemProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number | string;
  count?: number;
};

export interface CartSliceState {
  itemsPrice: number;
  items: CartItemProps[];
}
