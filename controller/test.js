let model = require('./../models/model');
let jwt = require('jwt-simple');
let systemConf = require('./../config/systemconf');
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
    /*payload 最好拿数据表里的唯一id用，这样在decode时方便判断是哪一个用户传过来的token*/
    let payload = {
        userName : body.userName,
        expires : new Date().getTime() + 60000,/*10min*/
    };
    let secret = systemConf.jwt_secret;
    let token = jwt.encode(payload, secret);
    console.log('token ====' + token);
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
        pwd: PWD,
        token: token
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

async function jwttest(req, res, next) {
    console.log('jwtTestStart--------------');
    let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    console.log(token);
    if(token) {
        try{
            console.log(111111);
            let decoded = jwt.decode(token, systemConf.jwt_secret);
            console.log(new Date().getTime());
            console.log(decoded.expires <= new Date().getTime());

            if(decoded.expires <= new Date().getTime()) {
                res.end('token has expried', 400)
            } else {
                model.user.find({}, (err, doc) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            status: '1',
                            msg: err.message,
                        });
                    }
                    res.json({
                        code: 200,
                        msg: 'jwt test success',
                        data: doc
                    })
                });
            }
            console.log(decoded);
        }catch (e) {
            console.log(e);
        }
    }
    console.log(req.headers['x-access-token']);


}



module.exports = {
    addtest,
    login,
    getGoods,
    jwttest
}