import styles from "./InputText.module.scss";
import { useGetTextQuery } from "../../store/services/text.api.ts";
import { type ChangeEvent, useEffect, useState } from "react";

const InputText = () => {
  const { data } = useGetTextQuery();
  let text = data?.[0].replace(/\s+/g, " ").split("") || [];
  let lastWord = text.lastIndexOf(" ", 250);
  let filteredText = text.slice(0, lastWord);

  const [value, setValue] = useState<string[]>([]);
  const [errors, setErrors] = useState<number>(0);

  const typingText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let currentValue = e.target.value;
    setValue(currentValue.split(""));
  };

  const countErrors = () => {
    if (value[value.length - 1] !== filteredText[value.length - 1]) {
      setErrors((prev) => prev + 1);
      console.log(value[value.length - 1], filteredText[value.length - 1]);
    }
  };

  useEffect(() => {
    countErrors();
  }, [value]);

  console.log(errors);

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
