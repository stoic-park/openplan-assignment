import { Button } from 'ui';
import styles from './page.module.css';
import Link from 'next/link';

export default function ResultPage() {
  // 실제 구현에서는 API 데이터를 가져와서 표시할 예정
  const mockData = {
    id: '0',
    author: 'Alejandro Escamilla',
    width: '5000',
    height: '3333',
    url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
    download_url: 'https://picsum.photos/id/0/5000/3333',
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src={mockData.download_url}
            alt={`Photo by ${mockData.author}`}
            className={styles.image}
          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.infoWrapper}>
            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>id</span>
                <span className={styles.infoValue}>{mockData.id}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>author</span>
                <span className={styles.infoValue}>{mockData.author}</span>
              </div>
            </div>
            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>width</span>
                <span className={styles.infoValue}>{mockData.width}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>height</span>
                <span className={styles.infoValue}>{mockData.height}</span>
              </div>
            </div>
            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>url</span>
                <span className={styles.infoValue}>
                  <a
                    href={mockData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {mockData.url}
                  </a>
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>download_url</span>
                <span className={styles.infoValue}>
                  <a
                    href={mockData.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {mockData.download_url}
                  </a>
                </span>
              </div>
            </div>
            <Link href="/" className={styles.buttonLink}>
              <Button>확인</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
