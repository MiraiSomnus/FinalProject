import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/commentRepo.js';

export async function getAllComments(options) {
  return getAll(options);
}

export async  function getCommentById(id) {
  const comment = await getById(id);
  if (comment) return comment;
  else {
    const error = new Error(`Comment ID: ${id} can not be found`);
    error.status = 404;
    throw error;
  }
}

export async function createComment(commentData) {
  return create(commentData);
}

export async function updateComment(id, updatedData) {
  const updatedComment = await update(id, updatedData);
  if (updatedComment) return updatedComment;
  else {
    const error = new Error(`Comment ID: ${id} can not be found`);
    error.status = 404;
    throw error;
  }
}

export async function removeComment(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Comment ID: ${id} can not be found`);
    error.status = 404;
    throw error;
  }
}
