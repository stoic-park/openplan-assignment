'use client';

import { Button } from 'ui';
import styles from './page.module.css';
import { usePhotoData } from '../hooks/usePhoto';
import { usePhotoStore } from '../stores/photoStore';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Skeleton from '../components/Skeleton';

export default function ResultPage() {
  const router = useRouter();
  const { currentPhotoId, visitedPhotoIds } = usePhotoStore();
  const { data: photoData, isLoading, error } = usePhotoData(currentPhotoId);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState<string | null>(null);

  // 사진 조회 이력이 없을 경우 메인 페이지로 리다이렉트
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (visitedPhotoIds.length === 0) {
      setRedirectMessage(
        '사진 조회 이력이 없습니다. 메인 페이지로 이동합니다...'
      );

      timer = setTimeout(() => {
        router.push('/');
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 버튼 클릭 핸들러
  const handleButtonClick = useCallback(() => {
    if (!isButtonLoading) {
      setIsButtonLoading(true);

      // 로딩 애니메이션을 위한 지연
      setTimeout(() => {
        router.push('/');
      }, 800);
    }
  }, [isButtonLoading, router]);

  if (redirectMessage) {
    return (
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.redirectContainer}>
            <p className={styles.redirectMessage}>{redirectMessage}</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
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
          {isLoading ? (
            <Skeleton type="image" className={styles.image} />
          ) : (
            <img
              src={photoData?.download_url}
              alt={`Photo by ${photoData?.author}`}
              className={styles.image}
            />
          )}
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.infoWrapper}>
            {isLoading ? (
              <>
                <Skeleton type="infoSection" />
                <Skeleton type="infoSection" />
                <Skeleton type="infoSectionLarge" />
                <div className={styles.buttonLink}>
                  <Button disabled>확인</Button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.infoSection}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>id</span>
                    <span className={styles.infoValue}>{photoData?.id}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>author</span>
                    <span className={styles.infoValue}>
                      {photoData?.author}
                    </span>
                  </div>
                </div>
                <div className={styles.infoSection}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>width</span>
                    <span className={styles.infoValue}>{photoData?.width}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>height</span>
                    <span className={styles.infoValue}>
                      {photoData?.height}
                    </span>
                  </div>
                </div>
                <div className={styles.infoSection}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>url</span>
                    <span className={styles.infoValue}>
                      <a
                        href={photoData?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {photoData?.url}
                      </a>
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>download_url</span>
                    <span className={styles.infoValue}>
                      <a
                        href={photoData?.download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {photoData?.download_url}
                      </a>
                    </span>
                  </div>
                </div>
                <div className={styles.buttonLink}>
                  <Button
                    onClick={handleButtonClick}
                    isLoading={isButtonLoading}
                  >
                    {isButtonLoading ? '로딩 중...' : '확인'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
