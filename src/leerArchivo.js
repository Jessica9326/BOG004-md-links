// Validar Directorios y Archivos para extraer archivos .MD

const path = require('path'); // Path módulo proporciona utilidades para trabajar con rutas de archivos y directorios
const fs = require('fs'); // Se importa el modulo 'fs'(file system) para acceder e interactuar con el sistema de archivos.
const marked = require('marked'); // Transformar md a HTML
// libreria para extraer los link con HTML
const { JSDOM } = require('jsdom');

// Funcion para filtrar archivos MD en archivo y directorio
const buscarMds = (route, mds) => {
  // verifica si la ruta es archivo, que sea extension MD
  if (fs.statSync(route).isFile()) {
    if (path.extname(route) === '.md') {
      mds.push(route);
    }
  } else {
    // si es directorio
    fs.readdirSync(route).forEach((archivo) => {
      const rutaArchivo = path.join(route, archivo); // sacar la ruta del archivo
      const extensionArchivo = path.extname(rutaArchivo); // saca extension del archivo
      if (extensionArchivo) {
        if (extensionArchivo === '.md') {
          // si es extension md
          mds.push(rutaArchivo); // envia archivo md al array
        }
      } else {
        // si no es un archivo vuelve a ejecutar la funcion de leerDirectorio (recursividad)
        buscarMds(rutaArchivo, mds);
      }
    });
  }
};

// Array con los links
const obtenerLinks = (data, route) => {
  const html = marked.parse(data); // devuelve html del md
  const dom = new JSDOM(html); // crea dom para manipular la data
  const links = dom.window.document.querySelectorAll('a');
  return Array.from(links)
    .filter((link) => link.href.includes('http'))
    .map((link) => ({ href: link.href, text: link.text, file: route }));
};

// Lee el archivo para extraer links
const leerArchivo = (route) => new Promise((resolve, reject) => {
  fs.readFile(route, 'utf-8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(obtenerLinks(data, route)); // Array con los link
    }
  });
});

module.exports = { leerArchivo, buscarMds };
