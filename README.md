

## About

Freeze Point is a Rich-text Blogging platform.

#### Summery:
* Users: 
    * Create/Read/Update/Delete
    * Follow Users and Topics
* Posts: Create/Read/Update/Delete
    * Like and Comment

#### Build With

* NodeJS 
* Express
* MongoDB 
* Mongoose
* JWT
* Cloudinary


* Vite 
* React 
* Wouter
* Zustand
* Tailwind


### Getting started

#### Prerequisites

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

#### Installation

1. Clone the repo
   ```sh
   $ git clone https://github.com/ya-johnson/freeze-point.git
   ```
2. Install NPM packages
   ```sh
   $ cd ~/path_to_project_folder/freeze-point
   $ cd client
   $ npm i
   $ cd ../server
   $ npm i
   ```
3. Create .env file in the server directory
   ```sh
   $ cd ~/path_to_project_folder/freeze-point/server
   $ touch .env
   ```
4. Set env variables
   ```
   PORT=YOUR_PORT
   SECRET=YOUR_JWT_SECRET
   DB=YOUR_MONGODB_KEY
   CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
   CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
   CLOUDINARY_NAME=YOUR_CLOUDINARY_NAME
   EMAIL_SMTP=YOUR_EMAIL_SMTP_SERVER
   EMAIL_FROM_YOUT_EMAIL_DOMAIN
   ```

##### Note:
At the time of develpoment [Vite.js proxy didnt work](https://github.com/vitejs/vite/issues/6102). <br/>
In order to work locally and avoiding CORS you'll need to setup a reversed proxy in Node js.
      
1. Install 'express-http-proxy' in the server directory
   ```sh
   $ cd ~/path_to_project_folder/freeze-point/server
   $ npm i express-http-proxy
   ```

2. Setup proxy in server.js (make sure to put as first middleware)
   ```
   const proxy = require('express-http-proxy')

   app.use('/api', proxy('http://localhost:5173'))
   ```

### Run

* server
    ```sh
    $ cd ~/path_to_project_folder/freeze-point/server
    $ npm run dev
    ```   
* client
    ```sh
    $ cd ~/path_to_project_folder/freeze-point/client
    $ npm run dev
    ```

---

## Todo

- [ ] Migrate to TypeScript
- [ ] Add User History - Posts, Likes, Comments
- [ ] Add Pagination
- [ ] Add Search
- [ ] Add user Post collections
- [ ] Fix JWT - Coockie HTTP only
- [ ] Add Email service
  - [ ] Add Reset password to Auth services
- [ ] Add Chat service - WebSoket
