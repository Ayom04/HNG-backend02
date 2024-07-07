
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
			  include: [{
			    model: models.Organisation,
			    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }, // Exclude specified attributes
			    required: true, // Ensure it's a required join to get only matching organisations
			  }],
		});

	console.log(organisations)

		res.status(200).json({
         status: "success",
         message: "Organisations retrieved successfully",
         data: organisations,
       });
	}catch(error:any){
		console.log(error)
 		return response(res, 500,error.message|| messages.serverError)
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

	return response(res, 200, "organisation fetched successfully", organisation);
	}catch(error:any ){
		return response(res, 500,error.message|| messages.serverError)
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

	return response(res,200,'User added to organisation successfully'  )
      
  }catch(error:any){
  		return response(res, 500,error.message|| messages.serverError)
  }
}
export {
	createOrganisation,
	getUserOrganisation,
	getAnOrganisation,
	addUserToAnOrganisation
}