import { useCallback, useRef } from 'react'

export default () => {
   const containerRef = useRef<HTMLIFrameElement>();

   const generatePdf = useCallback(() => {
      if (!containerRef.current) {
         return;
      };

      containerRef.current.contentWindow.print();
   }, [containerRef]);

   return { generatePdf, containerRef };
}
