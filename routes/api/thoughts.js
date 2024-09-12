const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    deletThought,
    updateThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought');

router.route('/').get(getThought).post(createThought);

router.route('./:thoughtId/reaction').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deletThought)

module.exports = router;