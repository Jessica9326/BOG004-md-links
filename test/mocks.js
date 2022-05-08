const mocks = {
  routeDir: 'test/docs',
  routeFil: 'test/docs/ejemplo.md',
  archivoNomd: 'test/docs/ejemplo/archivonomd.js',
  opciones: { validate: true },

  links: [{
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'test/docs/ejemplo/ejemploU.md',
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'test/docs/ejemplo/ejemploU.md',
  },
  {
    href: 'https://nodejs.org/es/  ',
    text: 'Node.js  ',
    file: 'test/docs/ejemplo.md',
  },
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    file: 'test/docs/ejemplo.md',
  },
  {
    href: 'https://github.com/markdown-it/markdown-it',
    text: 'markdown-it',
    file: 'test/docs/ejemploT.md',
  },
  ],
  linksValidate: [
    {
      href: 'https://nodejs.org/es/pw',
      text: 'Node.js',
      file: 'test/docs/ejemplo.md',
      status: 404,
      result: 'Not Found',
    },
    {
      href: 'https://developers.google.com/v8/',
      text: 'motor de JavaScript V8 de Chrome',
      file: 'test/docs/ejemplo.md',
      status: 200,
      result: 'OK',
    },

  ],
};

module.exports = mocks;
