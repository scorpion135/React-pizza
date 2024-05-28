import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, MainLayout } from "./components/index";

import "./App.css";
import "./scss/app.scss";
import "./pages/home/home.scss";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/cart/Cart")
);

const PizzaDescription = React.lazy(
  () =>
    import(
      /* webpackChunkName: "PizzaDescription" */ "./pages/pizzaDescription/PizzaDescription"
    )
);

const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/notFound/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<div>Идет загрузка пиццы ... </div>}>
              <PizzaDescription />
            </React.Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Идет загрузка корзины ... </div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div>Идет загрузка ... </div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
