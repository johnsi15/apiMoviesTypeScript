# Movies

¿How does that work?

Require Node.js v18.15.0

* `npm install` to install the dependencies
* `npm run dev` to run development mode app
* `npm start` to build production


## ESLint
Quick start `npm init @eslint/config`

Install dependencies:

`npm i eslint-config-standard-with-typescript -D -E`

https://www.npmjs.com/package/eslint-config-standard-with-typescript


`.eslintrc.cjs`
```json
"extends": [
  "eslint-config-standard-with-typescript",
],
"parserOptions": {
  "project": "./tsconfig.json"
},
```


Este proyecto es una API que proporciona información sobre películas. Puedes utilizar esta API para acceder a detalles de películas, buscar películas por tags y más.

## Características

- Obtén detalles de películas.
- Busca películas por tags.
- Agrega nuevas películas a la base de datos.
- Autenticación de usuarios (si es aplicable).

## Uso

### Endpoints

- `/api/movies`: Obtiene una lista de películas.
- `/api/movies/{movieId}`: Obtiene detalles de una película específica.
- `/api/movies?tags=Acción&tags=Misterio&tags=Drama`: Busca películas por tags.
- `/api/movies`: Agrega una nueva película.

## Autenticación

Si es necesario autenticarse para acceder a ciertos recursos, debes incluir un encabezado de autorización en tu solicitud. Ejemplo:

`Authorization: Bearer tu_token_de_acceso`

## API de Autenticación

Este proyecto permite a los usuarios registrarse como proveedores de servicios. A continuación, se muestra un ejemplo de cómo puedes registrarte como proveedor utilizando esta API de películas.

## Registro de Proveedor

Para registrarte como proveedor o iniciar sesión si ya tiene un usuario y contraseña, debes realizar una solicitud POST a la siguiente URL: `/api/auth/sign-provider`.

### Ejemplo de Solicitud

Puedes utilizar una herramienta como [Thunder Client](https://www.thunderclient.com) o cualquier cliente HTTP para realizar esta solicitud. Aquí tienes un ejemplo de cómo hacerlo en JavaScript:

```javascript
let headersList = {
  "Accept": "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "X-Requested-With": "XMLHttpRequest",
  "Authorization": "Basic user&password",
  "Content-Type": "application/json"
}

const PUBLIC_KEY_TOKEN = '52ec1f8156f18dcd8057f49ed71719be77112e537dd382cef3f60f1c5d5d936e'

let bodyContent = JSON.stringify({
	"name": "Andrey provider",
	"email": "japrovider@gmail.com",
	"password": "secret",
	"apiKeyToken": PUBLIC_KEY_TOKEN
});

let response = await fetch("http://localhost:3000/api/auth/sign-provider", { 
  method: "POST",
  body: bodyContent,
  headers: headersList
});

let data = await response.json();
console.log(data);

```

### Ejemplos

#### Obtener una lista de películas
GET /api/movies
```js
let headersList = {
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Accept": "*/*, application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Authorization": "Bearer token"
}

let response = await fetch("http://localhost:3000/api/movies", { 
  method: "GET",
  headers: headersList
});

let data = await response.json();
console.log(data);

```

#### Obtener detalles de una película
GET /api/movies/{movieId}

```js
let headersList = {
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "Accept": "*/*, application/json",
  "X-Requested-With": "XMLHttpRequest",
  "Authorization": "Bearer token"
}

let response = await fetch("http://localhost:3000/api/movies/650f5136c993a5e4ea7902f4", { 
  method: "GET",
  headers: headersList
});

let data = await response.json();
console.log(data);

```

#### Buscar películas por tags
GET /api/movies?tags=Acción&tags=Misterio&tags=Drama

```js
let headersList = {
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "Accept": "*/*, application/json",
  "X-Requested-With": "XMLHttpRequest",
  "Authorization": "Bearer token"
}

let response = await fetch("http://localhost:3000/api/movies?tags=Tego&tags=debitiS&tags=drama", { 
  method: "GET",
  headers: headersList
});

let data = await response.json();
console.log(data);

```

#### Agregar una nueva película
POST /api/movies

```js
let headersList = {
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "Accept": "*/*, application/json",
  "X-Requested-With": "XMLHttpRequest",
  "Authorization": "Bearer token",
  "Content-Type": "application/json"
}

let bodyContent = JSON.stringify({
  "title": "Dickens 011d32bfb9c2",
  "year": "2006",
  "cover": "https://occ-0-1952-2433.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABRcGy6ws9z-3R_jjOxJxY1Hsu-8N4zF430fZMr07WavWEAGcixUPPMO7I_YgrGWc23utV4mM30qP4MBHyKcQ0WozRRdTdaYMstq55mcOZUyJ31uZJ45AmpGCBBs7qQ.jpg?r=72b",
  "description": "Carter b7a1557a7bfd",
  "duration": "293",
  "source": "https://johnserrano.co",
  "tags": [
    "Comedia"
  ]
});

let response = await fetch("http://localhost:3000/api/movies", { 
  method: "POST",
  body: bodyContent,
  headers: headersList
});

let data = await response.json();
console.log(data);

```
