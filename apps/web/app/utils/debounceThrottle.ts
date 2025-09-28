/**
 * 디바운스 함수
 * 연속된 호출에서 마지막 호출 후 일정 시간이 지난 후에만 함수를 실행
 * @param func 실행할 함수
 * @param wait 대기 시간(ms)
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * 스로틀 함수
 * 일정 시간 동안 최대 한 번만 함수를 실행
 * @param func 실행할 함수
 * @param limit 제한 시간(ms)
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function (...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
