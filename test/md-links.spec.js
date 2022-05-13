const { buscarMds } = require('../src/leerArchivo');
const mdLinks = require('../src/mdLinks');
const mocks = require('./mocks');

describe('buscarMds', () => {
  test('busca directorios retorna array archivos md', () => {
    const arrayMd = [];
    buscarMds(mocks.routeDir, arrayMd);
    expect(arrayMd.length).toBe(3);
  });
});

describe('mdlinks', () => {
  test('retorna array links', (done) => {
    mdLinks(mocks.routeFil).then((arrayLinks) => {
      expect(Array.isArray(arrayLinks)).toBe(true);
      expect(arrayLinks.length).toBe(2);
      done();
    });
  });
  test('retorna array con el estado si la opcion validate es true', (done) => {
    mdLinks(mocks.routeFil, { validate: true }).then((links) => {
      expect(links).toEqual(mocks.linksValidate);
      done();
    });
  });
  test('si la ruta no existe envia error', (done) => {
    mdLinks('test/docs/noexiste.md').catch((error) => {
      expect(error.message).toEqual("ENOENT: no such file or directory, stat 'test/docs/noexiste.md'");
      done();
    });
  });
});
