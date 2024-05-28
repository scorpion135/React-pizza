import React from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cart/slice";

import styles from "./pizzaDescription.module.scss";

const PizzaDescription: React.FC = () => {
  const types = ["тонкое", "традиционное"];

  const [pizza, setPizza] = React.useState<{
    id: number;
    imageUrl: string;
    title: string;
    price: number;
    sizes: number[];
    types: number[];
  }>();

  const [typeNumber, setTypeNumber] = React.useState<number>(0);
  const [sizeNumber, setSizeNumber] = React.useState<number>(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  React.useEffect(() => {
    async function findPizza() {
      try {
        const { data } = await axios.get(`http://localhost:3000/items/` + id);
        setPizza(data);
      } catch (err) {
        alert("Пицца не найдена ):");
        navigate("/");
      }
    }

    findPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  function addToCart(): void {
    const item = {
      id: pizza && pizza.id,
      title: pizza && pizza.title,
      price: pizza && pizza.price,
      imageUrl: pizza && pizza.imageUrl,
      type: types[typeNumber],
      size: pizza && pizza.sizes[sizeNumber],
    };

    dispatch(addItem(item));
  }

  return (
    <div className="container">
      <div className={styles.pizzaBlock}>
        <div className={styles.leftSide}>
          <img src={pizza.imageUrl} alt="Пицца" className={styles.pizzaImage} />
        </div>
        <div className={styles.rightSide}>
          <div>
            <a
              href="/"
              className={`${styles.backHomeButton} button button--outline button--add go-back-btn`}
            >
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <Link to="/">
                <span>Вернуться назад</span>
              </Link>
            </a>
            <h1 className={styles.title}>{pizza.title}</h1>
            <span
              className={styles.options}
            >{`${pizza.sizes[sizeNumber]}см, ${types[typeNumber]} тесто`}</span>
          </div>
          <div className="pizza-block__selector">
            <ul>
              {pizza.types.map((type, index) => (
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
              {pizza.sizes.map((size, index) => (
                <li
                  key={index}
                  className={`${sizeNumber === index ? "active" : ""}`}
                  onClick={() => setSizeNumber(index)}
                >
                  {`${size} см`}
                </li>
              ))}
            </ul>
          </div>

          <button className={styles.buttonStyle} onClick={addToCart}>
            Добавить в корзину за {pizza.price} руб
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaDescription;
