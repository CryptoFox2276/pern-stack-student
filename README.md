# Technologies - Backend

* [PostgreSQL v12](https://www.postgresql.org/)
* [PostgreSQL Installer for Windows](https://www.postgresqltutorial.com/install-postgresql/)
* [Express.js middleware v4](https://expressjs.com/)
* [Node.js v12](https://nodejs.org/es/)
* [Nodemon](https://www.npmjs.com/package/nodemon) npm module so backend server will automatically restart after code changes
* [Postman API](https://www.postman.com/downloads/) to simulate a frontend

# Technologies - Frontend

* [React framework v16](https://reactjs.org/)
* [Bootstrap v4](https://getbootstrap.com/) component library

# Dev Setup - Backend

* Install dependencies using `npm i`
* Install [nodemon](https://www.npmjs.com/package/nodemon) globally if you don't already have it
* Install [PostgreSQL](https://www.postgresql.org/) & run it (requires the password you created during installation)
* Add database access credentials to `db.js` - recommend installing [npm dotenv](https://www.npmjs.com/package/dotenv) & using .env to hide credentials if commiting to Github
* Postgresql shell commands: `\l` list all databases. `\c` database1 connect to database1. `\dt` inspect tables. `\d+` inspect table & show relation information. `\q` to quit
* From root run `nodemon server` for a dev server
* `http://localhost:5000/` can be accessed for CRUD operations such as POST, GET, PUT, DELETE etc. using Postman

# Dev Setup - Frontend

* Change to `client` directory
* Install dependencies using `npm i`.
* run `npm start`. Frontend will open at `http://localhost:3000/`
