import { Request, Response} from "express";
const fs = require('fs');



export const workflow = (req: Request, res: Response) => {

  let patients: [{
    id: number
  }] = JSON.parse(fs.readFileSync('./src/api/v1/patients/patients.json'))

  const patientID: number = parseInt(req.params.patientID)
  for(let i:number = 0; i < patients.length; i++){
    if(patientID == patients[i].id){
      patients.splice(i, 1)
      fs.writeFileSync('./src/api/v1/patients/patients.json', JSON.stringify(patients))
      res.json({
        "status": 200,
        "messages": [
          {
            "message": `Patient ${patientID} was deleted`,
            "type": "SUCCESS"
          }
        ]
      })
      return
    }
  }
  res.json({
    "status": 204,
    "messages": [
      {
        "message": `Patient: ${patientID} was not found`,
        "type": "NO CONTENT"
      }
    ]
  })




}