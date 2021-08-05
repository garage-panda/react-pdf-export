import { HeadOptions } from '../types'

const DEFAULT_HEAD_OPTIONS: HeadOptions = {
   styles: [],
   scripts: [],
};

export const mergeOptions = (options: HeadOptions) => {
   return {
      ...DEFAULT_HEAD_OPTIONS,
      ...options
   }
}