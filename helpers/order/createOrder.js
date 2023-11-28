import request from "supertest";

export function createOrder(client, service, clientPrice, clientPaid, vendorPrice, vendorPaid){
    return request(process.env.BASE_URL)
        .post('/v5/order')
        .send({client, service, clientPrice, clientPaid, vendorPrice, vendorPaid})
        .set('Authorization', process.env.TOKEN)
}
export function createOrderWithAllInfo (client, service, clientPrice, clientPaid, vendorPrice, vendorPaid, description){
    return request(process.env.BASE_URL)
        .post('/v5/order')
        .send({client, service, clientPrice, clientPaid, vendorPrice, vendorPaid, description})
        .set('Authorization', process.env.TOKEN)
}