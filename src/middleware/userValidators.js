import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateSignUp= [
body('email')
 .notEmpty()
 .withMessage("Email is Required.")
 .bail()
 .trim()
 .escape()
 .isEmail()
 .withMessage("Email must be within proper format")
 .normalizeEmail(),

 body('password')
 .notEmpty()
 .withMessage('Password is Required.')
 .bail()
 .trim()
 .escape()
 .isLength({min:8, max:64})
 .withMessage('A minimum of 8 characters are required'),

body('role')
 .optional()
 .trim()
 .isIn(['USER','ADMIN']),

 handleValidationErrors
];



export const validateLogin= [
 body('email')
 .notEmpty()
 .trim()
 .withMessage("An Email is Required.")
 .isEmail()
 ,

 body('password')
 .notEmpty()
 .withMessage("Password is Required."),

 handleValidationErrors
];

export const validateUpdateUser =[
   
body('email')
 .optional()
 .trim()
 .escape()
 .isEmail()
 .withMessage("Email must be within proper format")
 .normalizeEmail(),

 body('password')
 .optional()
 .trim()
 .escape()
 .isLength({min:8, max:64})
 .withMessage('Password must have a minimum of 8 characters'),

  handleValidationErrors
]