const { Router } = require('express');
const startBuildController = require('../controllers/startBuild');

const router = new Router();

router.post('/build', startBuildController);
router.get('/', (req, res) => res.sendStatus(200));

module.exports = router;
