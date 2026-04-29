import express from 'express';
import {
  getAllCommentsHandler,
  getCommentByIdHandler,
  createCommentHandler,
  updateCommentHandler,
  removeCommentHandler,
} from '../controllers/commentController.js';

import {
  validateId,
  validateCreateComment,
  validateUpdateComment,
  validateCommentsQuery,
} from '../middleware/commentValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeOwnership } from '../middleware/authorizeCommentOwnership.js';
const router = express.Router();
router.get('/',authenticate, validateCommentsQuery, getAllCommentsHandler);
router.get('/:id',authenticate, validateId, getCommentByIdHandler);
router.post('/', authenticate, validateCreateComment, createCommentHandler);
router.put('/:id',authenticate, validateId, authorizeOwnership, validateUpdateComment, updateCommentHandler);
router.delete('/:id', authenticate, validateId, authorizeOwnership, removeCommentHandler);

export default router;
