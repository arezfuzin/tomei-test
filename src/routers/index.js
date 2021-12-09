const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { findUsers, postUser, putUser, deleteUser } = require('../controllers');

router.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Server is live !',
    });
});
router.post('/', async (req, res) => {
    res.status(200).json({
        message: 'Ok !',
    });
});
router.get('/users', asyncHandler(findUsers));
router.post('/user', asyncHandler(postUser));
router.put('/user/:id', asyncHandler(putUser));
router.delete('/user/:id', asyncHandler(deleteUser));


module.exports = router;
