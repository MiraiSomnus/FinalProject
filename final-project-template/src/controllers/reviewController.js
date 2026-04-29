import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  removeReview,
} from '../services/reviewService.js';

export async function getAllReviewsHandler(req, res) {
  const {
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
  } = req.query;

  const options = {
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  let reviews= await getAllReviews(options);
  res.status(200).json(reviews);
}

export async function getReviewByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const review = await getReviewById(id);
  res.status(200).json(review);
}

export async function createReviewHandler(req, res) {
  const { title, content, rating } = req.body;
  const newReview = await createReview({ title, content, rating, reviewerId: req.user.id });
  res.status(201).json(newReview);
}

export async function updateReviewHandler(req, res) {
  const id = parseInt(req.params.id);
  const { title, content, rating } = req.body;
  const updatedReview = await updateReview(id, { title, content, rating });
  res.status(200).json(updatedReview);
}

export async function removeReviewHandler(req, res) {
  const id = parseInt(req.params.id);
  await removeReview(id);
  res.status(204).send();
}