import React, { MutableRefObject, RefObject, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HeadOptions } from '../types';
import { mergeOptions } from '../utils/common-utils';
import '../css/index.css';
import { useAwaitDomRender } from "@garage-panda/use-await-dom-render";
interface PdfExportProps {
   containerRef: {
      iframeRef: RefObject<HTMLIFrameElement>;
      populateRef: MutableRefObject<() => void>;
   };
   className?: string;
   showInDom?: boolean;
   options?: HeadOptions;
   lazyLoad?: boolean;
}

const PdfExport: React.FC<PdfExportProps> = ({ containerRef, className, showInDom = true, options, lazyLoad = false, children }) => {

   const [observer, startWait] = useAwaitDomRender();

   const attachObserverListener = (mountNode: Document, pdfContainer: HTMLDivElement) => {
   
      observer.on('load', () => {
         observer.removeListeners();
         containerRef.iframeRef.current.contentWindow.print();

         mountNode.head.innerHTML = '';
         mountNode.body.innerHTML = '';
      });

      startWait(pdfContainer);
   };

   const populateChildren = (mountNode: Document) => {
      const pdfContainer = mountNode.createElement('div');
      mountNode.body.appendChild(pdfContainer);

      if (lazyLoad) {
         attachObserverListener(mountNode, pdfContainer);
      }

      ReactDOM.render(children, pdfContainer);
   };

   useEffect(() => {
      if (!lazyLoad) {
         return;
      }
      const mountNode = containerRef.iframeRef.current.contentWindow.document;
      containerRef.populateRef.current = function () { 
         populateChildren(mountNode);
      };
   }, [lazyLoad])

   useEffect(() => {
      if (!containerRef.iframeRef.current) {
         return;
      }

      const { includeParentStyles, styles, scripts} = mergeOptions(options);

      const mountNode = containerRef.iframeRef.current.contentWindow.document;

      if (includeParentStyles) {
         const parentStyles = document.querySelectorAll("style");
         parentStyles.forEach((style) => {
            const clone = style.cloneNode(true);
            mountNode.head.appendChild(clone);
         });
      }
      
      styles.forEach(styleHref => {
         const linkElement = mountNode.createElement('link');

         linkElement.type = 'text/css';
         linkElement.rel = 'stylesheet';
         linkElement.href = styleHref;
         mountNode.head.appendChild(linkElement);
      });
      scripts.forEach(scriptSrc => {
         const scriptElement = mountNode.createElement('script');

         scriptElement.src = scriptSrc;
         mountNode.head.appendChild(scriptElement);
      });

      if (!lazyLoad) {
         populateChildren(mountNode);
      }

      return () => {
         mountNode.head.innerHTML = '';
         mountNode.body.innerHTML = '';
      };
   }, [options]);

   return (
      <iframe ref={containerRef.iframeRef} className={`${className} ${(!showInDom ? 'react-pdf-export-hide' : '')}`} />
   )
}

export default PdfExport;
