import { getReviewById } from "../services/reviewService.js";

export async function authorizeOwnership(req,res,next) {
    const id = parseInt(req.params.id);
    const review = await getReviewById(id);
    if(review.reviewerId !== req.user.id){
        const error = new Error ("Forbidden: insufficient permission. ");
        error.status = 403;
        return next(error);
    }
    next();
}