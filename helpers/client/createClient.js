import request from 'supertest'

export async function createClient(name, phone, email) {
  return request(process.env.BASE_URL)
    .post('/v5/client')
    .send({ name, phone, email })
    .set('Authorization', process.env.TOKEN)
}

export async function createClientWithFullInfo(name, phone, email, description) {
  return request(process.env.BASE_URL)
    .post('/v5/client')
    .send({ name, phone, email, description })
    .set('Authorization', process.env.TOKEN)
}
