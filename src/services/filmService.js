import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/filmRepo.js';

export async function getAllFilms(options) {
  return getAll(options);
}

export async function getFilmById(id) {
  const film = await getById(id);
  if (film) return film;
  else {
    const error = new Error(`Film ID: ${id} can not be found`);
    error.status = 404;
    throw error;
  }
}

export async function createFilm(filmData) {
  return create(filmData);
}

export async function updateFilm(id, updatedData) {
  const updatedFilm= await update(id, updatedData);
  if (updatedFilm) return updatedFilm;
  else {
    const error = new Error(`Film ID: ${id} can not be found`);
    error.status = 404;
    throw error;
  }
}

export async function removeFilm(id) {
  const result= await remove(id);
  if (result) return;
  else {
    const error = new Error(`Film ID: ${id} can not be found`);
    error.status = 404;
    throw error;
  }
}