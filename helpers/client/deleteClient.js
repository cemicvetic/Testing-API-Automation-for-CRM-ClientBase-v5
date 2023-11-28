import request from "supertest";

export function deleteClient(clientId){
    return request(process.env.BASE_URL)
        .delete(`/v5/client/${clientId}`)
        .set('Authorization', process.env.TOKEN)
}