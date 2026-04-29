import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];

export const validateCreateFilm = [
  body('title')
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('genre')
    .exists({ values: 'falsy' })
    .withMessage('genre is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('genre must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Genre must be at least 3 characters'),

    body('director')
    .exists({ values: 'falsy' })
    .withMessage('director is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('director must be a string')
    .bail()
    .isLength({ min: 5 })
    .withMessage('director must be at least 5 characters'),

    body('releaseYear')
    .exists({ values: 'falsy' })
    .withMessage('ReleaseYear is required')
    .bail()
    .isInt({min:1})
    .withMessage('ReleaseYear must be an Positive Integer ')
    .isLength({ min: 4, max:4 })
    .withMessage('ReleaseYear must be 4 characters'),

  handleValidationErrors,
];

export const validateUpdateFilm= [
  oneOf(
    [
      body('title').exists({ values: 'falsy' }),
      body('genre').exists({ values: 'falsy' }),
      body('director').exists({ values: 'falsy' }),
      body('releaseYear').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field (title, genre, director,releaseYear) must be provided' },
  ),

 body('title')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

 body('genre')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('genre must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Genre must be at least 3 characters'),

 body('director')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('director must be a string')
    .bail()
    .isLength({ min: 5 })
    .withMessage('director must be at least 5 characters'),

 body('releaseYear')
    .optional()
    .isInt({min:1})
    .withMessage('ReleaseYear must be an Positive Integer ')
    .isLength({ min: 4, max:4 })
    .withMessage('ReleaseYear must be 4 characters'),

  handleValidationErrors,
];

export const validateFilmQuery = [
 query('releaseYear')
    .optional()
    .isInt({ min: 1 })
    .withMessage('releaseYear must be a positive integer'),

 query('sortBy')
    .optional()
    .isIn(['id', 'title', 'genre','director','releaseYear'])
    .withMessage('sortBy must be one of id, title, genre, director,releaseYear'),

  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('order must be either asc or desc'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be a non-negative integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('limit must be an integer between 1 and 50'),

  handleValidationErrors,
];


