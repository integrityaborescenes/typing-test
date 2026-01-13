import styles from "./Key.module.scss";

type Key = {
  code: string;
  label: string;
};

type Props = {
  keys: Key[];
  keyPressed?: string[];
};

const Key = ({ keys, keyPressed }: Props) => {
  return (
    <div className={styles.row}>
      {keys.map((key) => (
        <button
          className={`${keyPressed?.includes(key.label) ? styles.buttonPress : ""}`}
          key={key.label}
        >
          {key.label}
        </button>
      ))}
    </div>
  );
};

export default Key;
