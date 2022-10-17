const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/profile', userController.profile);
router.get('/posts', userController.posts);
router.get('/signin', userController.signIn);
router.get('/signup', userController.signUp);

router.post('/create', userController.create);


module.exports = router;