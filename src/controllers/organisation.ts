
import messages from "../constants/messages"
const models = require("../models")
import { v4 as uuidv4 } from "uuid";
import {Request, Response} from "express"
import response from "../utils/response"
const createOrganisation = async( req:Request,res:Response)=>{
	const {userId} = req.params
	const {name, description} = req.body
	try{

	if(!userId)throw new Error(messages.unauthorizedPermission)

	const organisation = await models.Organisation.create({
      orgId:uuidv4(),
      name,
      description,
    });

   await models.UserOrganisation.create({
	    userId,
        orgId:organisation.dataValues.orgId,
   })

    return response(res, 201, messages.organisationCreated)
	}catch(error:any){
		 return response(res, 500,error.message|| messages.serverError)
	}
}

const getUserOrganisation = async( req:Request,res:Response)=>{
	const {userId} =req.params
	try{
		if(!userId)throw new Error(messages.unauthorizedPermission)
		
		const organisations = await models.UserOrganisation.findAll({
			where: { UserId: userId },
			include: [models.Organisation]
    	});

		res.status(200).json({
         status: "success",
         message: "Organisations retrieved successfully",
         data: organisations.map((organisations: { Organisation: any; }) => organisations.Organisation),
       });
	}catch(error:any){
 		return response(res, 500,error.message|| messages.serverError)
	}
}

const getAnOrganisation = async( req:Request,res:Response)=>{
	const {orgId,userId}= req.params
	try{
		
	const organisation = await models.Organisation.findOne({
    where: { orgId },
    include: [models.Organisation],
  });

	if(!organisation)throw new Error(messages.notFound)

	return response(res, 200, "organisation fetched successfully", organisation);
	}catch(error:any ){
		return response(res, 500,error.message|| messages.serverError)
	}
}

export {
	createOrganisation,
	getUserOrganisation,
	getAnOrganisation
}