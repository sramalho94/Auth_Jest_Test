## GAxTOP Group 3

## TOP 2023 - Intro to Jest Testing with BCrypt and JWT

---

#### This project will serve as a very brief introduction to using Jest with Bcrypt and JWT

---

## Getting Started

---

- fork and clone the repo to your local machine
- configure the config.json file with your username and password
- run `npm i`
- run `sequelize db:create`
- run `sequelize db:create --env test`
  run `sequelize db:migrate` and `sequelize db:migrate --env test`
- tests are run using `npm test`

---

## Workflow

---

- For the initial setup please consult the introductory lesson on getting started with Sequelize, Postgres, and Jest
- After competing the initial setup create a `middleware` directory
- create your middleware functions
- create and build out an `AuthController.js` file
- create and build out an `AuthRouter.js` file in your `routes` directory
- install SuperTest and create a `test` directory with a `AuthController.test.js` file
- create your tests
- run `npm test AuthController` to see if your tests pass

---

## Structuring Tests

---

On a basic level, our test file can be broken down into 3 parts:

- BeforeAll: this code block creates a user and a token
- Testing: your tests go here
- AfterAll: delete anything you created in your BeforeAll block

Keep in mind that you can also use beforeEach blocks and afterEach blocks as well. Use whichever is better fitted for your situation.

---

## .ENV Variables

---

### Note: It is never a good idea to store env variables on an online repository but for the purpose of this lesson, my .env.local file looks like the following:

APP_SECRET=TOPGROUPTHREEISDABEST
SALT_ROUNDS=12
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME_TEST=authjt_test
DB_NAME=authjt_development
DB_USERNAME_PROD=postgres_prod
DB_PASSWORD_PROD=password_prod
DB_NAME_PROD=authjt_production
DB_HOST_PROD=your_production_db_host

### Your DB_USERNAME should be the username you use to log into your machine
