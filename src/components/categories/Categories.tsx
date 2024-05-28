import React from "react";

import { setCategoryId } from "../../redux/filter/slice";

import { useDispatch } from "react-redux";

import "./categories.scss";

type CategoriesProps = {
  value: number;
};

export const Categories: React.FC<CategoriesProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();

  const onClickCategory = (id: number): void => {
    dispatch(setCategoryId(id));
  };

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            className={value === index ? "active" : ""}
            onClick={() => onClickCategory(index)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
