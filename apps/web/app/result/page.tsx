'use client';

import { Button } from 'ui';
import styles from './page.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PhotoData {
  id: string;
  author: string;
  width: string;
  height: string;
  url: string;
  download_url: string;
}

export default function ResultPage() {
  const [photoData, setPhotoData] = useState<PhotoData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotoData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://picsum.photos/id/0/info');

        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }

        const data = await response.json();
        setPhotoData(data);
        setError(null);
      } catch (err) {
        console.error('사진 데이터를 가져오는 중 오류 발생:', err);
        setError('사진 정보를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotoData();
  }, []);

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.loadingContainer}>
            <p>사진 정보를 불러오는 중...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !photoData) {
    return (
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.errorContainer}>
            <p>{error || '사진 정보를 불러올 수 없습니다.'}</p>
            <Link href="/" className={styles.buttonLink}>
              <Button>메인으로 돌아가기</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src={photoData.download_url}
            alt={`Photo by ${photoData.author}`}
            className={styles.image}
          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.infoWrapper}>
            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>id</span>
                <span className={styles.infoValue}>{photoData.id}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>author</span>
                <span className={styles.infoValue}>{photoData.author}</span>
              </div>
            </div>
            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>width</span>
                <span className={styles.infoValue}>{photoData.width}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>height</span>
                <span className={styles.infoValue}>{photoData.height}</span>
              </div>
            </div>
            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>url</span>
                <span className={styles.infoValue}>
                  <a
                    href={photoData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {photoData.url}
                  </a>
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>download_url</span>
                <span className={styles.infoValue}>
                  <a
                    href={photoData.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {photoData.download_url}
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
