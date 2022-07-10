module.exports = {
  // This will check Typescript files
  '**/*.(ts|tsx)': () => 'npx tsc --noEmit',
  // This will lint and format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    `npx eslint --fix ${filenames.join(' ')}`,
    `npx prettier --write ${filenames.join(' ')}`,
  ],
  // This will Format MarkDown and JSON
  '**/*.(md|json)': (filenames) => `npx prettier --write ${filenames.join(' ')}`,
  // This will Format CSS and SCSS
  '**/*.(css|scss)': (filenames) => `npx prettier --write ${filenames.join(' ')}`,
};
