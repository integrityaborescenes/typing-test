import styles from "./InputText.module.scss";
import { useGetTextQuery } from "../../store/services/text.api.ts";
import { type ChangeEvent, useState } from "react";

const InputText = () => {
  const { data } = useGetTextQuery();
  let text = data?.[0].toLowerCase().split("") || [];
  let lastWord = text.lastIndexOf(" ", 250);
  let filteredText = text.slice(0, lastWord);

  const [value, setValue] = useState<string[]>([]);
  // const [errors, setErrors] = useState<number>(0);

  const typingText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let currentValue = e.target.value;
    setValue(currentValue.split(""));
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {filteredText.map((t, i) => (
          <span
            key={i}
            className={`${value[i - 1] && !value[i] ? styles.markCurrent : ""} ${!value[i] ? "" : value[i] !== t ? styles.error : styles.true}`}
          >
            {t}
          </span>
        ))}
      </div>
      <textarea className={styles.textArea} autoFocus onChange={typingText} />
    </div>
  );
};

export default InputText;
