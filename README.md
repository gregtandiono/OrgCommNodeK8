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

**Docker compose** will pull & build both the project and the mongodb image from docker hub. After *compose* has successfully built the images,
go to http://localhost:1337 to verify that the container is running.


## Endpoints and Default Data

By default, the database has been pre-populated with a set of organizations, comments and members.

**Available organizations** to query from:
- **fsociety**
- **ecorp**

### Available Endpoints

**[GET] /orgs/{orgName}/comments**
```bash
curl -i /orgs/fsociety/comments

HTTP/1.1 200 OK
BODY:
[
  {
    "deleted": false,
    "_id": "5d61050a854b8e001cb96896",
    "comment": "i miss qwerty...",
    "org": "fsociety",
    "createdAt": "2019-08-24T09:36:10.846Z",
    "updatedAt": "2019-08-24T09:36:10.846Z",
    "__v": 0
  },
  {
    "deleted": false,
    "_id": "5d61050a854b8e001cb96897",
    "comment": "where is darlene?",
    "org": "fsociety",
    "createdAt": "2019-08-24T09:36:10.846Z",
    "updatedAt": "2019-08-24T09:36:10.846Z",
    "__v": 0
  }
]
```
**[POST] /orgs/{orgName}/comments**
```bash
curl -d '{"comment": "Bonsoir!"}' \
-H "Content-Type: application/json" \
-X POST http://localhost:1337/orgs/ecorp/comments

HTTP/1.1 200 OK
```

**[DELETE] /orgs/{orgName}/comments**
```bash
curl -i -X DELETE http://localhost:1337/orgs/fsociety/comments

HTTP/1.1 200 OK
```

**[GET] /orgs/{orgName}/members**
```bash
curl -i http://localhost:1337/orgs/fsociety/members

HTTP/1.1 200 OK
BODY:
[
  {
    "avatar": "https://i.pravatar.cc/300",
    "followers": 33,
    "following": 11,
    "_id": "5d61050a854b8e001cb96890",
    "email": "praveen@fsociety.com",
    "org": "fsociety",
    "createdAt": "2019-08-24T09:36:10.811Z",
    "updatedAt": "2019-08-24T09:36:10.811Z",
    "__v": 0
  },
  {
    "avatar": "https://i.pravatar.cc/300",
    "followers": 18,
    "following": 7,
    "_id": "5d61050a854b8e001cb96891",
    "email": "darlene@fsociety.com",
    "org": "fsociety",
    "createdAt": "2019-08-24T09:36:10.811Z",
    "updatedAt": "2019-08-24T09:36:10.811Z",
    "__v": 0
  },
  {
    "avatar": "https://i.pravatar.cc/300",
    "followers": 7,
    "following": 21,
    "_id": "5d61050a854b8e001cb9688f",
    "email": "gregtandiono@fsociety.com",
    "org": "fsociety",
    "createdAt": "2019-08-24T09:36:10.810Z",
    "updatedAt": "2019-08-24T09:36:10.810Z",
    "__v": 0
  }
]
```

## Build the project locally

You will need a copy of `default.json` in `/config` dir: 
```bash
cp ./config/default.sample.json ./config/default.json
```
and adjust the config file to fit your local dev environment.

Install dependencies:

```bash
yarn
```

Run the server:
```bash
yarn start
```

Running `yarn start` will run a seed script via `node seed.js` to insert default set of collections and documents to your local mongodb db.

Run unit and integration tests:
```
yarn test
```

If you're going to develop on your local machine, it is recommended that you use tools like [nodemon](https://nodemon.io/) for `watch` or `reload`.

```
nodemon index.js
```

To build the docker image locally:
```
docker build -t orgcommnode-rest .
```
You can replace the `orgcommnode-rest` tag with any name you want.


