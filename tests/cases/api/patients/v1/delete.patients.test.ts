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


describe(`[DELETE] ${url}`, () => {
  it('Delete existing patient', async () => {
    const patientID: number = 999

    const response = await supertest(app)
      .delete(url + '/' + patientID)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(200)
    expect(response.type).to.eq("application/json");
    expect(isObject(response.body.patient)).to.eq(true)
    expect(response.body.patient.id).to.eq(patientID)

  })
  it('Delete not existing patient', async () => {
    const patientID: number = 6666

    const response = await supertest(app)
      .delete(url + '/' + patientID)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(404)
    expect(response.type).to.eq("application/json");
  })
  it('Delete patient with minus id', async () => {
    const patientID: number = -6666

    const response = await supertest(app)
      .delete(url + '/' + patientID)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(400)
    expect(response.type).to.eq("application/json");
  })
  it('Delete patient with wrong patientID', async () => {
    const patientID: number = 66

    const response = await supertest(app)
      .delete(url + '/asd' + patientID)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(400)
    expect(response.type).to.eq("application/json");
  })

})