const request = require('supertest')
const { expect } = require('chai')

let baseUrl = 'http://localhost:3000'

describe('Testes de validação do endpoint Transferencias', () => {
    describe('POST /transferencias', ()=>{
        it('Deve retornar sucesso com código 201 quando o valor da transferencia for igual ou acima de R$10,00', async () => {
            const responseLogin = await request(baseUrl)
                            .post('/login')
                            .set('Content-Type', 'application/json')
                            .send({
                                username: "julio.lima",
                                senha: "123456"
                            })                
                            const token = responseLogin.body.token
            
            const response = await request(baseUrl)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 10.00,
                    token: ""
            })
            expect(response.status).to.equal(201)
        })
        
        it('Deve retornar erro com código 422 quando o valor da transferencia for abaixo de R$10,00', async () => {
            const responseLogin = await request(baseUrl)
                            .post('/login')
                            .set('Content-Type', 'application/json')
                            .send({
                                username: "julio.lima",
                                senha: "123456"
                            })                
                            const token = responseLogin.body.token
            
            const response = await request(baseUrl)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 2,
                    contaDestino: 1,
                    valor: 9.99,
                    token: ""
            })
            expect(response.status).to.equal(422)
        })
    })
})