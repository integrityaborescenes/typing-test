import styles from "./Keyboard.module.scss";
import { topRowKeys } from "../../utils/keyboardKeys.ts";
import { middleRowKeys } from "../../utils/keyboardKeys.ts";
import { bottomRowKeys } from "../../utils/keyboardKeys.ts";
import { useEffect, useState } from "react";
import Key from "../Key/Key.tsx";

const Keyboard = () => {
  const [pressedKeyButton, setPressedKeyButton] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      setPressedKeyButton((prev) => [...prev, key].slice(-12));
      setTimeout(() => {
        setPressedKeyButton((prev) => prev.filter((k) => k !== key));
      }, 300);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  console.log(pressedKeyButton);

  return (
    <div className={styles.keyboardContainer}>
      <div className={styles.keyboard}>
        <Key keys={topRowKeys} keyPressed={pressedKeyButton} />
        <Key keys={middleRowKeys} keyPressed={pressedKeyButton} />
        <Key keys={bottomRowKeys} keyPressed={pressedKeyButton} />
        <div className={styles.spaceButton}></div>
      </div>
    </div>
  );
};

export default Keyboard;
