import React from "react";

import { setSearch } from "../../redux/slices/searchSlice"; // Функция изменения значения search в redux
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import styles from "./search.module.scss";

export const Search: React.FC = () => {
  const [value, setValue] = React.useState(""); // локальный state для быстрого отображения данных ( для Debounce )

  const dispatch = useDispatch();

  const inputRef = React.useRef<HTMLInputElement>(null);

  // Очистка input и восстановление фокуса на поисковую строку
  function onClickClear(): void {
    dispatch(setSearch(""));
    setValue("");
    inputRef.current?.focus();
  }

  // Кэшируем значение функции для ее правильной работы.
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearch(str));
    }, 500),
    []
  );

  // При изменении значения input, будем менять локальный state поиска и вызывать функцию
  // задержки поиска среди каталога товаров (избавляем сервер от большого количества запросов)
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.search}>
      <img className={styles.seak} src="/img/search-icon.svg" alt="" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Введите название"
        value={value}
        onChange={onChangeInput}
      />
      {value ? (
        <img
          onClick={onClickClear}
          className={styles.cancel}
          src="/img/cancel-icon.svg"
          alt=""
        />
      ) : (
        ""
      )}
    </div>
  );
};
