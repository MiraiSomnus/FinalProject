import prisma from '../config/db.js';

export async function getAll({ releaseYear,search, sortBy, order, offset, limit }) {
  const conditions = {};
    if(releaseYear){
        conditions.releaseYear=releaseYear;
    }
  
  if (search) {
    conditions.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { genre: { contains: search, mode: 'insensitive' } },
      { director: { contains: search, mode: 'insensitive' } },
    ];
  }
  const films = await prisma.film.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
    omit: {adminId:true}
  });
  return films;
}

export async  function getById(id) {
  const  film = await prisma.film.findUnique({where:{id} });
  return film;
}

export function create(filmData) {
  const newFilm= prisma.film.create({ data: filmData });
  return newFilm;
}

export async function update(id, updatedData) {
  try {
    const updatedFilm = await prisma.film.update({
      where: { id },
      data: updatedData,
    });
    return updatedFilm;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const removedFilm = await prisma.film.delete({
      where: { id },
    });
    return removedFilm;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}


