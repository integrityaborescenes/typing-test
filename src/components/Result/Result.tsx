import styles from "./Result.module.scss";

type Props = {
  wpm?: number;
  accuracy?: number;
};

const Result = ({ wpm, accuracy }: Props) => {
  return (
    <div className={styles.resultCont}>
      <div className={styles.result}>
        <p>{`${wpm} WPM`}</p>
        <p>{`${accuracy}% Accuracy`}</p>
      </div>
    </div>
  );
};

export default Result;
