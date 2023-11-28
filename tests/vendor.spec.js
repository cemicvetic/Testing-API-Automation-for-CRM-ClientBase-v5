import { vendor } from '../helpers'
import { faker } from '@faker-js/faker'
import { expect } from 'chai'

after (async () => {
  let allVendors = (await vendor.getAllVendors()).body.payload.items
  for(let i = 0; i < allVendors.length; i++){
    await vendor.deleteVendor(allVendors[i]._id)
  }
})
describe('Vendor', () => {
  describe('Create vendor', () => {
    describe('Create vendor with only required credentials', () => {
      let response
      const vendorNane = faker.name.fullName()

      before(async () => {
        response = await vendor.createVendor(vendorNane)
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body returns correct message vendor created', () => {
        expect(response.body.message).to.eq('Vendor created')
      })

      it('Response body returns vendor id', () => {
        expect(response.body.payload).to.be.a('string')
      })
    })

    describe('Create vendor with all fields filled out', () => {
      let response

      before(async () => {
        response = await vendor.createVendorWithAllInfo (faker.name.fullName(), faker.phone.number(), faker.internet.email(), faker.company.name())
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body returns correct message vendor created', () => {
        expect(response.body.message).to.eq('Vendor created')
      })

      it('Response body returns vendors id', () => {
        expect(response.body.payload).to.be.a('string')
      })
    })

    describe('Create vendor with empty name field', () => {
      let response

      before(async () => {
        response = await vendor.createVendorWithAllInfo('', faker.phone.number(), faker.internet.email(), faker.company.name())
      })

        it('Response status code is 400', () => {
          expect(response.statusCode).to.eq(400)
        })

        it('Response body returns correct message Vendor create error', () => {
          expect(response.body.message).to.eq('Vendor create error')
        })
    })

    describe('Create vendor with all fields is being empty', () => {
      let response
      before(async () => {
        response = await vendor.createVendor ()
      })
      it('Response status code is 400', () => {
        expect(response.statusCode).to.eq(400)
      })

      it('Response body returns correct message Vendor create error', () => {
        expect(response.body.message).to.eq('Vendor create error')
      })
    })
  })

  describe('Get vendor by id', () => {
    describe('Get vendor by correct id', () => {
      let response, vendorId
      const vendorName = faker.name.fullName()

      before(async () => {
        vendorId = (await vendor.createVendor (vendorName)).body.payload
        response = await vendor.getVendorById (vendorId)
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body return correct message Get Vendor by id ok', () => {
        expect(response.body.message).to.eq('Get Vendor by id ok')
      })

      it('Response body returns correct vendor id', () => {
        expect(response.body.payload._id).to.eq(vendorId)
      })

      it('Response body returns correct vendor name', () => {
        expect(response.body.payload.name).to.eq(vendorName)
      })
    })

    describe('Get vendor by incorrect id', () => {
      let response
      before(async () => {
        response = await vendor.getVendorById('6461f8a98f1e783e12d94cb3')
      })

      it('Response status code is 404', () => {
        expect(response.statusCode).to.eq(404)
      })

      it('Response body return correct message No vendor for provided id', () => {
        expect(response.body.message).to.eq('No vendor for provided id')
      })
    })

    describe('Get vendor by invalid id syntax', () => {
      let response
      before(async () => {
        response = await vendor.getVendorById('000000')
      })

      it('Response status code is 400', () => {
        expect(response.statusCode).to.eq(400)
      })

      it('Response body return correct message Vendor get error', () => {
        expect(response.body.message).to.eq('Vendor get error')
      })
    })
  })

  describe('Get vendor by name', () => {
    describe('Get vendor by correct name', () => {
      let response
      const vendorName = faker.name.fullName()

      before(async () => {
        await vendor.createVendor(vendorName)
        response = await vendor.getVendorByName(vendorName)
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body return correct message Get VendorSearch ok', () => {
        expect(response.body.message).to.eq('VendorSearch ok')
      })

      it('Response body returns correct number of found vendors in itemCount', () => {
        expect(response.body.payload.pager.itemsCount).eq(1)
      })

      it('Response body returns correct number of found vendors in items', () => {
        expect(response.body.payload.items.length).eq(1)
      })
    })

    describe('Get vendor by incorrect name', () => {
      let response

      before(async () => {
        await vendor.createVendor(faker.name.fullName())
        response = await vendor.getVendorByName('AAAAA')
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body return correct message Get VendorSearch ok', () => {
        expect(response.body.message).to.eq('VendorSearch ok')
      })

      it('Response body returns correct number of found vendors in itemCount', () => {
        expect(response.body.payload.pager.itemsCount).eq(0)
      })

      it('Response body returns correct number of found vendors in items', () => {
        expect(response.body.payload.items.length).eq(0)
      })
    })
  })

  describe('Get all vendors', () => {
    let response
    before(async () => {
      response = await vendor.getAllVendors()
    })

    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })

    it('Response body returns correct message VendorSearch ok', () => {
      expect(response.body.message).to.eq('VendorSearch ok')
    })

    it('Response body returns more than 1 vendors', () => {
      expect(response.body.payload.items.length).to.be.gt(1)
    })
  })

  describe('Update vendor', () => {
    describe('Update vendor with correct id', () => {
      let vendorId
      const vendorName = 'Tom Smith'
      let response
      let getVendorRes

      before(async () => {
        vendorId = (
            await vendor.createVendor(
                faker.name.fullName()
            )
        ).body.payload
        response = await vendor.updateVendor(vendorName, vendorId)
        getVendorRes = await vendor.getVendorById(vendorId)
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response message is Vendor updated', () => {
        expect(response.body.message).to.eq('Vendor updated')
      })

      it('Verify the updated vendor name', () => {
        expect(getVendorRes.body.payload.name).to.eq(vendorName)
      })
    })

    describe('Update vendor with incorrect id', () => {
      const vendorName = 'Tom Smith'
      let response

      before(async () => {
        response = await vendor.updateVendor(vendorName, '6465048c1c1ebf4844e44542')
      })

      it('Response status code is 400', () => {
        expect(response.statusCode).to.eq(400)
      })

      it('Response message is Vendor not found', () => {
        expect(response.body.message).to.eq('Vendor not found')
      })
    })
  })

  describe('Delete vendor ', () => {
    describe('Delete vendor with valid id', () => {
      let vendorId
      let response
      let getVendorRes
      before(async () => {
        vendorId = (
            await vendor.createVendor(
                faker.name.fullName()
            )
        ).body.payload
        response = await vendor.deleteVendor(vendorId)
        getVendorRes = await vendor.getVendorById(vendorId)
      })

      it('Response status code is 200', () => {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body returns correct message Vendor deleted', () => {
        expect(response.body.message).to.eq('Vendor deleted')
      })

      it('Verify that vendor was deleted', () => {
        expect(getVendorRes.body.message).to.eq('No vendor for provided id')
      })
    })

    describe('Delete vendor with invalid id', () => {
      let vendorId = '64251a961c1ebf7414544829'
      let response
      before(async () => {
        response = await vendor.deleteVendor(vendorId)
      })

      it('Response status code is 400', () => {
        expect(response.statusCode).to.eq(400)
      })

      it('Response body returns correct message Vendor not found', () => {
        expect(response.body.message).to.eq('Vendor not found')
      })
    })

    describe('Delete vendor with no id', () => {
      let response
      before(async () => {
        response = await vendor.deleteVendor('')
      })

      it('Response status code is 404', () => {
        expect(response.statusCode).to.eq(404)
      })

      it('Response body returns correct message Vendor created', () => {
        expect(response.body.message).to.eq('API not found')
      })
    })
  })

})
