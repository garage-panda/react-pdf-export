import { RefObject, useEffect } from 'react'
import ReactDOM from 'react-dom';

interface HeadOptions {
   styles?: string[];
   scripts?: string[];
}

const DEFAULT_HEAD_OPTIONS: HeadOptions = {
   styles: [],
   scripts: []
};

export default (ref: RefObject<HTMLIFrameElement>, template: any, options?: HeadOptions) => {
   const opts = {
      ...DEFAULT_HEAD_OPTIONS,
      options
   };

   useEffect(() => {
      if (!ref.current) {
         return;
      }

      //TODO: Title
      const mountNode = ref.current.contentWindow.document;
      
      opts.styles.forEach(styleHref => {
         const linkElement = mountNode.createElement('link');

         linkElement.type = 'text/css';
         linkElement.rel = 'stylesheet';
         linkElement.href = styleHref;
         mountNode.head.appendChild(linkElement);
      });
      opts.scripts.forEach(scriptSrc => {
         const scriptElement = mountNode.createElement('script');

         scriptElement.src = scriptSrc;
         mountNode.head.appendChild(scriptElement);
      });

      const pdfContainer = mountNode.createElement('div');
      mountNode.body.appendChild(pdfContainer);

      ReactDOM.render(template, pdfContainer);
   }, [ref]) 

   const generatePdf = () => {
      ref.current.contentWindow.print();
   }

   return { generatePdf };
}