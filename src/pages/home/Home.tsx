import React, { useEffect } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";

import { setFilters } from "../../redux/filter/slice";
import { fetchPizzas } from "../../redux/pizza/asyncActions";
import { setStatus } from "../../redux/pizza/slice";

import { Card, Categories, Sort, Pagination } from "./../../components/index";

import { sortArr } from "./../../components/sort/Sort";
import { Pizza } from "./../../redux/pizza/types";

import "./home.scss";

const Home: React.FC = () => {
  const { categoryId, sort, page } = useSelector(
    (state: RootState) => state.filter
  );
  const dispatch = useAppDispatch();

  const search = useSelector((state: RootState) => state.search.value);
  const { items, status } = useSelector((state: RootState) => state.pizza);
  const navigate = useNavigate();

  const isSearch = React.useRef(false); // поиска по URl еще не было
  const isMounted = React.useRef(false); // первого рендера еще не было

  async function getPizzas() {
    const category = categoryId > 0 ? `&category=${categoryId}` : "";

    dispatch(
      fetchPizzas({
        category,
        page,
        sort: sort.sortProperty,
      })
    );

    window.scrollTo(0, 0);
  }

  // Если был первый рендеринг, то проверяем URL-параметры и сохраняем значения в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortArr.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          categoryId: Number(params.categoryId),
          page: Number(params.page),
          sort: sort || sortArr[0],
        })
      );

      isSearch.current = true;
    }
  }, []);

  // Если URL-параметров нет, то вызываем функцию, отображающую каталог пицц с бэка.
  // В противном случае изменяем переменную на false
  // В результате остается один правильный запрос на сервер
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, page, search]);

  // Проверяем был ли первый рендеринг, если нет - меняем значение переменной на true, если рендеринг был - отображаем параметры в navigate
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        page,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, page]);

  function renderItems() {
    const filteredItems = items.filter((pizza: Pizza) =>
      pizza.title.toLowerCase().includes(search.toLowerCase())
    );

    if (!filteredItems.length) {
      setStatus("error");
    }

    return (status === "loading" ? [...Array(8)] : filteredItems).map(
      (item: any) => <Card key={item && item.id} {...item} isLoading={status} />
    );
  }

  return (
    <div className="container">
      <div className="home__top">
        <Categories value={categoryId} />
        <Sort value={sort} />
      </div>
      {status === "error" ? (
        <div className="home__error-info">
          <h2>
            Товары не найдены <span>😕</span>
          </h2>
          <p>
            Вероятней всего, произошла какая-то ошибка
            <br />
            Перезагрузите страницу или немного подождите
          </p>
        </div>
      ) : (
        <div>
          <h2 className="home__title">Все пиццы</h2>
          <div className="home__items">{renderItems()}</div>
          <Pagination />
        </div>
      )}
    </div>
  );
};

export default Home;
