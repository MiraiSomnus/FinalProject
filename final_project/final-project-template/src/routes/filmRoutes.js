import express from 'express';
import {
  getAllFilmsHandler,
  getFilmByIdHandler,
  createFilmHandler,
  updateFilmHandler,
  removeFilmHandler,
} from '../controllers/filmController.js';

import {
  validateId,
  validateCreateFilm,
  validateUpdateFilm,
  validateFilmQuery,
} from '../middleware/filmValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();
router.get('/',authenticate,validateFilmQuery, getAllFilmsHandler);
router.get('/:id',authenticate, validateId, getFilmByIdHandler);
router.post('/', authenticate,authorizeRoles('ADMIN'), validateCreateFilm, createFilmHandler);
router.put('/:id', authenticate,authorizeRoles('ADMIN'),validateId, validateUpdateFilm, updateFilmHandler);
router.delete('/:id', authenticate,authorizeRoles('ADMIN'),validateId, removeFilmHandler);

export default router;