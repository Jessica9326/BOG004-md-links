const { validarLink } = require('./validadorRuta');
const { buscarMds, leerArchivo } = require('./leerArchivo');
// obtiene listado de archivos md existentes en un directorio o ruta especifica
// lee los archivos obtenidos md
// obtiene los links de los archivos leidos
// Valida los links de ser necesario

const mdLinks = (route, opciones = { validate: false }) => new Promise((resolve, reject) => {
  const archivosMd = [];
  buscarMds(route, archivosMd);
  // a partir de los achivos md encontrados se crea un array de promesas
  const promesas = archivosMd.map((ruta) => leerArchivo(ruta));
  // promise all recibe un array de promesas 'promesas'
  Promise.all(promesas)
    .then((valores) => {
      // esperar a que todos los archivos sean leidos para obtener los valores finales
      const datalinks = valores.flat();
      if (!opciones.validate) {
        resolve(datalinks);
      } else {
        const promesasLinks = datalinks.map((datoLink) => validarLink(datoLink));
        Promise.all(promesasLinks).then((linksValidados) => {
          resolve(linksValidados);
        });
      }
    })
    .catch((error) => {
      reject(error);
    });
});

module.exports = mdLinks;
