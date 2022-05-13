#!/usr/bin/env node
const chalk = require('chalk');
const chalkTable = require('chalk-table');
const figlet = require('figlet');
const mdLinks = require('./mdLinks');

const [, , ...args] = process.argv;

const [ruta] = args;
const stats = args.includes('--stats');
const validate = args.includes('--validate');
const help = args.includes('--help');

const obtenerLinksUnicos = (linksData) => {
  const links = linksData.map((link) => link.href);
  const linksUnicos = new Set(links);
  return linksUnicos.size;
};

const obtenerLinksRotos = (linksData) => linksData.filter((link) => link.result !== 'OK').length;

const chalkValidate = {
  columns: [
    { field: 'total', name: chalk.cyan('Total') },
    { field: 'unique', name: chalk.cyan('Unique') },
    { field: 'broken', name: chalk.red('Broken') },
  ],
};
const chalkStat = {
  columns: [
    { field: 'total', name: chalk.yellow('Total') },
    { field: 'unique', name: chalk.yellow('Unique') },
  ],
};
const chalkLinks = {
  columns: [
    { field: 'url', name: chalk.cyan('URL') },
    { field: 'descripcion', name: chalk.cyan('Descripción') },
    { field: 'archivo', name: chalk.cyan('Archivo') },
  ],
};
const chalkLinksValidate = {
  columns: [
    { field: 'url', name: chalk.white('URL') },
    { field: 'descripcion', name: chalk.white('Descripción') },
    { field: 'archivo', name: chalk.white('Archivo') },
    { field: 'estado', name: chalk.white('Estado') },
    { field: 'resultado', name: chalk.white('Resultado') },
  ],
};
const instrucciones = `
 
  1. Para conocer las propiedades del Link como: la URL, texto el link y ruta donde se encontro el archivo ingrese el siguiente comando junto con la ruta que desea consultar:
  ${chalk.cyan.bold('md-links ./ruta/consultar.md \n')}
  2. Para conocer adicionar a la información anterior el codigo de respuesta http y si es un link valido ingrese el siguiente comando:
  ${chalk.cyan.bold('md-links ./ruta/consultar.md --validate \n')}
  3. Para conocer la cantidad de links y cuantos son unicos ingrese el siguiente comando:
  ${chalk.cyan.bold('md-links ./ruta/consultar.md --stats \n')}
  3. Puede combinar las opciones --stats y --validate para incluir a la información anterior, la cantidad de links rotos.
  ${chalk.cyan.bold('md-links ./ruta/consultar.md --stats --validate \n')}
`;
if (help) {
  console.log(chalk.whiteBright.bold.bgBlack(instrucciones));
} else {
  (
    mdLinks(ruta, { validate })
      .then((respuesta) => {
        if (respuesta.length <= 0) {
          console.error(chalk.bgRed('¡No se encontraron link en el archivo!'));
        } else {
          figlet('MD-LINKS', (error, dato) => {
            console.log(chalk.cyan.bold(dato));
            if (stats) {
              console.log(chalk.bold.blueBright('===*** Estadísticas sobre los links encontrados ***==='));
              if (validate) {
                const tableValidate = chalkTable(chalkValidate, [{
                  total: respuesta.length,
                  unique: obtenerLinksUnicos(respuesta),
                  broken: obtenerLinksRotos(respuesta),
                },
                ]);
                console.log(tableValidate);
              } else {
                const tableStat = chalkTable(chalkStat, [{
                  total: respuesta.length,
                  unique: obtenerLinksUnicos(respuesta),
                },
                ]);
                console.log(tableStat);
              }
            } else if (validate) {
              const tableLinkValidate = chalkTable(chalkLinksValidate, respuesta.map((link) => ({
                url: link.result === 'OK' ? chalk.green(link.href) : chalk.red(link.href),
                descripcion: link.result === 'OK' ? chalk.green(link.text) : chalk.red(link.text),
                archivo: link.result === 'OK' ? chalk.green(link.file) : chalk.red(link.file),
                estado: link.result === 'OK' ? chalk.green(link.status) : chalk.red(link.status),
                resultado: link.result === 'OK' ? chalk.green(link.result) : chalk.red(link.result),

              })));
              console.log(tableLinkValidate);
            } else {
              const tableLink = chalkTable(chalkLinks, respuesta.map((link) => ({
                url: link.href,
                descripcion: link.text,
                archivo: link.file,

              })));
              console.log(tableLink);
            }
          });
        }
      })
      .catch(() => {
        console.error(chalk.bgRed('¡la ruta ingresada no existe!'));
      })
  );
}
