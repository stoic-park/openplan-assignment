import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  type:
    | 'image'
    | 'infoSection'
    | 'infoSectionLarge'
    | 'visitHistorySection'
    | 'text'
    | 'title';
  className?: string;
}

export default function Skeleton({ type, className = '' }: SkeletonProps) {
  return <div className={`${styles.skeleton} ${styles[type]} ${className}`} />;
}
