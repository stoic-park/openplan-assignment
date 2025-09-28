'use client';

import { Button } from 'ui';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { usePhotoStore } from './stores/photoStore';

export default function Home() {
  const name = '박성택';
  const router = useRouter();
  const { setCurrentPhotoId, addVisitedPhotoId } = usePhotoStore();

  const handleButtonClick = () => {
    const photoId = '0';
    setCurrentPhotoId(photoId);
    addVisitedPhotoId(photoId);
    router.push('/result');
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>안녕하세요</h1>
          <p className={styles.description}>{`${name} 입니다.`}</p>
        </div>
        <div className={styles.buttonSection}>
          <Button onClick={handleButtonClick}>다음</Button>
        </div>
      </div>
    </main>
  );
}
