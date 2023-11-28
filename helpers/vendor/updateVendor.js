import request from "supertest";

export function updateVendor(vendorName, vendorId){
    return request(process.env.BASE_URL)
        .patch(`/v5/vendor/${vendorId}`)
        .send({name: vendorName})
        .set('Authorization', process.env.TOKEN)
}