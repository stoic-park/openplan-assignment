import styles from './layout.module.css';

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.resultContainer} result-page`}>
      <div className={styles.backgroundLayer}>
        <div className={styles.imageBackground}></div>
        <div className={styles.noiseLayer}></div>
      </div>
      {children}
    </div>
  );
}
