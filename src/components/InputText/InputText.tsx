import styles from "./InputText.module.scss";
import { useGetTextQuery } from "../../store/services/text.api.ts";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { start } from "../../store/slices/isUserStartsTypingSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store.ts";
import { end } from "../../store/slices/isUserEndSlice.ts";
import Result from "../Result/Result.tsx";

const InputText = () => {
  const { data } = useGetTextQuery();
  const [lengthByTimer, setLengthByTimer] = useState<number>(250);

  let text = data?.split("") || [];
  let lastWord = text.lastIndexOf(".", lengthByTimer);
  let filteredText = text.slice(0, lastWord + 1);

  const dispatch = useDispatch<AppDispatch>();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string[]>([]);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const maxIndex = useRef<number>(0);

  const selectedTimer = useSelector(
    (state: RootState) => state.timerSelectSlice.value,
  );

  const isUserStarts = useSelector(
    (state: RootState) => state.isUserStarts.value,
  );

  const isUserEnd = useSelector((state: RootState) => state.isEndSlice.value);

  useEffect(() => {
    if (selectedTimer === 60) {
      setLengthByTimer(400);
    } else {
      setLengthByTimer(250);
    }
  }, [selectedTimer]);

  const typingText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (isUserEnd) return;

    let currentValue = e.target.value;

    if (currentValue.split("").length === filteredText.length) {
      dispatch(end());
      return;
    }

    if (currentValue) {
      dispatch(start());
    }

    setValue(currentValue.split(""));
  };

  useEffect(() => {
    if (!isUserStarts) {
      setValue([]);
    }
    if (isUserEnd) {
      setValue([]);
    }
  }, [isUserStarts, isUserEnd]);

  const countErrors = () => {
    maxIndex.current = Math.max(maxIndex.current, value.length);

    if (
      value[value.length - 1] !== filteredText[value.length - 1] &&
      maxIndex.current === value.length
    ) {
      setErrors((prev) => prev + 1);
    }
    setAccuracy(
      Math.round(((maxIndex.current - errors) / maxIndex.current) * 100),
    );
  };

  useEffect(() => {
    countErrors();
    setWpm(Math.round(maxIndex.current / 5 / (selectedTimer / 60)));
  }, [value]);

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
        ref={inputRef}
        className={styles.textArea}
        value={value.join("")}
        autoFocus
        onChange={typingText}
        onBlur={() => inputRef.current?.focus()}
      />
      {isUserEnd && <Result wpm={wpm} accuracy={accuracy} />}
    </div>
  );
};

export default InputText;
