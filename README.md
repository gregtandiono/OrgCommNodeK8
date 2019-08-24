# OrgCommNodeK8
*despite having a `k8` in the name, this project does not actually utilize K8 orchestration.*

Pre-requisites:
- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install). I have completely stopped using `npm` in favor of yarn due to performance.
- [MongoDB](https://docs.mongodb.com/manual/installation/)
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)


## Run the project via Docker Compose

```bash
# In the project root directory, run:
docker-compose up

# to run in `detached` mode:
docker-compose up -d
```

**Docker compose** will pull & build both the project and the mongodb image from docker hub. After compose has successfully built the images,
go to http://localhost:1337 to verify that the container is running.


## Endpoints and Default Data

By default, the database has been pre-populated with a set of organizations, comments and members.

Available organizations to query from:
- **fsociety**
- **ecorp**

### Available Endpoints

- **[GET] /orgs/fsociety/comments**
- **[POST] /orgs/fsociety/comments**
- **[DELETE] /orgs/fsociety/comments**
- **[GET] /orgs/fsociety/members**

## Build the project locally

You will need a copy of `default.json` configuration and adjust the config file to fit your local dev environment:
```bash
cp ./config/default.sample.json ./config/default.json
```
Install dependencies:

```bash
yarn
```

Run the server:
```bash
yarn start
```

Running `yarn start` will run a seed script via `node seed.js` to insert default set of collections and documents to your local mongodb db.

Run tests:
```
yarn test
```

If you're going to develop on your local machine, it is recommended that you use tools like [nodemon ](https://nodemon.io/) for `watch` or `reload`.

Ex:
```
nodemon index.js
```
