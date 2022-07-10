/**
 * Declare additional node-modules lib types
 */
declare module 'react-cool-onclickoutside';
declare module 'js-file-downloader';
declare module 'react-code-input';
declare module 'prettysize';

declare module '*.module.scss' {
  const content: string;

  export default content;
}
