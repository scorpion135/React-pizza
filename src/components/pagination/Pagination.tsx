import React from "react";
import ReactPaginate from "react-paginate";

import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../../redux/filter/slice";
import { RootState } from "../../redux/store";

import styles from "./pagination.module.scss";

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();

  const page = useSelector((state: RootState) => state.filter.page);

  function onChangePage(page: number): void {
    dispatch(setPage(page));
  }

  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={page - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
