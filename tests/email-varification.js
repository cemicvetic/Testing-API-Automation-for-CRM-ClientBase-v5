import { login, registration } from '../helpers/general'
import { faker } from '@faker-js/faker'
import request from 'supertest'
import {expect} from "chai";

describe('Email verification', () => {
  let user, str, endPoint, res, check
  const newEmail = 'user_' + Date.now() + '@gmail.com'

  before(async () => {
    user = await registration(
      // new user register API call
      faker.company.name(),
      faker.name.firstName(),
      faker.name.lastName(),
      newEmail,
      process.env.PASSWORD
    )
    str = await request(process.env.BASE_URL)     // get email API call
      .post('/email/search')
      .send({ email: newEmail })

    endPoint = str.body.payload.items[0].message
      .split('\n')[4]
      .split('https://clientbase.us')[1]

    res = await request(process.env.BASE_URL).get(endPoint).send()    // go to link API call

    check = await login(newEmail, process.env.PASSWORD)              // login API call
  })

  it('check the response status', () => {
    expect(res.statusCode).to.eq(200)
  })

  it('check the response message', () => {
    expect(res.body.message).to.include('confirmed')
  })

  it('check the role', () => {
    expect(check.body.payload.user.roles).to.include('verified')
  })
})
