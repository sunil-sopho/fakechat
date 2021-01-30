var express = require('express');
var mainController = require('../controllers/maincontroller');
var router = express.Router();
var app = require('../../applicationInstance');


//===============================================================
//================== NORMAL GET REQUEST ROUTER ========================
//===============================================================

router.route('/').get(mainController.home);
router.route('/login').get(mainController.login);
router.route('/signup').get(mainController.signup);
//==============================================================
//================  SPECIAL GET REQUEST ========================
//================ NOT TO BE USED =============================
//=============================================================
// router.route('/mail').get(mainController.mail);
// router.route('/verify').get(mainController.verify);


//==============================================================
//================== POST REQUEST ROUTER =======================
//==============================================================


module.exports = router;