import request from "supertest";

export function updateClient(clientName, clientPhone, clientId){
    return request(process.env.BASE_URL)
        .patch(`/v5/client/${clientId}`)
        .send({name: clientName, phone: clientPhone})
        .set('Authorization', process.env.TOKEN)
}