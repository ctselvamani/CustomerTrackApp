const express = require('express');
const router = express.Router();

const customertrack_controller = require('../controllers/customertrack');
const employee_controller = require('../controllers/employee');

//GET call before customer track create
router.get('/create', customertrack_controller.customertrack_create_get);
//POST call customer track create
router.post('/create', customertrack_controller.customertrack_create_post);

router.get('/banklocation/:banklocation', customertrack_controller.customertrack_banklocation_detail);
//GET call to list branchlocation
router.get('/banklocation', customertrack_controller.customertrack_banklocation_get);
//POST call to find data by branchlocation
router.post('/banklocation', customertrack_controller.customertrack_banklocation_post);
//GET call to get customer track detail 
router.get('/:id', customertrack_controller.customertrack_detail);
// GET customer track home page.
router.get('/', customertrack_controller.index);

module.exports = router
