import prisma from '../config/db.js';

export async function getAll({ reviewId, search, sortBy, order, offset, limit }) {
  const conditions = {};

  if (reviewId) {
    conditions.reviewId = reviewId;
  }

  if (search) {
    conditions.content = { contains: search, mode: 'insensitive' };
  }

  const comments = await prisma.comment.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });

  return comments;
}

export async  function getById(id) {
  const  comment = await prisma.comment.findUnique({where:{id} });
  return comment;
}

export async function create(commentData) {
  try  {
    const newComment = await prisma.comment.create({
      data: commentData
    });
    return newComment;
  } 
  catch(error) {
    if(error.code ==='P2003'){
    const err = new Error(
    `Cannot create comment: referenced post with id ${commentData.reviewId} does not exist`);
    err.status = 400;
    throw err;
   }
   else{
    throw error;
   }
    
  }
}

export async function update(id, updatedData) { 
 try{
    const updatedComment = await prisma.comment.update({
    where: {id},
    data: updatedData
  });
  return updatedComment;
  }
  catch(error){
    if(error.code==='P2025')return null;
      throw error;
  }
}


export async function remove(id) {
   try{
  const removedComment = await prisma.comment.delete({
    where: {id},
  });
  return removedComment;
 }
catch(error){
  if(error.code ==='P2025') return null;
  throw error;
 }
}