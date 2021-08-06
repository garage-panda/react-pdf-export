import { useCallback, useRef } from 'react'

export default () => {
   const iframeRef = useRef<HTMLIFrameElement>();
   const populateRef = useRef<() => void>(null);

   const generatePdf = useCallback(() => {
      if (!iframeRef.current) {
         return;
      };
      const isLazyLoad = !!populateRef.current;

      if(isLazyLoad) {
         populateRef.current();
      }

      iframeRef.current.contentWindow.print();

      if (isLazyLoad) {
         const mountNode = iframeRef.current.contentWindow.document;
         mountNode.head.innerHTML = '';
         mountNode.body.innerHTML = '';
      }
   }, [iframeRef]);

   return { generatePdf, containerRef: {
      iframeRef, populateRef
   } };
}
