import 'dotenv/config';
import {login} from "../helpers/general";

before(async () => {
    let response = await login (process.env.EMAIL, process.env.PASSWORD)
    process.env.TOKEN = response.body.payload.token
})