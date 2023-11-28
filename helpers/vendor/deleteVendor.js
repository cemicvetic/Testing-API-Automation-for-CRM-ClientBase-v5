import request from "supertest";

export function deleteVendor(vendorId){
    return request(process.env.BASE_URL)
        .delete(`/v5/vendor/${vendorId}`)
        .set('Authorization', process.env.TOKEN)
}