import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  removeComment,
} from '../services/commentService.js';

export async  function getAllCommentsHandler(req, res) {
  const {
    reviewId,
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
  } = req.query;

  const options = {
    reviewId: reviewId ? parseInt(reviewId) : undefined,
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  const comments = await getAllComments(options);
  res.status(200).json(comments);
}

export async function getCommentByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let comment = await getCommentById(id);
  res.status(200).json(comment);
}

export async function createCommentHandler(req, res) {
  const { reviewId, content } = req.body;
  const newComment = await createComment({ reviewId, content,reviewerId: req.user.id });
  res.status(201).json(newComment);
}

export async function updateCommentHandler(req, res) {
  let id = parseInt(req.params.id);
  const { content } = req.body;
  const updatedComment = await updateComment(id, { content });
  res.status(200).json(updatedComment);
}

export async function removeCommentHandler(req, res) {
  let id = parseInt(req.params.id);
  await removeComment(id);
  res.status(204).send();
}
