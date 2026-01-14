import styles from "./Result.module.scss";

type Props = {
  errors?: number;
  accuracy?: number;
};

const Result = ({ errors, accuracy }: Props) => {
  return (
    <div className={styles.resultCont}>
      <div className={styles.result}>
        <p>{errors}</p>
        <p>{accuracy}</p>
      </div>
    </div>
  );
};

export default Result;
