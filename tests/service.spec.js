import {faker} from "@faker-js/faker";
import {expect} from "chai";
import { vendor, service } from '../helpers'

after( async() => {
    const allServices = (await service.getAllServices()).body.payload.items
    for(let i = 0; i < allServices.length; i++){
        await service.deleteService(allServices[i]._id)
    }
});
describe('Service', () => {
    describe('Create service', () => {
        describe('Create service with only required credentials', () => {
            let response
            let vendorId

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                response = await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body returns correct message Service created', () => {
                expect(response.body.message).to.eq('Service created')
            })

            it('Response body returns vendor id', () => {
                expect(response.body.payload).to.be.a('string')
            })
        })

        describe('Create service with all fields filled out', () => {
            let response
            let vendorId

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                console.log(vendorId)
                response = await service.createServiceWithAllInfo(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price(), faker.commerce.productDescription())
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body returns correct message Service created', () => {
                expect(response.body.message).to.eq('Service created')
            })

            it('Response body returns vendors id', () => {
                expect(response.body.payload).to.be.a('string')
            })
        })

        describe('Create service with empty name field', () => {
            let response
            let vendorId

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                response = await service.createService('', vendorId, faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Service create error', () => {
                expect(response.body.message).to.eq('Service create error')
            })
        })

        describe('Create service with empty vendorId', () => {
            let response

            before(async () => {
                response = await service.createService(faker.company.bsNoun(), faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Service create error', () => {
                expect(response.body.message).to.eq('Service create error')
            })
        })

        describe('Create service with incorrect vendor id', () => {
            let response
            let vendorId

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                response = await service.createService(faker.company.bsNoun(), '6461aba21500cdea9a97474', faker.commerce.price(), faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Service create error', () => {
                expect(response.body.message).to.eq('Service create error')
            })
        })

        describe('Create service with empty vendorPrice field', () => {
            let response
            let vendorId

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                response = await service.createService(faker.company.bsNoun(), vendorId, '', faker.commerce.price())
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Service create error', () => {
                expect(response.body.message).to.eq('Service create error')
            })
        })

        describe('Create service with empty clientPrice field', () => {
            let response
            let vendorId

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                response = await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), '')
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Service create error', () => {
                expect(response.body.message).to.eq('Service create error')
            })
        })

        describe('Create service with all fields is being empty', () => {
            let response
            before(async () => {
                response = await service.createService ()
            })
            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Service create error', () => {
                expect(response.body.message).to.eq('Service create error')
            })
        })
    })

    describe('Get service by id', () => {
        describe('Get service by correct id', () => {
            let response, vendorId, serviceId
            const serviceName = faker.company.bsNoun()
            const vendorPrice = faker.commerce.price()
            const clientPrice = faker.commerce.price()

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                serviceId = (await service.createService(serviceName, vendorId, vendorPrice, clientPrice)).body.payload
                response = await service.getServiceById(serviceId)
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body return correct message Get Service by id ok', () => {
                expect(response.body.message).to.eq('Get Service by id ok')
            })

            it('Response body returns correct service id', () => {
                expect(response.body.payload._id).to.eq(serviceId)
            })

            it('Response body returns correct service name', () => {
                expect(response.body.payload.name).to.eq(serviceName)
            })

            it('Response body returns correct vendorPrice', () => {
                expect(response.body.payload.vendorPrice).to.eq(Number(vendorPrice))
            })

            it('Response body returns correct clientPrice', () => {
                expect(response.body.payload.clientPrice).to.eq(Number(clientPrice))
            })
        })

        describe('Get service by incorrect id', () => {
            let response
            before(async () => {
                response = await service.getServiceById('6461f8a98f1e783e12d94cb3')
            })

            it('Response status code is 404', () => {
                expect(response.statusCode).to.eq(404)
            })

            it('Response body return correct message No service for provided id', () => {
                expect(response.body.message).to.eq('No service for provided id')
            })
        })

        describe('Get service by invalid id syntax', () => {
            let response
            before(async () => {
                response = await service.getServiceById('000000')
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body return correct message Service get error', () => {
                expect(response.body.message).to.eq('Service get error')
            })
        })
    })

    describe('Get service by name', () => {
        describe('Get service by correct name', () => {
            let response
            let vendorId
            const serviceName = faker.company.bsNoun()

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                await service.createService(serviceName, vendorId, faker.commerce.price(), faker.commerce.price())
                response = await service.getServiceByName(serviceName)
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body return correct message Get Service Search ok', () => {
                expect(response.body.message).to.eq('Service Search ok')
            })

            it('Response body returns correct number of found services in itemCount', () => {
                expect(response.body.payload.pager.itemsCount).to.be.at.least(1)
            })

            it('Response body returns correct number of found services in items', () => {
                expect(response.body.payload.items.length).to.be.at.least(1)
            })
        })

        describe('Get service by incorrect name', () => {
            let response
            let vendorId

            before(async () => {
                vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())
                response = await service.getServiceByName('wrong name')
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body return correct message Get Service Search ok', () => {
                expect(response.body.message).to.eq('Service Search ok')
            })

            it('Response body returns correct number of found services in itemCount', () => {
                expect(response.body.payload.pager.itemsCount).eq(0)
            })

            it('Response body returns correct number of found services in items', () => {
                expect(response.body.payload.items.length).eq(0)
            })
        })
    })

    describe('Get all services', () => {
        let response
        let vendorId
        before(async () => {
            vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
            await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())
            response = await service.getAllServices()
        })

        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })

        it('Response body returns correct message Service Search ok', () => {
            expect(response.body.message).to.eq('Service Search ok')
        })

        it('Response body returns correct items', () => {
            expect(response.body.payload.items).to.be.an('array')
        })

        it('Response body returns more than 1 vendors', () => {
            expect(response.body.payload.items.length).to.be.at.least(1)
        })
    })

    describe('Update service', () => {
        describe('Update service with correct service id', () => {
            const serviceName = 'decor'
            const vendorPrice = 500
            const clientPrice = 777
            let response
            let getServiceRes

            before(async () => {
                const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
                response = await service.updateService (serviceId, serviceName, vendorPrice, clientPrice)
                getServiceRes = await service.getServiceById(serviceId)
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response message is Service updated', () => {
                expect(response.body.message).to.eq('Service updated')
            })

            it('Verify the updated service name', () => {
                expect(getServiceRes.body.payload.name).to.eq(serviceName)
            })

            it('Verify the updated vendor price', () => {
                expect(getServiceRes.body.payload.vendorPrice).to.eq(vendorPrice)
            })

            it('Verify the updated client price', () => {
                expect(getServiceRes.body.payload.clientPrice).to.eq(clientPrice)
            })
        })

        describe('Update service with incorrect service id', () => {
            const serviceName = 'Tom Smith'
            let response

            before(async () => {
                response = await service.updateService('666eb9a753a3e8e8b5416ecc', serviceName, 555, 888)
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response message is Service not found', () => {
                expect(response.body.message).to.eq('Service not found')
            })
        })

        describe('Update service with incorrect syntax service id', () => {
            let response

            before(async () => {
                response = await service.updateService('aaaaaaaa', 'Tom Smith', 555, 888)
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response message is Service update error', () => {
                expect(response.body.message).to.eq('Service update error')
            })
        })
    })

    describe('Delete service ', () => {
        describe('Delete service with valid id', () => {
            let response
            let getServiceRes
            before(async () => {
                const vendorId = (await vendor.createVendor(faker.name.fullName())).body.payload
                const serviceId = (await service.createService(faker.company.bsNoun(), vendorId, faker.commerce.price(), faker.commerce.price())).body.payload
                response = await service.deleteService(serviceId)
                getServiceRes = await service.getServiceById(serviceId)
            })

            it('Response status code is 200', () => {
                expect(response.statusCode).to.eq(200)
            })

            it('Response body returns correct message Service deleted', () => {
                expect(response.body.message).to.eq('Service deleted')
            })

            it('Verify that service was deleted', () => {
                expect(getServiceRes.body.message).to.eq('No service for provided id')
            })
        })

        describe('Delete service with invalid id', () => {
            let serviceId = '64251a561c3ebf7414544929'
            let response
            before(async () => {
                response = await service.deleteService(serviceId)
            })

            it('Response status code is 400', () => {
                expect(response.statusCode).to.eq(400)
            })

            it('Response body returns correct message Service created', () => {
                expect(response.body.message).to.eq('Service not found')
            })
        })

        describe('Delete service with no id', () => {
            let response
            before(async () => {
                response = await service.deleteService('')
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