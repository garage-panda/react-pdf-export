import { useCallback, useRef } from 'react';

export default (): any => {
  const iframeRef = useRef<HTMLIFrameElement>();
  const populateRef = useRef<() => void>(null);

  const generatePdf = useCallback(() => {
    if (!iframeRef.current) {
      return;
    }

    const isLazyLoad = !!populateRef.current;
    if (isLazyLoad) {
      populateRef.current();
    } else {
      iframeRef.current.contentWindow.print();
    }
  }, [iframeRef]);

  return {
    generatePdf,
    containerRef: {
      iframeRef,
      populateRef,
    },
  };
};
