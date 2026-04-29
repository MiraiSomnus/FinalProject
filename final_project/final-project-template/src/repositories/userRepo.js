import prisma from '../config/db.js';

export async function createUser(data){
     try{
        const newUser = await prisma.user.create({data,omit:{password:true}})
        return newUser;
     }
     catch(error){
        if(error.code === 'P2002'){
            const err = new Error('This Email is already in use');
            err.status = 409;
            throw err;
        }
        throw error;
     }
}

export async function findUserbyEmail(email){
    return prisma.user.findUnique({where: {email}});
}

export async function findAllUsers(){
    return prisma.user.findMany({omit:{password:true}});

}

export async function getById(id){
 const user = await prisma.user.findUnique({where: {id},
 select:{
    id:true,
    email:true,
    role:true
}});
    return user;
}

export async function update(id, updatedData){
 try{
    const updatedUser = await prisma.user.update({
     where:{ id },
     data: updatedData,
     select:{
        id:true,
        email:true,
        role: true
     }});
     return updatedUser;
} catch(error){
    if(error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id){
 try{
     const removedUser = await prisma.user.delete({
        where:{id},
    });
    return removedUser;
 } catch (error){
    if(error.code === 'P2025') return null;
    throw error;
 }
}

export async function userRole(id,updatedData) {
 try{
    const updatedUser = await prisma.user.update({
        where: { id },
        data: updatedData,
    });
    return updatedUser;
 } catch (error) {
   if(error.code === 'P2025') return null;
   throw error;
 }
    
}