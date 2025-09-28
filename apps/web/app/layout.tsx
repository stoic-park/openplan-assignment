import type { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: '오픈플랜 과제',
  description: '사진 조회 웹 애플리케이션',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const name = '박성택';

  return (
    <html lang="ko">
      <body>
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.headerContent}>{name}</div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
