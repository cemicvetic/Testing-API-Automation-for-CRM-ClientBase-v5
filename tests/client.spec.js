import { faker } from '@faker-js/faker'
import { expect } from 'chai'
import { client } from '../helpers'

after (async () => {
  let allClients = (await client.getAllClients ()).body.payload.items
  for(let i = 0; i < allClients.length; i++){
    await client.deleteClient (allClients[i]._id)
  }
})
describe('Clients', () => {
  describe('Create client', () => {
    describe('Create client with only required credentials', () => {
      let response
      before(async () => {
        response = await client.createClient(
            faker.name.fullName(),
            faker.phone.number(),
            ''
        )
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body returns correct message Client created', () => {
        expect(response.body.message).to.eq('Client created')
      })

      it('Response body returns client id', () => {
        expect(response.body.payload).to.be.a('string')
      })
    })

    describe('Create client with all fields filled out', () => {
      let response
      before(async () => {
        response = await client.createClientWithFullInfo(faker.name.fullName(), faker.phone.number(), faker.internet.email(), 'local')
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body returns correct message Client created', () => {
        expect(response.body.message).to.eq('Client created')
      })

      it('Response body returns client id', () => {
        expect(response.body.payload).to.be.a('string')
      })
    })

    describe('Create client with empty name field', () => {
      let response
      before(async () => {
        response = await client.createClient(
            '',
            faker.phone.number(),
            faker.internet.email()
        )
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(400)
      })

      it('Response body returns correct message Client create error', () => {
        expect(response.body.message).to.eq('Client create error')
      })
    })

    describe('Create client with empty phone field', () => {
      // баг - клинт не должен быть создан. Обязательные поля - имя и телефон
      let response
      before(async () => {
        response = await client.createClient (
            faker.name.fullName(),
            '',
            faker.internet.email()
        )
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body returns correct message Client created', () => {
        expect(response.body.message).to.eq('Client created')
      })

      it('Response body returns client id', () => {
        expect(response.body.payload).to.be.a('string')
      })
    })

    describe('Create client with empty email field', () => {
      let response
      before(async () => {
        response = await client.createClient (
            faker.name.fullName(),
            faker.phone.number(),
            ''
        )
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body returns correct message Client created', () => {
        expect(response.body.message).to.eq('Client created')
      })

      it('Response body returns client id', () => {
        expect(response.body.payload).to.be.a('string')
      })
    })

    describe('Create client with all fields is being empty', () => {
      let response
      before(async () => {
        response = await client.createClient ()
      })
      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(400)
      })

      it('Response body returns correct message Client create error', () => {
        expect(response.body.message).to.eq('Client create error')
      })
    })
  })
  describe('Get client by id', () => {
    describe('Get client by correct id', () => {
      let response, clientId
      const clientName = faker.name.fullName()
      const clientPhone = faker.phone.number()
      const clientEmail = faker.internet.email()

      before(async () => {
        clientId = (await client.createClient (clientName, clientPhone, clientEmail)).body
            .payload
        response = await client.getClientById (clientId)
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body return correct message Get Client by id ok', () => {
        expect(response.body.message).to.eq('Get Client by id ok')
      })

      it('Response body returns correct client id', () => {
        expect(response.body.payload._id).to.eq(clientId)
      })

      it('Response body returns correct client name', () => {
        expect(response.body.payload.name).to.eq(clientName)
      })

      it('Response body returns correct client phone', () => {
        expect(response.body.payload.phone).to.eq(clientPhone)
      })

      it('Response body returns correct client email', () => {
        expect(response.body.payload.email).to.eq(clientEmail)
      })
    })

    describe('Get client by incorrect id', () => {
      let response
      before(async () => {
        response = await client.getClientById ('6461f8a98f1e783e12d94cb3')
      })

      it('Response status code is 404', () => {
        expect(response.statusCode).to.eq(404)
      })

      it('Response body return correct message No client for provided id', () => {
        expect(response.body.message).to.eq('No client for provided id')
      })
    })

    describe('Get client by invalid id syntax', () => {
      let response
      before(async () => {
        response = await client.getClientById ('000000')
      })

      it('Response status code is 400', () => {
        expect(response.statusCode).to.eq(400)
      })

      it('Response body return correct message Client get error', () => {
        expect(response.body.message).to.eq('Client get error')
      })
    })
  })
  describe('Get client by name', () => {
    describe('Get client by correct name', () => {
      let response
      const clientName = faker.name.fullName()

      before(async () => {
        await client.createClient (
            clientName,
            faker.phone.number(),
            faker.internet.email()
        )
        response = await client.getClientByName (clientName)
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body return correct message Get ClientSearch ok', () => {
        expect(response.body.message).to.eq('ClientSearch ok')
      })

      it('Response body returns correct number of found clients in itemCount', () => {
        expect(response.body.payload.pager.itemsCount).eq(1)
      })

      it('Response body returns correct number of found clients in items', () => {
        expect(response.body.payload.items.length).eq(1)
      })
    })

    describe('Get client by incorrect name', () => {
      let response

      before(async () => {
        await client.createClient (
            faker.name.fullName(),
            faker.phone.number(),
            faker.internet.email()
        )
        response = await client.getClientByName ('AAAAA')
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body return correct message Get ClientSearch ok', () => {
        expect(response.body.message).to.eq('ClientSearch ok')
      })

      it('Response body returns correct number of found clients in itemCount', () => {
        expect(response.body.payload.pager.itemsCount).eq(0)
      })

      it('Response body returns correct number of found clients in items', () => {
        expect(response.body.payload.items.length).eq(0)
      })
    })
  })
  describe('Get all clients', () => {
    let response
    before(async () => {
      await client.createClient(faker.name.fullName(), faker.phone.number(), faker.internet.email())
      response = await client.getAllClients ()
    })

    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })

    it('Response body returns correct message ClientSearch ok', () => {
      expect(response.body.message).to.eq('ClientSearch ok')
    })

    it('Response body returns array of clients', () => {
      expect(response.body.payload.items.length).to.be.at.least(1)
    })

    it('Response body returns at least 1 client', () => {
      expect(response.body.payload.items.length).to.be.at.least(1)
    })
  })

  describe('Update client', () => {
    describe('Update client with correct id', () => {
      let clientId
      const clientName = 'Anna White'
      const clientPhone = '555555'
      let response
      let getClientRes

      before(async () => {
        clientId = (
            await client.createClient (
                faker.name.fullName(),
                faker.phone.number(),
                faker.internet.email()
            )
        ).body.payload
        response = await client.updateClient (clientName, clientPhone, clientId)
        getClientRes = await client.getClientById (clientId)
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response message is Client updated', () => {
        expect(response.body.message).to.eq('Client updated')
      })

      it('Varify the updated client name', () => {
        expect(getClientRes.body.payload.name).to.eq(clientName)
      })

      it('Validaterify the updated client phone', () => {
        expect(getClientRes.body.payload.phone).to.eq(clientPhone)
      })
    })

    describe('Update client with incorrect id', () => {
      const clientName = 'Anna White'
      const clientPhone = '555555'
      let response

      before(async () => {
        response = await client.updateClient (clientName, clientPhone, '6465048c1c1ebf4844e44542')
      })

      it('Response status code is 400', () => {
        expect(response.statusCode).to.eq(400)
      })

      it('Response message is Client not found', () => {
        expect(response.body.message).to.eq('Client not found')
      })
    })
  })
  describe('Delete client ', () => {
    describe('Delete client with valid id', () => {
      let clientId
      let response
      let getClientRes
      before(async () => {
        clientId = (
            await client.createClient (
                faker.name.fullName(),
                faker.phone.number(),
                faker.internet.email()
            )
        ).body.payload
        response = await client.deleteClient (clientId)
        getClientRes = await client.getClientById (clientId)
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body returns correct message Client deleted', () => {
        expect(response.body.message).to.eq('Client deleted')
      })

      it('Verify that client was deleted', () => {
        expect(getClientRes.body.message).to.eq('No client for provided id')
      })
    })

    describe('Delete client with invalid id', () => {
      let clientId = '64251a961c1ebf7414544829'
      let response
      before(async () => {
        response = await client.deleteClient (clientId)
      })

      it('Response status code is 400', () => {
        expect(response.statusCode).to.eq(400)
      })

      it('Response body returns correct message Client not found', () => {
        expect(response.body.message).to.eq('Client not found')
      })
    })

    describe('Delete client with no id', () => {
      let response
      before(async () => {
        response = await client.deleteClient ('')
      })

      it('Response status code is 404', () => {
        expect(response.statusCode).to.eq(404)
      })

      it('Response body returns correct message API not found', () => {
        expect(response.body.message).to.eq('API not found')
      })
    })
  })
});

