const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema; 
const accounSchema = new Schema({
  username: String,
  password: String
},{
    collection: 'account'
});


const AccountModel = mongoose.model('account', accounSchema)
module.exports = AccountModel