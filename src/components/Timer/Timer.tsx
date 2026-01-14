import styles from "./Timer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store.ts";
import { full, half } from "../../store/slices/timerSelectSlice.ts";
import { useEffect, useState } from "react";
import { stop } from "../../store/slices/isUserStartsTypingSlice.ts";
import { end, notend } from "../../store/slices/isUserEndSlice.ts";
import { useGetTextQuery } from "../../store/services/text.api.ts";

const Timer = () => {
  const { refetch } = useGetTextQuery();
  const dispatch = useDispatch<AppDispatch>();

  const selectedTimer = useSelector(
    (state: RootState) => state.timerSelectSlice.value,
  );

  const [timeLeft, setTimeLeft] = useState<number>(selectedTimer);

  const isUserStarts = useSelector(
    (state: RootState) => state.isUserStarts.value,
  );

  const isUserEnd = useSelector((state: RootState) => state.isEndSlice.value);

  useEffect(() => {
    setTimeLeft(selectedTimer);
  }, [selectedTimer]);

  useEffect(() => {
    if (!isUserStarts || timeLeft === 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          clearInterval(timerId);
          return 0;
        }
        return prev - 10;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isUserStarts]);

  useEffect(() => {
    if (timeLeft === 0 && isUserStarts) dispatch(end());
  }, [timeLeft, isUserStarts]);

  return (
    <div className={styles.timerCont}>
      <div className={styles.selectTimer}>
        <button
          className={`${selectedTimer === 30 ? styles.selectedTimer : ""}`}
          onClick={() => {
            dispatch(half());
            dispatch(stop());
            dispatch(notend());
          }}
        >
          30s
        </button>
        <button
          className={`${selectedTimer === 60 ? styles.selectedTimer : ""}`}
          onClick={() => {
            dispatch(full());
            dispatch(stop());
            dispatch(notend());
          }}
        >
          60s
        </button>
      </div>
      <div
        className={`${styles.timer} ${timeLeft < 11 && !isUserEnd ? styles.ending : ""}`}
      >
        {`${timeLeft > 59 ? "01:00" : timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`}`}
      </div>
      <div className={styles.resetButton}>
        <button
          onClick={() => {
            refetch();
            dispatch(stop());
            dispatch(notend());
            setTimeLeft(selectedTimer);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
