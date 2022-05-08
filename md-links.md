# MD LINK

![Md- Links](./MD-LINKS.png)

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

### 2. MD-LINKS

Librería utilizada para validar la disponibilidad de los links presentes en archivos MD dentro de un directorio.

### 3. Instalación

```sh
npm install @jessira/md-links
```

#### 4. Uso a travez de la terminal

Se ejecuta a través de la terminal de la siguiente manera:

```sh
md-links "./some/example.md"
```

Esto dara como respuesta las propiedades de la url:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

## Opciones

```sh
md-links "./some/example.md [opciones]"
```

### --validate

El módulo hace una petición HTTP para averiguar si el link funciona

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

### --stats

Texto con estadísticas básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

### --stats y --validate

Para adicionar a la estadistica, los links rotos

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

### ---help

Obtendra mayor información sobre las opciones

### Para uso prográmatico

```sh
const mdLinks = require("@jessira/md-links");
```

```sh
mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```
