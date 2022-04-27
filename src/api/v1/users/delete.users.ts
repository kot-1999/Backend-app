import { Request, Response } from "express";
import { models } from "../../../db";
import { UserModel } from "../../../db/models/user_model";


export const workflow = async (req: Request, res: Response) => {
  const userID: number = parseInt(req.params.userID)

  // try{
  //   const users: UserModel = await models.User.findOne({where: {id: userID}})
  //   if(!users){
  //     return res.status(404).json({
  //       messages: [{
  //         message: `Patient: ${userID} was not found`,
  //         type: "NOT FOUND"
  //       }]
  //     })
  //   }
  //   await models.Patient.destroy({ where: { id: userID } })
  //   res.status(200).json({
  //     messages: [{
  //       message: `Patient ${userID} was deleted`,
  //       type: "SUCCESS"
  //     }],
  //     patient: {
  //       id: userID
  //     }
  //   })
  // }catch (e){
  //   res.status(400).json({
  //     messages: [{
  //       message: e.message,
  //       type: "ERROR"
  //     }]
  //   })
  // }
}