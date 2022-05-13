const axios = require('axios');
const { validarLink } = require('../src/validadorRuta');
const mocks = require('./mocks');

jest.mock('axios');

describe('validarLink', () => {
  test('validarLinks es una funcion', () => {
    expect(typeof validarLink).toBe('function');
  });
  test('resuelve respuesta http 200 para el link validado', (done) => {
    axios.get.mockResolvedValue({ status: 200 });
    validarLink(mocks.linksValidate[0]).then((respuesta) => {
      expect(respuesta.status).toBe(200);
      done();
    });
  });
  test('resuelve respuesta http 404 si el link no existe', (done) => {
    axios.get.mockResolvedValue({ status: 404 });
    validarLink(mocks.linksValidate[0]).then((respuesta) => {
      expect(respuesta.status).toBe(404);
      done();
    });
  });
});
