const request = require('supertest')
const login = require('../fixtures/postLogin.json')

const getToken = async (usuario, senha) => {
    const bodyLogin = {...login}
    const responseLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)                
    return responseLogin.body.token
}

module.exports = {
    getToken
}