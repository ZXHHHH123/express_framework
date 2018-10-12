let  mongoose = require('./../config/db');
let Schema = mongoose.Schema;
let user = new Schema({
    'userId': {type: String},
    'userName': {type: String},
    'pwd': {type: String},
    'loginDate': {type:String},
});
module.exports = mongoose.model('Users',user);
