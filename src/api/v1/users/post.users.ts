import { Request, Response } from "express";
import { models } from "../../../db";


export const workflow = async (req: Request, res: Response) => {
  const {body} = req

  const user = await models.User.create(body)

  if(user){
    return res.status(200).json({
      "messages": [
        {
          "message": "New user was added",
          "type": "SUCCESS"
        }
      ],
      "user": {
        "id": user.id
      }
    })
  }else{
    return res.status(400).json({
      "messages": [
        {
          "type": "FAIL"
        }
      ]
    })
  }


}