export type Sort = {
  name: string;
  sortProperty: "rating" | "price" | "title" | "-rating" | "-price" | "-title";
};

export interface FilterSliceState {
  categoryId: number;
  page: number;
  sort: Sort;
}
