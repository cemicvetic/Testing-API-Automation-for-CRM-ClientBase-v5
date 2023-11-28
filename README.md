# Client Base v5

## About project

>> #### **Client Base** is web application which have been made for dispatching and accounting the service companies. It is the easiest way to manage the process of receiving and transmitting an order.
>
> The current project has purpose to cover client/server part of application with automatic tests to speed up the regression testing.




## Route names with examples

You can click on the link to get [Base URL](https://clientbase-server.herokuapp.com) for API part of Client Base  
or use `https://clientbase-server.herokuapp.com`


### /v5/user
Register the new user to the app

```
POST /v5/user
{
    "companyName": "Best toys",
    "firstName": "Pooh",
    "lastName": "Winnie ",
    "email": "forest@owner.com",
    "password": "123123",
    "version": "v5"
}
```
---

### /v5/user/login
After user has been logged in the response must return token
```
POST /v5/user/login
{
    "email": "forest@owner.com",
    "password": "123123"
}
```
---

### /v5/client
Client creation/update/read/deletion
```
* requires authorization token to be provided

POST /v5/client
{
    "name": "Winnie The Pooh",
    "phone": "88888",
    "email": "honey@love.com"
}

GET /v5/client/6428d7d57f030b7a9f5d1deb
* no query parameters or body data needed in request but client id (payload) needed to be added to the endpoint

POST /v5/client/search 
* no query parameters or body data needed in request

PATCH /v5/client/63eeebd60daa43a633575801
* client id (payload) needed to be added to the endpoint
{
    "name": "Winn",
    "email": "5555@honey.com",
    "phone": "one, two"
}

DELETE /v5/client/63eee8850daa43a63357575e
* no query parameters or body data needed in request but client id (payload) needed to be added to the endpoint
```
---

### /v5/order
Order creation/update/read/deletion
```
* requires authorization token to be provided

POST /v5/order
{
    "client": "63eeebd60daa43a633575801",
    "clientPaid": 150,
    "clientPrice": 300,
    "service": "63ef16330daa43a633575d3e",
    "vendorPaid": 75,
    "vendorPrice": 100,
    "description": "full information"
}

GET /v5/order/63ef212d0daa43a633575f36
* no query parameters or body data needed in request but order id (payload) needed to be added to the endpoint

POST /order/search
* no query parameters or body data needed in request

PATCH /v5/order/63ef212d0daa43a633575f36
* order id (payload) needed to be added to the endpoint
{
    "clientPaid": 25,
    "clientPrice": 525,
    "vendorPaid": 93,
    "vendorPrice": 130
}

DELETE /v5/client/63eee8850daa43a63357575e
* no query parameters or body data needed in request but order id (payload) needed to be added to the endpoint
```
---

### /v5/vendor
Vendor creation/update/read/deletion
```
* requires authorization token to be provided

POST /v5/vendor
{
    "name": "Piglet",
    "phone": "333-555-9988",
    "email": "small@piglet.com",
    "description": "best friend"
}

GET /v5/vendor/63ef0a2d0daa43a633575c2b
* no query parameters or body data needed in request but vendor id (payload) needed to be added to the endpoint

POST /vendor/search
* no query parameters or body data needed in request

PATCH /v5/vendor/63ef0a2d0daa43a633575c2b
* vendor id (payload) needed to be added to the endpoint
{
    "description": "pig toy"
}

DELETE /v5//vendor/63ef08ad0daa43a633575c0e
* no query parameters or body data needed in request but vendor id (payload) needed to be added to the endpoint
```
---

### /v5/service
Service creation/update/read/deletion
```
* requires authorization token to be provided

POST /v5/service
{
    "name": "House cleaning",
    "clientPrice": 300,
    "vendor": "63ef0a2d0daa43a633575c2b",
    "vendorPrice": 100,
    "description": "Best house cleaning in town"
}

GET /v5/service/63ef179f0daa43a633575dad
* no query parameters or body data needed in request but service id (payload) needed to be added to the endpoint

POST /service/search
* no query parameters or body data needed in request

PATCH /v5/service/63ef0a2d0daa43a633575c2b
* service id (payload) needed to be added to the endpoint
{
    "name": "clean",
    "clientPrice": 350,
    "description": "cleaning" 
}

DELETE /v5//service/63e2f9e6373d30cedfd4c6c7
* no query parameters or body data needed in request but vendor id (payload) needed to be added to the endpoint
```