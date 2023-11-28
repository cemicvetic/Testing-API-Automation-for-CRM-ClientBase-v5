import request from "supertest";

export function updateService (id, name, vendorPrice, clientPrice){
    return request(process.env.BASE_URL)
        .patch(`/v5/service/${id}`)
        .send({ name, vendorPrice, clientPrice })
        .set('Authorization', process.env.TOKEN)
}