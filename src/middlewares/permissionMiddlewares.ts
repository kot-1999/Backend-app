import { NextFunction, Request, Response } from "express";
import { UserRole } from "../enums";

export default (permissions: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user
  if(permissions.includes(user.role)) {
    return next();
  }

  return res.status(401).json({
    message: 'Forbidden'
  })
}

export const checkAccessPermissions = () => {
  return(req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user
    if(req.method === 'GET' && user.patientID !== req.params.patientID)
      return res.status(401).json({
        message: 'Forbidden'
      })
    return next();
  }
}

