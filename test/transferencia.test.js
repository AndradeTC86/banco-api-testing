const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { getToken } = require('../helpers/authentication')
const dados = require('../fixtures/postTransferencias.json')

describe('Testes de validação do endpoint Transferencias', () => {
    let token

    beforeEach(async () => {
        token = await getToken()
    })

    describe('POST /transferencias', ()=>{
        it('Deve retornar sucesso com código 201 quando o valor da transferencia for igual ou acima de R$10,00', async () => {            
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: dados[0].contaOrigem,
                    contaDestino: dados[0].contaDestino,
                    valor: dados[0].valor,
                    token: dados[0].token
            })
            expect(response.status).to.equal(201)
        })
        
        it('Deve retornar erro com código 422 quando o valor da transferencia for abaixo de R$10,00', async () => {           
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: dados[1].contaOrigem,
                    contaDestino: dados[1].contaDestino,
                    valor: dados[1].valor,
                    token: dados[1].token
            })
            expect(response.status).to.equal(422)
        })
    })

    describe('GET /transferencias/id', () => {
        it('Deve retornar sucesso com mensagem 200 e dados iguais ao registro de transferência contido no banco de dados quando o id for válido', async () => {
            const response = await request(process.env.BASE_URL)
            .get(`/transferencias/4`)
            .set('Authorization', `Bearer ${token}`)
            expect(response.status).to.equal(200)
            expect(response.body.id).to.equal(4)
            expect(response.body.conta_origem_id).to.equal(1)
            expect(response.body.conta_destino_id).to.equal(2)
        })
    })

    describe('GET /transferencias', async () => {
        it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async () => {
            const response = await request(process.env.BASE_URL)
            .get(`/transferencias?page=1&limit=10`)
            .set('Authorization', `Bearer ${token}`)
            expect(response.status).to.equal(200)
            expect(response.body.limit).to.equal(10)
            expect(response.body.transferencias).to.have.lengthOf(10)
        })
    })
})