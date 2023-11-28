import request from "supertest";

export function createService (name, vendor, vendorPrice, clientPrice){
    return request(process.env.BASE_URL)
        .post('/v5/service')
        .send({ name, vendor, vendorPrice, clientPrice })
        .set('Authorization', process.env.TOKEN)
}
export function createServiceWithAllInfo (name, vendor, vendorPrice, clientPrice, description){
    return request(process.env.BASE_URL)
        .post('/v5/service')
        .send({name, vendor, vendorPrice, clientPrice, description})
        .set('Authorization', process.env.TOKEN)
}