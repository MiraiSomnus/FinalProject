import express from 'express';
import {
  getAllReviewsHandler,
  getReviewByIdHandler,
  createReviewHandler,
  updateReviewHandler,
  removeReviewHandler,
} from '../controllers/reviewController.js';

import {
  validateId,
  validateCreateReview,
  validateUpdateReview,
  validateReviewQuery,
} from '../middleware/reviewValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeOwnership } from '../middleware/authorizeReviewOwnership.js';
const router = express.Router();
router.get('/', validateReviewQuery, getAllReviewsHandler);
router.get('/:id', validateId, getReviewByIdHandler);
router.post('/', authenticate, validateCreateReview, createReviewHandler);
router.put('/:id', authenticate, validateId, authorizeOwnership,  validateUpdateReview, updateReviewHandler);
router.delete('/:id', authenticate, validateId, authorizeOwnership,  removeReviewHandler);

export default router;