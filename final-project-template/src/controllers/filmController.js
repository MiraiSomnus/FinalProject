import {
  getAllFilms,
  getFilmById,
  createFilm,
  updateFilm,
  removeFilm,
} from '../services/filmService.js';

export async function getAllFilmsHandler(req, res) {
  const {
    releaseYear,
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
  } = req.query;

  const options = {
    releaseYear: releaseYear ? parseInt(releaseYear) : undefined,
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  let films = await getAllFilms(options);
  res.status(200).json(films);
}

export async function getFilmByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let film = await getFilmById(id);
  res.status(200).json(film);
}

export async function createFilmHandler(req, res) {
  const { title, genre, director, releaseYear } = req.body;
  const newFilm = await createFilm({ title, genre, director, releaseYear, adminId: req.user.id });
  res.status(201).json(newFilm);
}

export async function updateFilmHandler(req, res) {
  const id = parseInt(req.params.id);
  const {title, genre, director, releaseYear} = req.body;
  const updatedFilm= await updateFilm(id, { title, genre, director, releaseYear });
  res.status(200).json(updatedFilm);
}

export async function removeFilmHandler(req, res) {
  const id = parseInt(req.params.id);
  await removeFilm(id);
  res.status(204).send();
}