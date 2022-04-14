import supertest from 'supertest'
import { expect } from 'chai'
import app from '../../../../../src/app'
import { responseSchema, patientSchema } from './../../../../../src/api/v1/patients/get.patients'
import { isNumber, isObject } from "lodash";

const url = '/api/patients/v1'

describe(`[GET] ${url}`, () => {
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
  it('Response should return only 25 patient objects', async () => {
    const response = await supertest(app)
      .get(url)
      .query({
        limit: 25
      })
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(200)
    expect(response.type).to.eq('application/json')
    expect(response.body.count).to.eq(25)
  })
  it('Response should return one patient by specified id', async () => {
    const patientID: number = 23
    const response = await supertest(app)
      .get(url + '/' + patientID)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(200)
    expect(response.type).to.eq('application/json')

    expect(isObject(response.body.patient)).to.eq(true)
    const validationResult = patientSchema.validate(response.body.patient)
    expect(validationResult.error).to.eq(undefined)


  })
  it('Response should return one patient by specified id', async () => {
    const patientID: number = 2999

    const response = await supertest(app)
      .get(url + '/' + patientID.toString())
      .set('Content-Type', 'application/json')
    expect(response.status).to.eq(404)
    expect(response.type).to.eq("application/json");
  })
})

