import styles from "./Keyboard.module.scss";
import { topRowKeys } from "../../utils/keyboardKeys.ts";
import { middleRowKeys } from "../../utils/keyboardKeys.ts";
import { bottomRowKeys } from "../../utils/keyboardKeys.ts";
import { useEffect, useState } from "react";

const Keyboard = () => {
  const [pressedKeyButton, setPressedKeyButton] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setPressedKeyButton(key);
    };

    const handleKeyUp = () => {
      setPressedKeyButton("");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  console.log(pressedKeyButton);

  return (
    <div className={styles.keyboardContainer}>
      <div className={styles.keyboard}>
        <div className={styles.row}>
          {topRowKeys.map((keys, i) => (
            <button
              className={`${pressedKeyButton === keys.label ? styles.buttonPress : ""}`}
              key={i}
            >
              {keys.label}
            </button>
          ))}
        </div>
        <div className={styles.row}>
          {middleRowKeys.map((keys, i) => (
            <button
              className={`${pressedKeyButton === keys.label ? styles.buttonPress : ""}`}
              key={i}
            >
              {keys.label}
            </button>
          ))}
        </div>
        <div className={styles.row}>
          {bottomRowKeys.map((keys, i) => (
            <button
              className={`${pressedKeyButton === keys.label ? styles.buttonPress : ""}`}
              key={i}
            >
              {keys.label}
            </button>
          ))}
        </div>
        <div className={styles.spaceButton}></div>
      </div>
    </div>
  );
};

export default Keyboard;
