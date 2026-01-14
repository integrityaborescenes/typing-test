import styles from "./Result.module.scss";

type Props = {
  errors?: number;
};

const Result = ({ errors }: Props) => {
  return (
    <div className={styles.resultCont}>
      <div className={styles.result}>
        <p>{errors}</p>
        <p>456</p>
      </div>
    </div>
  );
};

export default Result;
