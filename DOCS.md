# Well Nitrates Web App - Documentation 

## _Table of Contents_
1. Setup 
    - Libraries 
    - Packages and Dependencies
2. Deployment 
3. Index 

<br> 

## Setup 
### Development Environment 
_Ensure that [Node.js](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) are installed._

Check Node.js installation on local machine:
``` bash 
node -v
```

Check npm installation on local machine:
``` bash 
npm -v
``` 

<br>

### Libraries 
1. [Leaflet.js](https://leafletjs.com/reference.html) 
2. [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
3. [Plotly.js](https://plotly.com/javascript/)

<br> 

### Packages and Dependencies
Install via __[npm](https://www.npmjs.com/):__
``` bash 
npm install
```

Or through __[yarn](https://yarnpkg.com/):__
``` bash 
yarn 
```

All dependencies are listed in the [package.json](./package.json) file. 

<br>

## Deployment 
### Run a Local Development Server 
_This allows to see active changes to web application while in development mode._
``` bash 
npm run dev 
```  

_Start build._
``` bash 
npm start 
``` 