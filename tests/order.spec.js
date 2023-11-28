import {faker} from "@faker-js/faker";
import {expect} from "chai";
import {order, client, service, vendor} from '../helpers/index'

after(async () => {
    let allOrders = (await order.getAllOrders()).body.payload.items
    for(let i = 0; i < allOrders.length; i++){
        await order.deleteOrder(allOrders[i]._id)
    }
    let allClients = (await client.getAllClients()).body.payload.items
    for(let i = 0; i < allClients.length; i++){
        await client.deleteClient(allClients[i]._id)
    }
});
describe('Order', () => {
    describe('Create order', () => {
        describe('Create order with only required credentials', () => {
            let response

            before(async () => {
                const clientId = (await client.createClient( faker.name.fullName(),  faker.phone.number(), faker.internet.email())).body.payload
                const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
                response = await order.createOrder(clientId, serviceId, faker.commerce.price(), faker.commerce.price(), faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body returns correct message Order created', () => {
                expect(response.body.message).to.eq('Order created')
            })

            it('Response body returns order id', () => {
                expect(response.body.payload).to.be.a('string')
            })
        })

        describe('Create order with all fields filled out', () => {
            let response

            before(async () => {
                const clientId = (await client.createClient( faker.name.fullName(),  faker.phone.number(), faker.internet.email())).body.payload
                const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
                response = await order.createOrderWithAllInfo(clientId, serviceId, faker.commerce.price(), faker.commerce.price(), faker.commerce.price(), faker.commerce.price(), faker.commerce.productDescription())
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body returns correct message Order created', () => {
                expect(response.body.message).to.eq('Order created')
            })

            it('Response body returns order id', () => {
                expect(response.body.payload).to.be.a('string')
            })
        })

        describe('Create order with empty client id field', () => {
            let response

            before(async () => {
                const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
                response = await order.createOrder('', serviceId, faker.commerce.price(), faker.commerce.price(), faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Order create error', () => {
                expect(response.body.message).to.eq('Order create error')
            })
        })

        describe('Create order with incorrect client id', () => {
            let response
            let vendorId

            before(async () => {
                const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
                response = await order.createOrder('6379c2c8f05e086755abc612', serviceId, faker.commerce.price(), faker.commerce.price(), faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Order create error', () => {
                expect(response.body.message).to.eq('Order create error')
            })
        })

        describe('Create order with empty service id field', () => {
            let response

            before(async () => {
                const clientId = (await client.createClient( faker.name.fullName(),  faker.phone.number(), faker.internet.email())).body.payload
                response = await order.createOrder(clientId, '', faker.commerce.price(), faker.commerce.price(), faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Order create error', () => {
                expect(response.body.message).to.eq('Order create error')
            })
        })

        describe('Create order with incorrect service id', () => { // баг - order не должен быть создан
            let response
            let vendorId

            before(async () => {
                const clientId = (await client.createClient( faker.name.fullName(),  faker.phone.number(), faker.internet.email())).body.payload
                response = await order.createOrder(clientId, '5379c2c3f05e086755abc912', faker.commerce.price(), faker.commerce.price(), faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body returns correct message Order created', () => {
                expect(response.body.message).to.eq('Order created')
            })
        })

        describe('Create order with empty client price field', () => {
            let response

            before(async () => {
                const clientId = (await client.createClient( faker.name.fullName(),  faker.phone.number(), faker.internet.email())).body.payload
                const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
                response = await order.createOrder(clientId, serviceId, '', faker.commerce.price(), faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Order create error', () => {
                expect(response.body.message).to.eq('Order create error')
            })
        })

        describe('Create order with empty client paid field', () => {
            let response

            before(async () => {
                const clientId = (await client.createClient( faker.name.fullName(),  faker.phone.number(), faker.internet.email())).body.payload
                const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
                response = await order.createOrder(clientId, serviceId, faker.commerce.price(), '', faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Order create error', () => {
                expect(response.body.message).to.eq('Order create error')
            })
        })

        describe('Create order with empty vendor price field', () => {
            let response

            before(async () => {
                const clientId = (await client.createClient( faker.name.fullName(),  faker.phone.number(), faker.internet.email())).body.payload
                const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
                response = await order.createOrder(clientId, serviceId, faker.commerce.price(), faker.commerce.price(), '', faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Order create error', () => {
                expect(response.body.message).to.eq('Order create error')
            })
        })

        describe('Create order with empty vendor paid field', () => {
            let response

            before(async () => {
                const clientId = (await client.createClient( faker.name.fullName(),  faker.phone.number(), faker.internet.email())).body.payload
                const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
                response = await order.createOrder(clientId, serviceId, faker.commerce.price(), faker.commerce.price(), faker.commerce.price(), '')
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Order create error', () => {
                expect(response.body.message).to.eq('Order create error')
            })
        })

        describe('Create order with all fields is being empty', () => {
            let response
            before(async () => {
                response = await order.createOrder()
            })
            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Order create error', () => {
                expect(response.body.message).to.eq('Order create error')
            })
        })
    })
    describe('Get order by id', () => {
        describe('Get order by correct id', () => {
            let response, orderId, clientId
            const clientName = faker.name.fullName()
            const clientPrice = faker.commerce.price()
            const clientPaid = faker.commerce.price()
            const vendorPrice = faker.commerce.price()
            const vendorPaid = faker.commerce.price()

            before(async () => {
                clientId = (await client.createClient( clientName,  faker.phone.number(), faker.internet.email())).body.payload
                const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
                orderId = (await order.createOrder(clientId, serviceId, clientPrice, clientPaid, vendorPrice, vendorPaid)).body.payload
                response = await order.getOrderById(orderId)

            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body return correct message Get Order by id ok', () => {
                expect(response.body.message).to.eq('Get Order by id ok')
            })

            it('Response body returns correct order id', () => {
                expect(response.body.payload._id).to.eq(orderId)
            })

            it('Response body returns correct client id', () => {
                expect(response.body.payload.client._id).to.eq(clientId)
            })

            it('Response body returns correct client name', () => {
                expect(response.body.payload.client.name).to.eq(clientName)
            })

            it('Response body returns correct client price', () => {
                expect(response.body.payload.clientPrice).to.eq(Number(clientPrice))
            })

            it('Response body returns correct client paid', () => {
                expect(response.body.payload.clientPaid).to.eq(Number(clientPaid))
            })

            it('Response body returns correct client debt', () => {
                expect(response.body.payload.clientDebt).to.eq(Number(clientPrice) - Number(clientPaid))
            })

            it('Response body returns correct vendor price', () => {
                expect(response.body.payload.vendorPrice).to.eq(Number(vendorPrice))
            })

            it('Response body returns correct vendor paid', () => {
                expect(response.body.payload.vendorPaid).to.eq(Number(vendorPaid))
            })

            it('Response body returns correct vendor debt', () => {
                expect(response.body.payload.vendorDebt).to.eq(Number(vendorPrice) - Number(vendorPaid))
            })
        })

        describe('Get order by incorrect id', () => {
            let response
            before(async () => {
                response = await order.getOrderById('6481f8a28f1e783e12d54cb3')
            })

            it('Response status code is 404', () => {
                expect(response.statusCode).to.eq(404)
            })

            it('Response body return correct message No order for provided id', () => {
                expect(response.body.message).to.eq('No order for provided id')
            })
        })

        describe('Get order by invalid id syntax', () => {
            let response
            before(async () => {
                response = await order.getOrderById('000000')
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body return correct message Order get error', () => {
                expect(response.body.message).to.eq('Order get error')
            })
        })
    })

    describe('Get all orders', () => {
        let response

        before(async () => {
            const clientId = (await client.createClient( faker.name.fullName(),  faker.phone.number(), faker.internet.email())).body.payload
            const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
            const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
            await order.createOrder(clientId, serviceId, faker.commerce.price(), faker.commerce.price(), faker.commerce.price(), faker.commerce.price())
            response = await order.getAllOrders()
        })

        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })

        it('Response body returns correct message Order Search ok', () => {
            expect(response.body.message).to.eq('OrderSearch ok')
        })

        it('Response body returns correct items', () => {
            expect(response.body.payload.items).to.be.an('array')
        })

        it('Response body returns more than 1 orders', () => {
            expect(response.body.payload.items.length).to.be.at.least(1)
        })
    })

    describe('Update order', () => {
        describe('Update order with correct order id', () => {
            let response, orderId, clientId, updatedResponse
            const clientPrice = 500
            const clientPaid = 250
            const vendorPrice = 700
            const vendorPaid = 350

            before(async () => {
                clientId = (await client.createClient( faker.name.fullName(),  faker.phone.number(), faker.internet.email())).body.payload
                const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
                orderId = (await order.createOrder(clientId, serviceId, faker.commerce.price(), faker.commerce.price(), faker.commerce.price(), faker.commerce.price())).body.payload
                response = await order.updateOrder(orderId, clientPrice, clientPaid, vendorPrice, vendorPaid)
                updatedResponse = await order.getOrderById(orderId)

            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response message is Order updated', () => {
                expect(response.body.message).to.eq('Order updated')
            })

            it('Response body returns correct client price', () => {
                expect(updatedResponse.body.payload.clientPrice).to.eq(Number(clientPrice))
            })

            it('Response body returns correct client paid', () => {
                expect(updatedResponse.body.payload.clientPaid).to.eq(Number(clientPaid))
            })

            it('Response body returns correct client debt', () => {
                expect(updatedResponse.body.payload.clientDebt).to.eq(Number(clientPrice) - Number(clientPaid))
            })

            it('Response body returns correct vendor price', () => {
                expect(updatedResponse.body.payload.vendorPrice).to.eq(Number(vendorPrice))
            })

            it('Response body returns correct vendor paid', () => {
                expect(updatedResponse.body.payload.vendorPaid).to.eq(Number(vendorPaid))
            })

            it('Response body returns correct vendor debt', () => {
                expect(updatedResponse.body.payload.vendorDebt).to.eq(Number(vendorPrice) - Number(vendorPaid))
            })
        })

        describe('Update order with incorrect order id', () => {
            const serviceName = 'Tom Smith'
            let response

            before(async () => {
                response = await order.updateOrder('657eb9a753a3e8e2b5416ecc', 555, 400, 880, 900)
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response message is Order not found', () => {
                expect(response.body.message).to.eq('Order not found')
            })
        })

        describe('Update order with incorrect syntax order id', () => {
            let response

            before(async () => {
                response = await order.updateOrder('aaaaaaaa', 400, 555, 888, 650)
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response message is Order update error', () => {
                expect(response.body.message).to.eq('Order update error')
            })
        })
    })

    describe('Delete order ', () => {
        describe('Delete order with valid id', () => {
            let orderId
            let response
            let getOrderRes

            before(async () => {
                const clientId = (await client.createClient( faker.name.fullName(),  faker.phone.number(), faker.internet.email())).body.payload
                const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
                orderId = (await order.createOrder(clientId, serviceId, faker.commerce.price(), faker.commerce.price(), faker.commerce.price(), faker.commerce.price())).body.payload
                response = await order.deleteOrder(orderId)
                getOrderRes = await order.getOrderById(orderId)
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body returns correct message Order deleted', () => {
                expect(response.body.message).to.eq('Order deleted')
            })

            it('Verify that order was deleted', () => {
                expect(getOrderRes.body.message).to.eq('No order for provided id')
            })
        })

        describe('Delete order with invalid id', () => {
            let response

            before(async () => {
                response = await order.deleteOrder('6457c689f04e086735abc961')
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Order delete error', () => {
                expect(response.body.message).to.eq('Order delete error')
            })
        })

        describe('Delete order with no id', () => {
            let response
            before(async () => {
                response = await order.deleteOrder('')
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