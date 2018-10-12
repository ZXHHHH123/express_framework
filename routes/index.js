let express = require('express');
let router = express.Router();
let doController = require('./../controller/controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/goods/addtest', doController.test.addtest);
router.get('/goods', doController.test.getGoods);
// router.get('/goods/add', doController.test.addtest);

router.post('/login1', doController.test.login);

/*jwttest*/
router.post('/jwttest', doController.test.jwttest);





module.exports = router;
