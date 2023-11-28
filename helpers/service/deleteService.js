import request from "supertest";

export function deleteService(serviceId){
    return request(process.env.BASE_URL)
        .delete(`/v5/service/${serviceId}`)
        .set('Authorization', process.env.TOKEN)
}