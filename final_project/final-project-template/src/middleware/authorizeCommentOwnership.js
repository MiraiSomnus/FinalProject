import { getCommentById } from "../services/commentService.js";

export async function authorizeOwnership(req,res,next) {
    const id = parseInt(req.params.id);
    const comment= await getCommentById(id);
    if(comment.reviewerId !== req.user.id){
        const error = new Error ("Forbidden: insufficient permission. ");
        error.status = 403;
        return next(error);
    }
    next();
}