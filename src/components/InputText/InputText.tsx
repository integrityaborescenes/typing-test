import styles from "./InputText.module.scss";
import { useGetTextQuery } from "../../store/services/text.api.ts";
import { type ChangeEvent, useState } from "react";

const InputText = () => {
  const { data } = useGetTextQuery();
  let text = data?.[0].toLowerCase().split("") || [];
  let lastWord = text.lastIndexOf(" ", 250);
  let filteredText = text.slice(0, lastWord);

  const [value, setValue] = useState<string[]>([]);

  const typingText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let currentValue = e.target.value;
    setValue(currentValue.split(""));
  };

  console.log(value[value.length - 1]);
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {filteredText.map((t, i) => (
          <span
            className={`${!value[i] ? "" : value[i] === t ? styles.true : styles.error}`}
          >
            {t}
          </span>
        ))}
      </div>
      <textarea className={styles.textArea} onChange={typingText} />
    </div>
  );
};

export default InputText;
