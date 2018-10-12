let model = require('./../models/model');
let crypto = require('crypto');


async function addtest(req, res, next) {
    let a = await model.goods.find({});
    res.json({
        status: '0',
        msg: 'add success',
    });
    if (a.length > 0) {
        let lastObj = a[a.length - 1];
        console.log(lastObj);
        let nowtime = new Date().getTime();
        console.log('@@@@@@@@@@@@' + nowtime)
        for (let i = 1; i < 30; i++) {
            let testAddObj = await testtt(i)
        }
        let endTime = new Date().getTime();
        console.log('@@@@@@@@@@@@' + endTime);
        console.log(endTime - nowtime);
    } else {
        console.log('frist insert data');
        model.goods.create({
            'productId': 10000,
            'productName': 'zch' + 1000,
            'salePrice': '99',
            'productImage': 'http://pic14.nipic.com/20110605/1369025_165540642000_2.jpg',
        }, (err, doc) => {
            if(err) {
                console.log(err);
            } else {
                console.log('@@@@@@@@@@@' + doc);
            }
        });
    }
};

async function testtt(i) {
    await model.goods.create({
        'productId': 10000 + i,
        'productName': 'zch123',
        'salePrice': '99',
        'productImage': 'http://pic14.nipic.com/20110605/1369025_165540642000_2.jpg'
    }, (err, doc) => {
        if(err) {
            console.log(err)
        }else {
            console.log(doc);
        }
    });
};

async function login(req, res, next) {
    console.log(req.body);
    let body = req.body;
    let PWD;
    PWD = crypto.createHash('md5').update(body.pwd + 'zchuhyy_test', 'utf-8').digest('hex');
    let allUser = await model.user.find({});
    if(!allUser.length > 0) {
        model.user.create({
            userId: '1000',
            userName: body.userName,
            pwd: PWD,
            loginDate: new Date().getTime()
        }, (err, doc) => {
            if(err) {
                console.log(err);
            } else {
                console.log(doc);
            }
        });
    } else{
        let lastUserId = + allUser[allUser.length - 1].userId;
        model.user.create({
            userId: (lastUserId + 1).toString(),
            userName: body.userName,
            pwd: PWD,
            loginDate: new Date().getTime()
        });
    }

    res.json({
        code: 200,
        msg: 'login test success',
        pwd: PWD
    })
}

async function getGoods(req, res, next) {
    model.goods.find({}, function(err, doc){
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
};



module.exports = {
    addtest,
    login,
    getGoods
}