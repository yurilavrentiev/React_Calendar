import React, { useContext } from "react";
import GlobalContext from "../Context/GlobalContext";
import styles from "./Labels.module.css";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className={styles.text}>Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className={styles.label}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={styles.checkbox}
            style={{ accentColor: lbl }}
          />
          <span className={styles.color}>{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );
}
