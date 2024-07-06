import {Request, Response} from 'express';
import response from "../utils/response"
import messages from '../constants/messages';
const models= require("../models")

const getUserDetails = async(req:Request, res:Response)=>{
const {userId} = req.params;
try {
    const user = await models.User.findOne({userId:userId})

    if(!user) throw new Error(messages.userNotFound)
        
    delete user.dataValues.id
    delete user.dataValues.createdAt
    delete user.dataValues.updatedAt
    return response(res, 200, messages.userFetched, user);
} catch (error:any) {
    return response(res, 500,error.messag|| messages.serverError)
}
}

export {
    getUserDetails
}