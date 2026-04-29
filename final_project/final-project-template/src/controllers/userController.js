import {
    getAllUsers,
    getUserById,
    updateUser,
    removeUser,
    updateUserRole,
    getReviewsByUser,
} from "../services/userService.js";

export async function getAllUsersHandler(req,res){
    const users = await getAllUsers();
    res.status(200).json(users);
}

export async function getUserByIdHandler(req, res) {
  const id = parseInt(req.user.id);
  const user = await getUserById(id);
  res.status(200).json(user);
}

export async function updateUserHandler(req, res) {
  const id = parseInt(req.user.id);
  const { email, password } = req.body;
  const updatedUser= await updateUser(id, { email, password });
  res.status(200).json(updatedUser);
}

export async function removeUserHandler(req, res) {
  const id = parseInt(req.user.id);
  await removeUser(id);
  res.status(204).send();
}

export async function updateUserRoleHandler(req,res){
  const id = parseInt(req.params.id);
  const updates= {};
  updates.role =  req.body.role;
  const updatedRole = await updateUserRole(id,updates);
  res.status(200).json(updatedRole);

}

export async function getReviewsByUserHandler(req, res) {
  const id = parseInt(req.user.id);
  const reviews = await  getReviewsByUser(id);
  res.status(200).json(reviews);
}