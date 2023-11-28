import request from "supertest";

export function createVendor (name){
    return request(process.env.BASE_URL)
        .post('/v5/vendor')
        .send({name})
        .set('Authorization', process.env.TOKEN)
}
export function createVendorWithAllInfo (name, phone, email, description){
    return request(process.env.BASE_URL)
        .post('/v5/vendor')
        .send({name, phone, email, description})
        .set('Authorization', process.env.TOKEN)
}