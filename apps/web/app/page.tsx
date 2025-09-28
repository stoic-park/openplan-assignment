import { Button } from 'ui';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>오픈플랜 과제</h1>
      <p className={styles.description}>사진 조회 웹 애플리케이션</p>
      <div className={styles.buttonContainer}>
        <Button>사진 조회하기</Button>
      </div>
    </main>
  );
}