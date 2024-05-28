import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";

import { Skeleton } from "./../index";

import { addItem } from "../../redux/cart/slice";
import { CartItemProps } from "../../redux/cart/types";

import "./card.scss";

type CardProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  isLoading: string;
};

export const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  title,
  price,
  types,
  sizes,
  isLoading,
}) => {
  const typesName = ["тонкое", "традиционное"];

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cardsWithSameId = cartItems.filter(
    (obj: CartItemProps) => obj.id === id
  );

  const cardWithSameIdCount = cardsWithSameId.reduce(
    (sum: number, item: CartItemProps) => (sum += item.count),
    0
  );

  const addedCount = cartItems ? cardWithSameIdCount : 0;

  const [typeNumber, setTypeNumber] = React.useState(0);
  const [sizeNumber, setSizeNumber] = React.useState(0);

  const dispatch = useDispatch();

  const onAddToCart = (): void => {
    const item: CartItemProps = {
      id,
      title,
      price,
      imageUrl,
      type: typesName[typeNumber],
      size: sizes[sizeNumber],
      count: 0,
    };

    dispatch(addItem(item));
  };

  return (
    <>
      {isLoading === "loading" ? (
        <Skeleton />
      ) : (
        <div className="pizza-block-wrap">
          <div className="pizza-block">
            <Link to={`/pizza/${id}`}>
              <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
            </Link>
            <h4 className="pizza-block__title">{title}</h4>
            <div className="pizza-block__selector">
              <ul>
                {types.map((type: number, index: number) => (
                  <li
                    key={index}
                    className={`${typeNumber === index ? "active" : ""}`}
                    onClick={() => setTypeNumber(index)}
                  >
                    {type === 0 ? "тонкое" : "традиционное"}
                  </li>
                ))}
              </ul>
              <ul>
                {sizes.map((size: number, index: number) => (
                  <li
                    key={index}
                    className={sizeNumber === index ? "active" : ""}
                    onClick={() => setSizeNumber(index)}
                  >
                    {`${size} см`}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pizza-block__bottom">
              <div className="pizza-block__price">от {price} р.</div>
              <button
                className="button button--outline button--add"
                onClick={onAddToCart}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                    fill="white"
                  />
                </svg>
                <span>Добавить</span>
                {addedCount > 0 && <i>{addedCount}</i>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
