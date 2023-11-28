import request from "supertest";

function login (email, password){
    return request(process.env.BASE_URL)
        .post('/v5/user/login')
        .send({ email, password })
}
function registration (companyName, firstName, lastName, email, password){
    return request(process.env.BASE_URL)
        .post('/v5/user')
        .send({ companyName, firstName, lastName, email, password })
}

export {login, registration}
