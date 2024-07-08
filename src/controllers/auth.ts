import { NextFunction, Request,Response } from "express";
const models = require("../models")
import messages from "../constants/messages"
import { v4 as uuidv4 } from "uuid";
import { comparePassword, hashPassword } from "../utils/helper";
import response from "../utils/response";
import jwt from 'jsonwebtoken'

const registerUser = async(req:Request, res:Response, next:NextFunction)=>{
    const {firstName, lastName, email,password, phone}= req.body;
    try {
      
        const checkIfUserExist = await models.User.findOne({
           where:{email}
        })
   
        if(checkIfUserExist)throw new Error(messages.userExists)
 

        const { salt, hash } = await hashPassword(password);
        
     const user =   await models.User.create({
            userId:uuidv4(),
            firstName, lastName, email,password: hash, phone,
        })

      const organisation = await models.Organisation.create({
        orgId: uuidv4(),
        name: `${firstName}'s Organisation`
      })

      await models.UserOrganisation.create({
        UserId: user.dataValues.userId,
        OrganisationId: organisation.dataValues.orgId
      });
      
        const token = jwt.sign(
            {
              email: user.dataValues.email,
              _id: uuidv4(),
            },
            process.env.JWT_SECRET || "somethingsecret",
            {
              expiresIn: "24h",
            }
          );
          res.set("Authorization", `Bearer ${token}`);
          delete user.dataValues.id
          delete user.dataValues.createdAt
          delete user.dataValues.updatedAt
          delete user.dataValues.password
        return response({
          res,
          code: 201,
          message: "Registration successful",
          status_text: "succes",
          data: { accessToken: token, user },
        });
    } catch (error:any) {
      console.log(error)
        return response({
          res,
          code: 400,
          message: error.message || "Registration unsuccessful",
        });
    }


}

const logIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
  
    try {
  
      const user = await models.User.findOne({
        where: {
          email,
        },
      });
  
      if (!user) throw new Error(messages.invalidCredentials);
  
  
      const checkPasssword = await comparePassword(
        password,
        user.dataValues.password
      );
  
      if (!checkPasssword) throw new Error(messages.invalidCredentials);
  
      const token = jwt.sign(
        {
          email: user.dataValues.email,
          _id: uuidv4(),
        },
        process.env.JWT_SECRET || "somethingsecret",
        {
          expiresIn: "24h",
        }
      );
          delete user.dataValues.id
          delete user.dataValues.createdAt
          delete user.dataValues.updatedAt
          delete user.dataValues.password
      res.set("Authorization", `Bearer ${token}`);
      return response({res, code: 200, message:messages.loginSuccess,status_text:"success", data:{
        accessToken: token,
        user
      }});
    } catch (error: any) {
      return response({
        res,
        code: 401,
        message: "Authentication failed" || error.message ,
        status_text: "Bad request"
      });
    }
};

export {registerUser, logIn}