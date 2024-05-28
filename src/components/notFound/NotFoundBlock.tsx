import React from "react";

import styles from "./notFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <span>🙁</span>
      <br />
      <h1>Ничего не найдено</h1>
      <p className={styles.description}>
        К сожалению, данная страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
};
