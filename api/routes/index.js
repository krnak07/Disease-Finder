let express = require('express');
let router = express.Router();

let xlxtoDB = require('../controllers/exceltoDB');
let ctrlDis = require('../controllers/disease-finder');

router
    .route('/exportDB')
    .get(xlxtoDB.exltoDB);

router
    .route('/findDisease')
    .post(ctrlDis.findDiseases);


module.exports = router;
