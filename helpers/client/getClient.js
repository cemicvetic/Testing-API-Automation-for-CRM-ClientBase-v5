import request from "supertest";

export function getAllClients(){
    return request(process.env.BASE_URL)
        .post('/v5/client/search')
        .set('Authorization', process.env.TOKEN)
        .send({limit: 60})
}
export function getClientById (clientId){
    return request(process.env.BASE_URL)
        .get(`/v5/client/${clientId}`)
        .set('Authorization', process.env.TOKEN)
}
export function getClientByName (clientName){
    return request(process.env.BASE_URL)
        .post('/v5/client/search')
        .send({name: clientName})
        .set('Authorization', process.env.TOKEN)
}