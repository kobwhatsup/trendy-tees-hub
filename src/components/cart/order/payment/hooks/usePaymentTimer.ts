import { useRef, useState } from "react";

export const usePaymentTimer = () => {
  const [remainingTime, setRemainingTime] = useState(300); // 5分钟有效期
  const pollIntervalRef = useRef<NodeJS.Timeout>();
  const pollTimeoutRef = useRef<NodeJS.Timeout>();

  const clearIntervals = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }
    if (pollTimeoutRef.current) {
      clearTimeout(pollTimeoutRef.current);
    }
  };

  const updateRemainingTime = (startTime: number) => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const remaining = Math.max(300 - elapsedTime, 0);
    setRemainingTime(remaining);
    return remaining;
  };

  const formatRemainingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    remainingTime,
    pollIntervalRef,
    pollTimeoutRef,
    clearIntervals,
    updateRemainingTime,
    formatRemainingTime,
  };
};