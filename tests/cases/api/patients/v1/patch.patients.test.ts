import supertest from 'supertest'
import { expect } from 'chai'
import app from '../../../../../src/app'
import { Gender } from "../../../../../src/enums";
import { Patient } from "../../../../../src/api/v1/patients/patch.patient";
import { isNumber, isObject } from "lodash";
import { number } from "joi";

const url = '/api/patients/v1'


describe(`[PATCH] ${url}`, () => {
  it('Update patient with valid values', async () => {
    const tempPatient: any = {
      firstName: "Adriano",
      lastName: "Dust",
      weight: 82,
      height: 95,
      identificationNumber: "bTzk1sD2eg b",
      gender: Gender.MALE,
      diagnoseID: 6
    }
    const patientID: number = 11

    const response = await supertest(app)
      .patch(url + '/' + patientID)
      .send(tempPatient)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(200)
    expect(response.type).to.eq("application/json");

    const response_2 = await supertest(app)
      .get(url + '/' + patientID)
      .set('Content-Type', 'application/json')

    for(let key in tempPatient){
      expect(response_2.body.patient[key]).to.eq(tempPatient[key])
    }
  })
  it('Update patient with not existing diagnoseID', async () => {
    const tempPatient: any = {
      firstName: "Adriano",
      lastName: "Dust",
      weight: 82,
      height: 95,
      identificationNumber: "bTzk1sD2eg b",
      diagnoseID: 777777
    }
    const patientID: number = 12

    const response = await supertest(app)
      .patch(url + '/' + patientID)
      .send(tempPatient)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(404)
    expect(response.type).to.eq("application/json");

    const response_2 = await supertest(app)
      .get(url + '/' + patientID)
      .set('Content-Type', 'application/json')

    for(let key in tempPatient){
      expect(response_2.body.patient[key]).not.eq(tempPatient[key])
    }
  })
  it('Update patient with invalid values', async () => {
    const tempPatient: any = {
      firstName: "",
      lastName: "Dust 123 sdaf  14 srf 1345 4 sdr2345235 asd 124",
      weight: 1000,
      height: 95,
      identificationNumber: "bTzk1sD2eg b",
      diagnoseID: 6
    }
    const patientID: number = 12

    const response = await supertest(app)
      .patch(url + '/' + patientID)
      .send(tempPatient)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(400)
    expect(response.type).to.eq("application/json");

    const response_2 = await supertest(app)
      .get(url + '/' + patientID)
      .set('Content-Type', 'application/json')

    for(let key in tempPatient){
      expect(response_2.body.patient[key]).not.eq(tempPatient[key])
    }
  })
  it('Update patient with invalid id', async () => {
    const tempPatient: any = {
      firstName: "Adriano",
      lastName: "Dust",
      weight: 82,
      height: 95,
      diagnoseID: 6
    }
    const patientID: number = 999999

    const response = await supertest(app)
      .patch(url + '/' + patientID)
      .send(tempPatient)
      .set('Content-Type', 'application/json')

    expect(response.status).to.eq(404)
    expect(response.type).to.eq("application/json");

  })

})