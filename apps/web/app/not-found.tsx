'use client';

import Link from 'next/link';
import { Button } from 'ui';
import styles from './not-found.module.css';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    // 헤더 숨기기
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'none';
    }

    // 컴포넌트가 언마운트될 때 헤더 다시 표시
    return () => {
      const header = document.querySelector('header');
      if (header) {
        header.style.display = 'flex';
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>페이지를 찾을 수 없습니다</h2>
      <p className={styles.description}>
        요청하신 페이지가 존재하지 않거나, 삭제되었거나, 주소가 변경되었을 수
        있습니다.
      </p>
      <div className={styles.buttonWrapper}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button>메인으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}
