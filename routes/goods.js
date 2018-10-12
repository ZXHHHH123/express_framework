var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
let doController = require('../controller/controller');


router.get('/addtest', doController.test.addtest);



router.get('/', function (req, res, next){
   Goods.find({}, function(err, doc){
        if(err) {
            res.json({
                status: '1',
                msg: err.message,
            });
        }else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
   })
});




module.exports = router;