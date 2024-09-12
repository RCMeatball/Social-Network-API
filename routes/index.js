const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.unsubscribe((req, res) => res.send('Wrong route'));

module.exports = router;