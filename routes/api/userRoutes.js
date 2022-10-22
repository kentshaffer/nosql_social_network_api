const router = require('express').Router();
const {
  createUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
  // addThought,
  // removeThought,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// router.route('/:userId/thoughts').post(addThought);

// router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

module.exports = router;
