

## About

Freeze Point is a Rich-text Blogging platform.

### Features
- Users: 
   - Create / Read / Update / Delete
- Posts: 
   - Create / Read / Update / Delete
   - Like/unlike and Comment
- Responsive
- Dark Mode
- Text Editor for Posts - [React Draft Wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)
- Register/Login - JWT for Authentication
- Pagination
- Search for Users/Posts



### Build With

#### Backend
- [Node](https://nodejs.org/en/) 
- [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) 
- [Mongoose](https://mongoosejs.com/docs/)
- [JWT](https://jwt.io/)
- [Cloudinary](https://cloudinary.com/)

#### Frontend
- [Vite](https://vitejs.dev/) 
- [React](https://reactjs.org/) 
- [Wouter](https://github.com/molefrog/wouter)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind](https://tailwindcss.com/)
- [React Draft Wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)


## Getting started

### Prerequisites
1. Docker 
   For usage with docker you'll need Docker and Docker-Compose
   Check if already installed on your machine
   ```sh
   $ docker --version && docker-compose --version
   ```
   If not then install
   ```sh
   $ sudo pacman -S docker docker-compose
   ```

2. Without Docker
   For usage without docker you'll need NodeJs
   Check if NodeJs already installed on your machine
   ```sh
   $ node -v
   ```
   If not then install
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
2. Create .env files
   ```sh
   $ cd server && touch .env cd && cd ../client && touch .env
   ```
3. Set Client env variables
   ```
   VITE_SERVER_URL=YOUR_SERVER_URL
   ```
4. Set Server env variables
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

### Run

1. Docker - Run both server and client
    ```sh
    $ docker-compose -f docker-compose.yml -f docker-compose.override.yml up
    ```  

2. Withdout Docker
    server
    ```sh
    $ cd ~/path_to_project_folder/freeze-point/server
    $ npm run dev
    ```   
   client
      ```sh
      $ cd ~/path_to_project_folder/freeze-point/client
      $ npm run dev
      ```

---

## Todo

- [ ] Migrate to TypeScript
- [ ] Migrate from MVC pattern to DDD pattern (server)
- [ ] Fix DB design - User, Post, Like, Comment, Follow schemas (lookup)
   - [ ] Add Following functionality
   - [ ] Update User Profile - show Posts, Comments
   - [ ] Add User Post collections
- [ ] Fix REST params - to name/title instead of id's
- [ ] Fix JWT - Coockie HTTP only
- [X] Add Pagination
   - [ ] Add option to get without pagination wrapper (mongo docs only)
- [ ] Add Feed sorting options - latest, most popular, following
- [X] Add Search
- [X] Add Email service
  - [ ] Add Reset password to Auth services
- [ ] Add WebSoket
   - [ ] Add chat
   - [ ] Fix Likes/Comments - update simultaneously


### UI/UX

- [ ] Add Modal component
   - [ ] Update AuthModal
- [ ] Add info to Authentication - password restrictions, errors etc
- [X] Fix PostCard - content fit (maxLength)
