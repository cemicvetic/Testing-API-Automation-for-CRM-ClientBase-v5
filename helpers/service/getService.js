import request from "supertest";

export function getServiceById (vendorId){
    return request(process.env.BASE_URL)
        .get(`/v5/service/${vendorId}`)
        .set('Authorization', process.env.TOKEN)
}
export function getServiceByName (vendorName){
    return request(process.env.BASE_URL)
        .post('/v5/service/search')
        .send({name: vendorName})
        .set('Authorization', process.env.TOKEN)
}
export function getAllServices(){
    return request(process.env.BASE_URL)
        .post('/v5/service/search')
        .set('Authorization', process.env.TOKEN)
        .send({limit: 50})
}