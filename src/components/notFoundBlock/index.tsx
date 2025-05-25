import styles from './notFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Nothing Found
      </h1>
      <p className={styles.description}>
        Unfortunately, this page does not exist in our vape store.
      </p>
    </div>
  );
};
