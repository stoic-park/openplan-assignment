'use client';

import { Button } from 'ui';
import styles from './page.module.css';
import { usePhotoData } from '../hooks/usePhoto';
import { usePhotoStore } from '../stores/photoStore';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from '../utils/debounceThrottle';

export default function ResultPage() {
  const router = useRouter();
  const { currentPhotoId, visitedPhotoIds } = usePhotoStore();
  const { data: photoData, isLoading, error } = usePhotoData(currentPhotoId);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    // 방문 기록 로그
    console.log('방문한 사진 ID 목록:', visitedPhotoIds);
  }, [visitedPhotoIds]);

  // 디바운스 적용된 버튼 클릭 핸들러
  const debouncedButtonClick = useCallback(
    debounce(() => {
      setIsButtonLoading(true);

      // 로딩 애니메이션을 위한 지연
      setTimeout(() => {
        router.push('/');
      }, 800);
    }, 500),
    [router]
  );

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isButtonLoading) {
      debouncedButtonClick();
    }
  };

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
            <div className={styles.buttonLink}>
              <Button onClick={handleButtonClick} isLoading={isButtonLoading}>
                메인으로 돌아가기
              </Button>
            </div>
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
            <div className={styles.buttonLink}>
              <Button onClick={handleButtonClick} isLoading={isButtonLoading}>
                {isButtonLoading ? '로딩 중...' : '확인'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
