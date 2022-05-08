const axios = require('axios').default;

const validarLink = (link) => new Promise((resolve) => {
  axios
    .get(link.href)
    .then((respuesta) => {
      const data = {
        ...link,
        status: respuesta.status,
        result: respuesta.statusText,
      };
      resolve(data);
    })
    .catch((error) => {
      // ? encadenamiento opcional (optional chaining) permite valiar la existencia de un
      // objeto antes de acceder a sus propiedades
      const data = {
        ...link,
        status: error.response?.status,
        result: error.response?.statusText,
      };
      resolve(data);
    });
});

module.exports = { validarLink };
