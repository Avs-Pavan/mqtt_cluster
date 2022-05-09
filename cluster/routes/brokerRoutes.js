const express = require('express');
const router = express.Router();
const brokerController = require('../controllers/brokerController.js');
 
 
router.get('/', brokerController .list.bind(brokerController));
 
router.get('/:id', brokerController.show.bind(brokerController));
 
router.post('/', brokerController.create.bind(brokerController));
 
router.put('/:id', brokerController.update.bind(brokerController));
 
router.delete('/:id', brokerController.remove.bind(brokerController));
 
module.exports = router;

