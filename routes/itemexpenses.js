/*const router = require('express').Router();
let ItemExpense= require('../models/itemexpense.model')

router.get('/', (req, res) => {
    ItemExpense.find()
    .then(itemexpenses => res.json(itemexpenses))
    .catch(err => res.status(400).json('Error:' + err));
});


//CREATE
router.post('/add', (req, res)=> {
    //const name = req.body.name;
    const amount= req.body.amount;
    const transactiondate = req.body.transactiondate;
    const description = req.body.description;
    const expensetype = req.body.expensetype;
    //const lastupdatedate = req.body.lastupdatedate;

const newItemExpense =new ItemExpense ({ amount, transactiondate, description, expensetype});

newItemExpense.save()
.then(()=> res.json('expense added'))
.catch(err => res.status(400).json('Error: ' + err));
});


//DELETE
router.get('/:id', (req,res) => {
    ItemExpense.findById(req.params.id)
    .then(itemexpense => res.json(itemexpense))
    .catch(err => res.status(400).json('Error:' + err));
});

router.delete('/:id', (req, res)=> {
    ItemExpense.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item expense Removed'))
    .catch(err => res.status(400).json('Error:' + err));
});


//UPDATE
router.post('/update/:id', (req, res)=> {
    ItemExpense.findById(req.params.id)
    .then(itemexpense => {
        //itemexpense.name=req.body.name;
        itemexpense.amount= req.body.amount;
        itemexpense.transactiondate= req.body.transactiondate;
        itemexpense.description= req.body.description;
        itemexpense.expensetype = req.body.expensetype;

        itemexpense.save()
            .then(()=> res.json('Item expense details Updated'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;*/

const express = require("express")
const router = express.Router()
const {
    createItemexpense,
    getItemexpenses,
    getItemexpense,
    deleteItemexpense,
    updateItemexpense

} = require('../controllers/itemexpenses')

const auth = require('../middleware/auth')
router.use(auth.protect)

router.get('/', getItemexpenses)
router.get('/:id', getItemexpense)
router.post('/', createItemexpense)
router.delete('/:id', deleteItemexpense)
router.patch('/:id', updateItemexpense)

module.exports = router;