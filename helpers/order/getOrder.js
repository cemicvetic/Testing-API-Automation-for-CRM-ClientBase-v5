import request from "supertest";

export function getOrderById (orderId){
    return request(process.env.BASE_URL)
        .get(`/v5/order/${orderId}`)
        .set('Authorization', process.env.TOKEN)
}
export function getAllOrders(){
    return request(process.env.BASE_URL)
        .post('/v5/order/search')
        .set('Authorization', process.env.TOKEN)
        .send({limit: 45})
}