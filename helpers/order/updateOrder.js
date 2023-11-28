import request from "supertest";

export function updateOrder (id, clientPrice, clientPaid, vendorPrice, vendorPaid){
    return request(process.env.BASE_URL)
        .patch(`/v5/order/${id}`)
        .send({ clientPrice, clientPaid, vendorPrice, vendorPaid })
        .set('Authorization', process.env.TOKEN)
}