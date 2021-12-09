## Prerequisite
* `$ cp .env.example .env`
* `$ export $(xargs <.env)`
* `$ npm install`

Run function on local environment
```
$ npm start
```

Run test on local environment
```
$ npm test
```

## Endpoints
Route | HTTP | Description | Request Example
----- | ---- | ----------- | -------
/user | POST | Sign up new user | body : {"name": "test4", "email": "test4@test.com", "password": "12345AABB!@asaasas"}
/users | GET | Get users by query | query : { "id": "testId" } or { "email": "testEmail" } or { "name": "nameTest" }
/user/:id | PUT | Update a user data |  body : {"name": "test4", "email": "test4@test.com", "password": "12345AABB!@asaasas"}
/user/:id | DELETE | Delete a user data | -
