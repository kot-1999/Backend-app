import supertest from 'supertest'
import { expect } from 'chai'
import app from '../../../../../src/app'
import { responseSchema } from './../../../../../src/api/v1/patients/get.patients'

const url = '/api/patients/v1'

describe(`[GET] ${url}/?limit=1`, () => {
  it('Response should return list of v1', async () => {
    const response = await supertest(app)
      .get(url)
      .set('Content-Type', 'application/json')


    expect(response.status).to.eq(200)
    expect(response.type).to.eq('application/json')

    const validationResult = responseSchema.validate(response.body)
    expect(validationResult.error).to.eq(undefined)
  })
  it('Response should return list of v1', async () => {
    const response = await supertest(app)
      .get(url)
      .query({
        random: 'random',
        order: 'lastName'
      })
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(400)
    expect(response.type).to.eq('application/json')
  })

})