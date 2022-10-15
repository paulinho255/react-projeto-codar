import React from "react";
import styles from "./Container.module.css";

/**
 * utilização de customclass para permitir a importação de classes css customizada.
 */
function Container(props) {
  return (
    <div className={`${styles.container} ${styles[props.customClass]}`}>
      {props.children}
    </div>
  );
}

export default Container;
