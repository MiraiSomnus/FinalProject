import{
    findAllUsers,
    getById,
    update,
    remove,
    userRole

} from "../repositories/userRepo.js";

import{findByReviewerId} from "../repositories/reviewRepo.js"
import {Prisma} from "../generated/prisma/index.js";
import bcrypt from 'bcrypt';

export async function getAllUsers(){
    return findAllUsers();
}

export async function getUserById(id){
    const user = await getById(id);
    if(user) return user;
    else{
        const error = new Error(`User ID: ${id} cannot be found`);
        error.status = 404;
        throw error;
    }
}

export async function updateUser(id, updatedData){ 
    if(updatedData.password){
            const hashPassword = await bcrypt.hash(updatedData.password,10);
            updatedData.password = hashPassword;
    }
    try{
        const updatedUser = await update(id, updatedData);
        if (updatedUser) return updatedUser;
    }
    catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
         if(error.code ='P2002'){
            const error = new Error('This Email is already in use');
            error.status =409;
            throw error;
         }
        }
        throw error;
    }
}

export async function removeUser(id){
    const result = await remove(id);
    if (result) return;
    else{
        const error = new Error('User can not be found');
        error.status = 404;
        throw error;
    }
}

export async function getReviewsByUser(id){
    return findByReviewerId(id);
}

export async function updateUserRole(id,role){
    const updatedUserRole = await userRole(id,role);
    if(updateUserRole){
        return updateUserRole;
    }
    else{
        const error = new Error(`User ID: ${id} can not be found`);
        error.status = 404;
        throw error;

    }
}