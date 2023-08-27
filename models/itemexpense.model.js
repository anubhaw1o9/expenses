const mongoose = require('mongoose')
const Schema =mongoose.Schema
const User = require('./user.model')
const itemexpenseSchema= new Schema(
    {
    //user : { type:mongoose.Schema.Types.ObjectId, ref: 'User' }, ItemExpense..find({user:id});
    amount: {type: String, required: true},
    transactiondate: {type: Date},
    description: {type: String, required: true},
    //lastupdatedate: {type: date, required: true},
    expensetype: {type: String, required:true},
    //user: {type: Schema.Types.ObjectId, ref: 'User'}
},
    {timestamps: true}
);
 
module.exports = mongoose.model('ItemExpense', itemexpenseSchema);;