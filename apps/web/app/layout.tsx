import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '오픈플랜 과제',
  description: '사진 조회 웹 애플리케이션',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
