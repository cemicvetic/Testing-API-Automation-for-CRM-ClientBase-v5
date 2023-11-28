import { expect } from 'chai'
import 'dotenv/config'
import {login} from "../helpers/general";

describe('Authorization test', () => {
  describe('Authorization with valid credentials', () => {
    let response
    before(async () => {
      response = await login(process.env.EMAIL, process.env.PASSWORD)
    })
    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('Auth success')
    })
    it('Response body returns token', () => {
      expect(response.body.payload.token).to.be.a('string')
    })
  })

  describe('Authorization with invalid email', () => {
    let response
    before(async () => {
      response = await login('5555@gmail.com', process.env.PASSWORD)
    })
    it('Response body returns code is 400', () => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response body returns error message', () => {
      expect(response.body.message).to.eq('Auth failed')
    })
  })

  describe('Authorization with invalid password', () => {
    let response
    before(async () => {
      response = await login(process.env.EMAIL, '123654')
    })
    it('Response body returns code is 400', () => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response body returns error message', () => {
      expect(response.body.message).to.eq('Auth failed')
    })
  })

  describe('Authorization without email', () => {
    let response
    before(async () => {
      response = await login( process.env.PASSWORD)
    })
    it('Response body returns code is 400', () => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response body returns error message', async () => {
      expect(response.body.message).to.eq('Auth failed')
    })
  })

  describe('Authorization without password', () => {
    let response
    before(async () => {
      response = await login(process.env.EMAIL)
    })
    it('Response body returns code is 400', async () => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response body returns error message', async () => {
      expect(response.body.message).to.eq('Auth failed')
    })
  })

  describe('Authorization without any credentials', () => {
    let response
    before(async () => {
      response = await login()
    })
    it('Response body returns code is 400', async () => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response body returns error message', async () => {
      expect(response.body.message).to.eq('Auth failed')
    })
  })
})
describe('Space trimming', () => {
  let response
  before(async () => {
    response = await login('    forest@owner.com  '.trim(), process.env.PASSWORD)
  })
  it('Response status code is 200', () => {
    expect(response.statusCode).to.eq(200)
  })
})