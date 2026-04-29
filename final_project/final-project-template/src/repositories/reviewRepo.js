import prisma from '../config/db.js';

export async function getAll({ search, sortBy, order, offset, limit }) {
  const conditions = {};

  
  if (search) {
    conditions.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }
  const reviews = await prisma.review.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return reviews;
}

export async function getById(id) {
  const  review = await prisma.review.findUnique({ where: { id } });
  return review;
}

export function create(reviewData) {
  const newReview= prisma.review.create({ data: reviewData });
  return newReview;
}

export async function update(id, updatedData) {
  try {
    const updatedReview = await prisma.review.update({
      where: { id },
      data: updatedData,
    });
    return updatedReview;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedReview = await prisma.review.delete({
      where: { id },
    });
    return deletedReview;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function findByReviewerId(id){
  const reviews = await prisma.review.findMany({
    where: {reviewerId: id},
    select:{id:true,title:true ,content:true, rating:true,createdAt:true, reviewerId:true}
  });
  return reviews;

}