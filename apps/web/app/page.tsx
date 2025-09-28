'use client';

import { Button } from 'ui';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { usePhotoStore } from './stores/photoStore';
import { useState, useCallback } from 'react';
import { throttle } from './utils/debounceThrottle';

export default function Home() {
  const name = '박성택';
  const router = useRouter();
  const { setCurrentPhotoId, addVisitedPhotoId } = usePhotoStore();
  const [isLoading, setIsLoading] = useState(false);

  // 스로틀링 적용된 버튼 클릭 핸들러
  const throttledButtonClick = useCallback(
    throttle(() => {
      setIsLoading(true);
      const photoId = '0';
      setCurrentPhotoId(photoId);
      addVisitedPhotoId(photoId);

      // 로딩 애니메이션을 위한 지연
      setTimeout(() => {
        router.push('/result');
      }, 800);
    }, 1000),
    [router, setCurrentPhotoId, addVisitedPhotoId]
  );

  const handleButtonClick = () => {
    if (!isLoading) {
      throttledButtonClick();
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>안녕하세요</h1>
          <p className={styles.description}>{`${name} 입니다.`}</p>
        </div>
        <div className={styles.buttonSection}>
          <Button onClick={handleButtonClick} isLoading={isLoading}>
            {isLoading ? '로딩 중...' : '다음'}
          </Button>
        </div>
      </div>
    </main>
  );
}
