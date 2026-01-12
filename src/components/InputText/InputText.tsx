import styles from "./InputText.module.scss";
import { useGetTextQuery } from "../../store/services/text.api.ts";

const InputText = () => {
  const { data } = useGetTextQuery();
  let text = data?.[0].toLowerCase().split("") || [];
  let lastWord = text.lastIndexOf(" ", 250);
  let filteredText = text.slice(0, lastWord);
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {filteredText.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
      <textarea className={styles.textArea} />
    </div>
  );
};

export default InputText;
