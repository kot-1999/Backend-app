import { Request, Response } from "express";
import { map, toNumber, toString } from "lodash";
import { models } from "../../../db";
import { Gender, PersonType } from "../../../enums";
import Joi from "joi";

export const patientSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  firstName: Joi.string().max(25).required(),
  lastName: Joi.string().min(3).max(25).required(),
  birthdate: Joi.date().required().required(),
  weight: Joi.number().min(0.2).max(200).required(),
  height: Joi.number().min(10).max(250).required(),
  identificationNumber: Joi.string().length(12).required(),
  gender: Joi.valid(Gender.MALE, Gender.FEMALE).required(),
  diagnoseID: Joi.number().positive().required(),
  age: Joi.number().min(0).max(150).required(),
  personType: Joi.valid(PersonType.CHILD, PersonType.ADULT).required(),
  diagnose: Joi.object({
    id: Joi.number().integer().min(1).required(),
    name: Joi.string().max(100).required(),
    description: Joi.string().max(200).required(),
    substance: Joi.object({
      id: Joi.number().integer().min(1).required(),
      name: Joi.string().max(100).required(),
    }).required()
  }).required()
})

export const responseSchema = Joi.object({
  patients: Joi.array().items(patientSchema),
  count: Joi.number()
})




function calculateAge(birthdate: string){
  let dob: Date = new Date(birthdate)
  let month_diff: number = Date.now() - dob.getTime()
  let age_dt: Date = new Date(month_diff)
  let year: number = age_dt.getUTCFullYear()
  return Math.abs(year - 1970)
}

export const  get_all_patients = async (req: Request, res: Response) => {
  /*
  * Returns the v1 by patientID added to the path
  * res: 200 if everything is ok
  * res: 204 if there is no such v1
  * */
  let options: any = {
    attributes: ['id', 'firstName', 'lastName', 'birthdate', 'weight', 'height', 'identificationNumber', 'gender', 'diagnoseID'],
    include: [{
      model: models.Diagnose,
      required: true,
      attributes: ['id', 'name', 'description'],
      include: [{
        model: models.Substance,
        required: true,
        attributes: ['id', 'name'
          // , 'timeUnit', 'halfLife'
        ]
      }]
    }]
  }
  if(req.query.gender)
    options.where = { gender: req.query.gender }
  if(req.query.order)
    options.order = [toString(req.query.order).split(':')]
  if(req.query.limit)
    options.limit = req.query.limit
  if(req.query.page)
    options.offset = (req.query.limit) ? toNumber(req.query.limit) * toNumber(req.query.page) : req.query.page


  const [patients] = await Promise.all(
      [models.Patient.findAll(options)]
  )



  if(patients) {
    return res.status(200).json(
      {
        "patients": map(patients, (patient) => {
          const age = calculateAge(patient.birthdate)
          patient.setDataValue('age', age)
          patient.setDataValue('personType', age > 18 ? PersonType.ADULT : PersonType.CHILD)
          return patient
        }),
        "count": patients.length
      }
    );

  }

  return res.status(400).json({
    "messages": [
      {
        "message": `No patients were found`,
        "type": "NOT FOUND"
      }
    ]
  })
}


export const get_patient_by_id = async (req: Request, res: Response) => {
  const patientID: number = parseInt(req.params.patientID)

  const [patient] = await Promise.all(
    [
      models.Patient.findOne({
        attributes: ['id', 'firstName', 'lastName', 'birthdate', 'weight', 'height', 'identificationNumber', 'gender', 'diagnoseID'],
        include: [{
          model: models.Diagnose,
          required: true,
          attributes: ['id', 'name', 'description'],
          include: [{
            model: models.Substance,
            required: true,
            attributes: ['id', 'name'
              // , 'timeUnit', 'halfLife'
            ]
          }]
        }],
        where: {id: patientID}
      })
    ]
  )

  const age = calculateAge(patient.birthdate)
  patient.setDataValue('age', age)
  patient.setDataValue('personType', age > 18 ? PersonType.ADULT : PersonType.CHILD)

  if(patient) {
    return res.json({
      "status": 200,
      "patient": patient
    });

  }

  return res.json({
    "status": 404,
    "messages": [
      {
        "message": `Patient: ${patientID} was not found`,
        "type": "NOT FOUND"
      }
    ]
  })


}

