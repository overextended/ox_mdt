import React from 'react';
import { useIntersection } from '@mantine/hooks';

export const useInfiniteScroll = (onIntersect: () => void) => {
  const lastElementRef = React.useRef(null);
  const { ref, entry } = useIntersection({
    root: lastElementRef.current,
    threshold: 1,
  });

  React.useEffect(() => {
    if (entry && entry.isIntersecting) {
      onIntersect();
    }
  }, [entry]);

  return { ref };
};
