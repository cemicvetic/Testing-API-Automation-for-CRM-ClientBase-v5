import request from "supertest";

export function deleteOrder(orderId){
    return request(process.env.BASE_URL)
        .delete(`/v5/order/${orderId}`)
        .set('Authorization', process.env.TOKEN)
}