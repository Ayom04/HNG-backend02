
import messages from "../constants/messages"
const models = require("../models")
import { v4 as uuidv4 } from "uuid";
import {Request, Response} from "express"
import response from "../utils/response"

const createOrganisation = async( req:Request,res:Response)=>{
	const {userId} = req.params;
	console.log(req.params)
	const {name, description} = req.body
	try{

	if(!userId)throw new Error(messages.unauthorizedPermission)

	const organisation = await models.Organisation.create({
      orgId:uuidv4(),
      name,
      description,
    });

   await models.UserOrganisation.create({
	    UserId: userId,
        OrganisationId:organisation.dataValues.orgId,
   })

    return response({res, code:201,message: messages.organisationCreated})
	}catch(error:any){
		 return response({res, code:500,message: error.message|| messages.serverError})
	}
}

const getUserOrganisation = async( req:Request,res:Response)=>{
	const {userId} =req.params
	try{
		if(!userId)throw new Error(messages.unauthorizedPermission)
		
		const organisations = await models.UserOrganisation.findAll({
			  where: { UserId: userId },
			  include: [{
			    model: models.Organisation,
			    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }, // Exclude specified attributes
			    required: true, // Ensure it's a required join to get only matching organisations
			  }],
		});

	   return response({
		res,
		code:200,
        message: "Organization retrieved successfully",
		status_text:"success",
        data: organisations,
       })
	}catch(error:any){
		console.log(error)
 		return response({res, code:500, message:error.message|| messages.serverError})
	}
}

const getAnOrganisation = async( req:Request,res:Response)=>{
	const {orgId,userId}= req.params
	try{
		
		const organisation = await models.UserOrganisation.findAll({
			  where: { UserId: userId, OrganisationId: orgId},
			  include: [{
			    model: models.Organisation,
			    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }, // Exclude specified attributes
			    required: true, // Ensure it's a required join to get only matching organisations
			  }],
		});

	if(!organisation)throw new Error(messages.notFound)

	return response({res, code:200, message:"organisation fetched successfully",status_text:"succes", data:organisation});
	}catch(error:any ){
		return response({res, code:500,message :error.message|| messages.serverError})
	}
}

const addUserToAnOrganisation = async(req:Request,res:Response)=>{
	 const { orgId } = req.params;
  const { userId } = req.body;
  try{
  	const organisation = await models.Organisation.findOne({
  		where:{ orgId}
  	})
    const user = await models.User.findOne({
    	where: {userId}
    })

    if (!organisation) throw new Error('Organisation not found')

    if (!user)throw new Error('User not found') 
  const existingAssociation = await models.UserOrganisation.findOne({
      where: { UserId: userId, OrganisationId: orgId },
    });

    if (existingAssociation)throw new Error('User is already associated with this organisation')
   
    await models.UserOrganisation.findOrCreate({
      where: { UserId: userId, OrganisationId: orgId },
    });

	return response({res,code:200,message:'User added to organisation successfully',status_text:"success" } )
      
  }catch(error:any){
  		return response({res, code: 500,message: error.message|| messages.serverError})
  }
}
export {
	createOrganisation,
	getUserOrganisation,
	getAnOrganisation,
	addUserToAnOrganisation
}