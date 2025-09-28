import { Button } from 'ui';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  const name = '박성택';

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>안녕하세요</h1>
          <p className={styles.description}>{`${name} 입니다.`}</p>
        </div>
        <div className={styles.buttonSection}>
          <Link href="/result">
            <Button>다음</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
