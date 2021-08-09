import { HeadOptions } from '../types';

const DEFAULT_HEAD_OPTIONS: HeadOptions = {
  styles: [],
  scripts: [],
  includeParentStyles: true,
};

export const mergeOptions = (options: HeadOptions): HeadOptions => {
  return {
    ...DEFAULT_HEAD_OPTIONS,
    ...options,
  };
};

export const appendStyle = (target: Document, href: string): void => {
  const styleLink = target.createElement('link');

  styleLink.type = 'text/css';
  styleLink.rel = 'stylesheet';
  styleLink.href = href;

  target.head.appendChild(styleLink);
};

export const appendScript = (target: Document, src: string): void => {
  const scriptTag = target.createElement('script');

  scriptTag.src = src;

  target.head.appendChild(scriptTag);
};

export const cloneStyle = (target: Document, style: Node): void => {
  const clone = style.cloneNode(true);
  target.head.appendChild(clone);
};
