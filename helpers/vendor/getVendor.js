import request from "supertest";

export function getVendorById (vendorId){
    return request(process.env.BASE_URL)
        .get(`/v5/vendor/${vendorId}`)
        .set('Authorization', process.env.TOKEN)
}
export function getVendorByName (vendorName){
    return request(process.env.BASE_URL)
        .post('/v5/vendor/search')
        .send({name: vendorName})
        .set('Authorization', process.env.TOKEN)
}
export function getAllVendors(){
    return request(process.env.BASE_URL)
        .post('/v5/vendor/search')
        .set('Authorization', process.env.TOKEN)
        .send({limit: 40})
}