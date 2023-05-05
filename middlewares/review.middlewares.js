const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviews.models');

exports.existReview = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const review = await Review.findOne({
        where: {
            status: true,
            id,
        },
    });

    if (!review) return next(new AppError(`Review with id; ${id} not found`, 404));
    req.review = review;
    next();
});