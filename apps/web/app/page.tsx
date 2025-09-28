'use client';

import { Button } from 'ui';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { usePhotoStore } from './stores/photoStore';
import { useState, useCallback, useEffect } from 'react';

export default function Home() {
  const name = '박성택';
  const router = useRouter();
  const { setCurrentPhotoId, addVisitedPhotoId, visitedPhotoIds } =
    usePhotoStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showAutoNavMessage, setShowAutoNavMessage] = useState(false);

  // 버튼 클릭 핸들러 - 스로틀링 적용
  const handleButtonClick = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      const photoId = '0';
      setCurrentPhotoId(photoId);
      addVisitedPhotoId(photoId);

      // 로딩 애니메이션을 위한 지연
      setTimeout(() => {
        router.push('/result');
      }, 800);
    }
  }, [isLoading, setCurrentPhotoId, addVisitedPhotoId, router]);

  // 사진 조회 이력이 있을 경우 자동으로 결과 페이지로 이동
  useEffect(() => {
    let timer: NodeJS.Timeout;

    // 페이지 로드 후 사진 조회 이력이 있으면 자동 네비게이션 시작
    if (visitedPhotoIds.length > 0 && !isLoading) {
      setShowAutoNavMessage(true);

      // 먼저 최근 사진 ID 설정
      const latestPhotoId = visitedPhotoIds[visitedPhotoIds.length - 1];
      setCurrentPhotoId(latestPhotoId);

      // 2초 후에 결과 페이지로 이동
      timer = setTimeout(() => {
        router.push('/result');
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>안녕하세요</h1>
          <p className={styles.description}>{`${name} 입니다.`}</p>
          {showAutoNavMessage && visitedPhotoIds.length > 0 && (
            <p className={styles.autoNavigateInfo}>
              이전에 조회한 사진이 있습니다. 잠시 후 결과 페이지로 이동합니다...
            </p>
          )}
        </div>
        <div className={styles.buttonSection}>
          <Button
            onClick={handleButtonClick}
            isLoading={isLoading || showAutoNavMessage}
            disabled={showAutoNavMessage}
          >
            {isLoading
              ? '로딩 중...'
              : showAutoNavMessage
                ? '이동 중...'
                : '다음'}
          </Button>
        </div>
      </div>
    </main>
  );
}
