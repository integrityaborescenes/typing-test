import styles from "./InputText.module.scss";
import { useGetTextQuery } from "../../store/services/text.api.ts";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { start } from "../../store/slices/isUserStartsTypingSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store.ts";

const InputText = () => {
  const { data } = useGetTextQuery();
  const [lengthByTimer, setLengthByTimer] = useState<number>(250);

  let text = data?.split("") || [];
  let lastWord = text.lastIndexOf(" ", lengthByTimer);
  let filteredText = text.slice(0, lastWord);

  const dispatch = useDispatch<AppDispatch>();

  const [value, setValue] = useState<string[]>([]);
  const [errors, setErrors] = useState<number>(0);
  const maxIndex = useRef<number>(0);

  const selectedTimer = useSelector(
    (state: RootState) => state.timerSelectSlice.value,
  );

  const isUserStarts = useSelector(
    (state: RootState) => state.isUserStarts.value,
  );

  useEffect(() => {
    if (selectedTimer === 60) {
      setLengthByTimer(400);
    } else {
      setLengthByTimer(250);
    }
  }, [selectedTimer]);

  const typingText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let currentValue = e.target.value;

    if (currentValue) {
      dispatch(start());
    }

    setValue(currentValue.split(""));
  };

  useEffect(() => {
    if (!isUserStarts) {
      setValue([]);
    }
  }, [isUserStarts]);

  const countErrors = () => {
    maxIndex.current = Math.max(maxIndex.current, value.length);

    if (
      value[value.length - 1] !== filteredText[value.length - 1] &&
      maxIndex.current === value.length
    ) {
      setErrors((prev) => prev + 1);
    }
  };

  useEffect(() => {
    countErrors();
  }, [value]);
  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {filteredText.map((t, i) => (
          <span
            key={i}
            className={`${value.length === i ? styles.markCurrent : ""} ${!value[i] ? "" : value[i] !== t ? styles.error : styles.true}`}
          >
            {t}
          </span>
        ))}
      </div>
      <textarea
        className={styles.textArea}
        value={value.join("")}
        autoFocus
        onChange={typingText}
      />
    </div>
  );
};

export default InputText;
