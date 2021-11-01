import React, { MutableRefObject, RefObject, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useAwaitDomRender } from '@garage-panda/use-await-dom-render';
import { HeadOptions } from '../types';
import {
  appendScript,
  appendStyle,
  cloneStyle,
  mergeOptions,
} from '../utils/common-utils';

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

const PdfExport: React.FC<PdfExportProps> = ({
  containerRef,
  className,
  showInDom = true,
  options,
  lazyLoad = false,
  children,
}) => {
  const [observer, startWait] = useAwaitDomRender();

  const attachObserverListener = (
    mountNode: Document,
    pdfContainer: HTMLDivElement
  ): void => {
    observer.on('load', () => {
      observer.removeListeners();
      containerRef.iframeRef.current.contentWindow.print();

      mountNode.head.innerHTML = '';
      mountNode.body.innerHTML = '';
    });

    startWait(pdfContainer);
  };

  const populateChildren = (mountNode: Document): void => {
    const pdfContainer = mountNode.createElement('div');
    mountNode.body.appendChild(pdfContainer);

    if (lazyLoad) {
      attachObserverListener(mountNode, pdfContainer);
    }

    ReactDOM.render(<>{children}</>, pdfContainer);
  };

  useEffect(() => {
    if (!lazyLoad) {
      return;
    }
    const mountNode = containerRef.iframeRef.current.contentWindow.document;
    containerRef.populateRef.current = () => {
      populateChildren(mountNode);
    };
  }, [lazyLoad]);

  useEffect(() => {
    if (!containerRef.iframeRef.current) {
      return;
    }

    const { includeParentStyles, styles, scripts } = mergeOptions(options);
    const mountNode = containerRef.iframeRef.current.contentWindow.document;

    if (includeParentStyles) {
      const parentStyles = document.querySelectorAll('style');
      parentStyles.forEach((style) => cloneStyle(mountNode, style));
    }

    styles.forEach((href) => appendStyle(mountNode, href));
    scripts.forEach((src) => appendScript(mountNode, src));

    if (!lazyLoad) {
      populateChildren(mountNode);
    }

    return () => {
      mountNode.head.innerHTML = '';
      mountNode.body.innerHTML = '';
    };
  }, [options]);

  const styles: React.CSSProperties = useMemo(() => {
    if (!showInDom) {
      return {
        position: 'absolute',
        opacity: 0,
        zIndex: -10,
      };
    }

    return {};
  }, [showInDom]);

  return (
    <iframe
      ref={containerRef.iframeRef}
      className={`${className}`}
      style={styles}
    />
  );
};

export default PdfExport;
