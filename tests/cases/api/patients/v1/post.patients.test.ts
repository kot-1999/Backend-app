import supertest from 'supertest'
import { expect } from 'chai'
import app from '../../../../../src/app'
import { Gender } from "../../../../../src/enums";
import { Patient } from "../../../../../src/api/v1/patients/patch.patient";
import { isNumber, isObject } from "lodash";
import { number } from "joi";

const url = '/api/v1/patients'

const patient: Patient = {
  "firstName": "Adriano",
  "lastName": "Dust",
  "birthdate": "2004-02-01T01:18:12.278Z",
  "weight": 82,
  "height": 95,
  "identificationNumber": "bTzj1sD2eg b",
  "gender": Gender.MALE,
  "diagnoseID": 6
}


describe(`[POST] ${url}`, () => {
  it('Add a new patient with valid data', async () => {
    const response = await supertest(app)
      .post(url)
      .send(patient)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(200)
    expect(response.type).to.eq("application/json");
    expect(isObject(response.body.patient)).to.eq(true)
    expect(isNumber(response.body.patient.id)).to.eq(true)
  })
  it('Add a new patient with valid data and extra parameter', async () => {
    let tempPatient: any = Object.assign({}, patient)
    tempPatient.extra = 123
    const response = await supertest(app)
      .post(url)
      .send(tempPatient)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(400)
    expect(response.type).to.eq("application/json");
  })
  it('Add a new patient with valid data and missing parameter', async () => {
    let tempPatient: any = Object.assign({}, patient)
    delete tempPatient.firstName
    const response = await supertest(app)
      .post(url)
      .send(tempPatient)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(400)
    expect(response.type).to.eq("application/json");
  })
  it('Add a new patient with invalid firstName', async () => {
    let tempPatient: Patient = Object.assign({}, patient)
    tempPatient.firstName = ''
    const response = await supertest(app)
      .post(url)
      .send(tempPatient)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(400)
    expect(response.type).to.eq("application/json");
  })

  it('Add a new patient with invalid diagnoseID', async () => {
    let tempPatient: Patient = Object.assign({}, patient)
    tempPatient.diagnoseID = 333333
    const response = await supertest(app)
      .post(url)
      .send(tempPatient)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(404)
    expect(response.type).to.eq("application/json");
  })
  it('Add a new patient with existing identificationNumber', async () => {
    let tempPatient: Patient = Object.assign({}, patient)
    tempPatient.identificationNumber = '83052100u35d'

    const response = await supertest(app)
      .post(url)
      .send(patient)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(400)
    expect(response.type).to.eq("application/json");



  })
})