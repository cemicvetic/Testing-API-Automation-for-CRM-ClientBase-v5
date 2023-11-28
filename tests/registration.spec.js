import {expect} from 'chai'
import 'dotenv/config'
import {faker} from '@faker-js/faker'
import {login, registration} from "../helpers/general"
import request from "supertest";

describe('Register/create new user', () => {
    describe('Register/create new user with valid credentials', () => {
        let response

        before(async () => {
            response = await registration(faker.company.name(), faker.name.firstName(), faker.name.lastName(), 'user_' + Date.now() + '@gmail.com', faker.internet.password())
        })
        it('Response status code is 201', () => {
            expect(response.statusCode).to.eq(201)
        })
        it('Response status message is User created successfully. Please check your email and verify it', () => {
            expect(response.body.message).to.eq(
                'User created successfully. Please check your email and verify it'
            )
        })
    })

    describe('Register/create new user with missing company name', () => {
        let response

        before(async () => {
            response = await registration('', faker.name.firstName(), faker.name.lastName(), 'user_' + Date.now() + '@gmail.com', faker.internet.password())
        })
        it('Response status code is 201', () => {
            expect(response.statusCode).to.eq(201)
        })
        it('Response status message is User created successfully. Please check your email and verify it', () => {
            expect(response.body.message).to.eq(
                'User created successfully. Please check your email and verify it'
            )
        })
    })

    describe('Register/create new user with missing first name', () => {
        let response

        before(async () => {
            response = await registration(faker.company.name(), '', faker.name.lastName(), 'user_' + Date.now() + '@gmail.com', faker.internet.password())
        })

        it('Response status code is 404', () => {
            expect(response.statusCode).to.eq(404)
        })
        it('Response status message is User was not created', () => {
            expect(response.body.message).to.eq('User was not created')
        })
    })

    describe('Register/create new user with missing last name', () => {
        let response

        before(async () => {
            response = await registration(faker.company.name(), faker.name.firstName(), '', 'user_' + Date.now() + '@gmail.com', faker.internet.password())
        })
        it('Response status code is 404', () => {
            expect(response.statusCode).to.eq(404)
        })
        it('Response status message is User was not created', () => {
            expect(response.body.message).to.eq('User was not created')
        })
    })

    describe('Register/create new user with missing email', () => {
        let response

        before(async () => {
            response = await registration(faker.company.name(), faker.name.firstName(), faker.name.lastName(), '', faker.internet.password())
        })
        it('Response status code is 404', () => {
            expect(response.statusCode).to.eq(404)
        })
        it('Response status message is User was not created', () => {
            expect(response.body.message).to.eq('User was not created')
        })
    })

    describe('Register/create new user with missing password', () => {
        let response

        before(async () => {
            response = await registration(faker.company.name(), faker.name.firstName(), faker.name.lastName(), 'user_' + Date.now() + '@gmail.com', '')
        })

        it('Response status code is 400', () => {
            expect(response.statusCode).to.eq(400)
        })
        it('Response status message is Wrong password format', () => {
            expect(response.body.message).to.eq('Wrong password format')
        })
    })

    describe('Register/create new user with existing email', () => {
        let response

        before(async () => {
            response = await registration(faker.company.name(), faker.name.firstName(), faker.name.lastName(), process.env.EMAIL, faker.internet.password())
        })

        it('Response status code is 409', () => {
            expect(response.statusCode).to.eq(409)
        })
        it('Response status message is User with this e-mail exists', () => {
            expect(response.body.message).to.eq('User with this e-mail exists')
        })
    })
})

describe('Get registered users', () => {
  describe('Get user by id', () => {
    let response
    let getUser
    let id

    before(async () => {
      response = await login(process.env.EMAIL, process.env.PASSWORD)
      id = response.body.payload.user._id
      getUser = await request(process.env.BASE_URL)
          .get(`/v5/user/${id}`)
          .set('Authorization', process.env.TOKEN)
    })

    it('Response body return status code 200', () => {
      expect(getUser.statusCode).eq(200)
    })

    it('Response body return correct message', () => {
      expect(getUser.body.message).eq('User found')
    })
  })

  describe('Get all users', () => {
    let response

    before(async () => {
      response = await request(process.env.BASE_URL)
          .post('/v5/user/search')
          .send({limit: 100, page: 1})
          .set('Authorization', process.env.TOKEN)
    })

    it('Response body return status code 200', () => {
      expect(response.statusCode).eq(200)
    })
  })
})
describe('Space trimming', () => {
    let res
    let response
    let newEmail = '  anna' + Date.now() + '@gmail.com   '
    before(async () => {
        res = await registration(faker.company.name(), faker.name.firstName(), faker.name.lastName(), newEmail, process.env.PASSWORD)
        response = await login(newEmail.trim(), process.env.PASSWORD)
    })

    it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
    })
})
