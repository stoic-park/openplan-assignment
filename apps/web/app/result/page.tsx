'use client';

import { Button } from 'ui';
import styles from './page.module.css';
import Link from 'next/link';
import { usePhotoData } from '../hooks/usePhoto';
import { usePhotoStore } from '../stores/photoStore';
import { useEffect } from 'react';

export default function ResultPage() {
  const { currentPhotoId, visitedPhotoIds } = usePhotoStore();
  const { data: photoData, isLoading, error } = usePhotoData(currentPhotoId);

  useEffect(() => {
    // 방문 기록 로그
    console.log('방문한 사진 ID 목록:', visitedPhotoIds);
  }, [visitedPhotoIds]);

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
            <p>{error?.message || '사진 정보를 불러올 수 없습니다.'}</p>
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
            <div className={styles.visitHistorySection}>
              <p className={styles.visitHistoryTitle}>방문 기록</p>
              <p className={styles.visitHistoryText}>
                {visitedPhotoIds.length > 0
                  ? `지금까지 ${visitedPhotoIds.length}개의 사진을 보셨습니다.`
                  : '아직 방문 기록이 없습니다.'}
              </p>
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
