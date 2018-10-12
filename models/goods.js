let mongoose = require('./../config/db');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    'productId': {type: String},
    'productName': {type: String},
    'salePrice': {type: Number},
    'productImage': {type: String},
});

module.exports = mongoose.model('Goods', productSchema);