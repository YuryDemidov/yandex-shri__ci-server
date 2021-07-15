const { Router } = require('express');
const notifyAgentController = require('../controllers/notifyAgent');
const notifyBuildResultController = require('../controllers/notifyBuildResult');

const router = new Router();

router.post('/', (req, res) => res.send);
router.post('/notify-agent', notifyAgentController);
router.post('/notify-build-result', notifyBuildResultController);

module.exports = router;
