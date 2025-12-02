import { useState, useCallback, useEffect } from 'react';

export const useVisualization = () => {
  const [current, setCurrent] = useState('OperationsOverview');
  const [data, setData] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const setVisualization = useCallback((type, vizData = null) => {
    if (type === current && !vizData) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(type);
      setData(vizData);
      setIsAnimating(false);
    }, 300);
  }, [current]);

  return { current, data, isAnimating, setVisualization };
};
