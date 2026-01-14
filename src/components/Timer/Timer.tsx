import styles from "./Timer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store.ts";
import { full, half } from "../../store/slices/timerSelectSlice.ts";
import { useEffect, useState } from "react";
import { stop } from "../../store/slices/isUserStartsTypingSlice.ts";

const Timer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedTimer = useSelector(
    (state: RootState) => state.timerSelectSlice.value,
  );

  const [timeLeft, setTimeLeft] = useState<number>(selectedTimer);

  const isUserStarts = useSelector(
    (state: RootState) => state.isUserStarts.value,
  );

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
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isUserStarts]);

  return (
    <div className={styles.timerCont}>
      <div className={styles.selectTimer}>
        <button
          className={`${selectedTimer === 30 ? styles.selectedTimer : ""}`}
          onClick={() => {
            dispatch(half());
            dispatch(stop());
          }}
        >
          30s
        </button>
        <button
          className={`${selectedTimer === 60 ? styles.selectedTimer : ""}`}
          onClick={() => {
            dispatch(full());
            dispatch(stop());
          }}
        >
          60s
        </button>
      </div>
      <div className={styles.timer}>{`${timeLeft}`}</div>
      <div className={styles.resetButton}>
        <button>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
