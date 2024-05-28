export type FetchPizzaArgs = {
  category: string;
  page: number;
  sort: string;
};

export type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  isLoading: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
