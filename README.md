# Exercise Tracker API

### A REST API for Exercise tracking.

<div align="center">

[![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen?style=for-the-badge&logo=mongodb&color=14aa50)](https://www.mongodb.com/cloud/atlas)

</div>

---

#### Usage

1. A collection on MongoDB Atlas or the local instance of MongoDB can be used.
2. Clone this repository.
3. Create a .env file, copy the contents of .env.example & place the MONGO_URI.

    • MongoDB Atlas

    `MONGO_URI=mongodb+srv://<username>:<password>@<cluster_name>/<database_name>`

    • Local Instance of MongoDB

    `MONGO_URI=mongodb://localhost/<collection_name>`

4. `npm i` or `yarn`
5. `npm start` or `yarn start`
6. The API server will start at `http://localhost:3000` unless configured in .env file.

---

#### Technology Stack

1. Express
2. MongoDB
3. Mongoose

---

<small>Built as a part of [freeCodeCamp's Microservices Certification course](https://www.freecodecamp.org/learn/apis-and-microservices/managing-packages-with-npm/).</small>
