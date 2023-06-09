const express = require('express');
const router = express.Router();

//controllers
const restaurantController = require('./../controllers/restauran.controller');
const reviewController = require('./../controllers/review.controller')
//middlewares
const restaurantMiddleware = require('./../middlewares/restaurant.middleware');
const reviewMiddleware = require('./../middlewares/review.middlewares');
const authMiddleware = require('./../middlewares/auth.middleware');


router
    .route('/')
    .get(restaurantController.findAll)
    .post(authMiddleware.protect,
        authMiddleware.restrictTo('admin'),
        restaurantController.create);

router
    .route('/:id')
    .get(restaurantMiddleware.existRestaurant, restaurantController.findOne)
    .patch(
        restaurantMiddleware.existRestaurant,
        authMiddleware.protect,
        authMiddleware.restrictTo('admin'),
        restaurantController.update
    )
    .delete(
        restaurantMiddleware.existRestaurant,
        authMiddleware.protect,
        authMiddleware.restrictTo('admin'),
        restaurantController.delete
    );

router.use(authMiddleware.protect);

router.post(
    '/reviews/:id',
    restaurantMiddleware.existRestaurant,
    reviewController.create
);

router
    .use(
        '/reviews/:restaurantId/:id',
        reviewMiddleware.existReview,
        restaurantMiddleware.existRestaurant
    )

    .route('/reviews/:restaurantId/:id')
    .patch(reviewController.update)
    .delete(reviewController.delete);

module.exports = router;