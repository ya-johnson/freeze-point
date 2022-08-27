

## About

### Build With

NodeJS Express MongoDB Mongoose JWT
Vite React Wouter Zustand Tailwind

- [Auto-Animate](https://auto-animate.formkit.com)

## Getting started

### Prerequisites

NodeJs
* Check if NodeJs already installed on your machine
  ```sh
  $ node -v
  ```
* If not then install
  ```sh
  $ sudo apt install node-js npm
  $ sudo dnf install node-js
  $ sudo pacman -S node-js
  ```

### Installation

1. Clone the repo
   ```sh
   $ git clone https://github.com/ya-johnson/freeze-point.git
   ```
2. Install NPM packages
   ```sh
   $ cd client
   $ npm i
   $ cd ../server
   $ npm i
   ```
3. Create .env file in the server directory
   ```sh
   $ touch .env
   ```
4. Set env variables
   ```
   PORT=YOUR_PORT
   SECRET=YOUR_JWT_SECRET
   DB=YOUR_MONGODB_KEY
   ```

Note: At the time of develpoment [Vite.js proxy didnt work](https://github.com/vitejs/vite/issues/6102). <br/>
      In order to work locally and avoiding CORS you'll need to setup proxy in Node js
      
 1. Install 'express-http-proxy' in the server directory
   ```sh
   $ ~/path_to_project_folder/freeze-point/server
   $ npm i express-http-proxy
   ```

2. Setup proxy in server.js (make sure to put as first middleware)
   ```
   const proxy = require('express-http-proxy')

   app.use('/api', proxy('http://localhost:5173'))
   ```

## Todo

- [ ] Add Email service
  - [ ] Add Rest password to Auth services

