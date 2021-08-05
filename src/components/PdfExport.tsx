import React, { RefObject, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HeadOptions } from '../types';
import { mergeOptions } from '../utils/common-utils';

interface PdfExportProps {
   containerRef: RefObject<HTMLIFrameElement>;
   options?: HeadOptions;
}

const PdfExport: React.FC<PdfExportProps> = ({ containerRef, options, children }) => {
   useEffect(() => {
      if (!containerRef.current) {
         return;
      }

      const mergedOptions = mergeOptions(options);

      const mountNode = containerRef.current.contentWindow.document;
      
      mergedOptions.styles.forEach(styleHref => {
         const linkElement = mountNode.createElement('link');

         linkElement.type = 'text/css';
         linkElement.rel = 'stylesheet';
         linkElement.href = styleHref;
         mountNode.head.appendChild(linkElement);
      });
      mergedOptions.scripts.forEach(scriptSrc => {
         const scriptElement = mountNode.createElement('script');

         scriptElement.src = scriptSrc;
         mountNode.head.appendChild(scriptElement);
      });

      const pdfContainer = mountNode.createElement('div');
      mountNode.body.appendChild(pdfContainer);

      ReactDOM.render(children, pdfContainer);
   }, [options]);

   return (
      <iframe ref={containerRef} title='hahha' />
   )
}

export default PdfExport;
