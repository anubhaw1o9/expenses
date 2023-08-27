const Itemexpense = require('../models/itemexpense.model')
const mongoose = require('mongoose')

const getItemexpenses = async (req, res) => {
    const itemexpenses = await Itemexpense.find({}).sort({createdAt: -1})

    res.status(200).json(itemexpenses)
}

const getItemexpense = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such itemexpense'})
    }

    const itemexpense = await Itemexpense.findById(id)

    if(!itemexpense) {
        return res.status(404).json({error: 'No such itemexpense'})
    }

    res.status(200).json(itemexpense)
}
//create
const createItemexpense = async (req, res) => {
    const {amount, transactiondate, description, expensetype} = req.body

    let emptyFields = []
    if(!amount) {
        emptyFields.push('amount')
    }
    if(!transactiondate) {
        emptyFields.push('transactiondate')
    }
    if(!description) {
        emptyFields.push('description')
    }
    if(!expensetype) {
        emptyFields.push('expensetype')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }


    try {
        const itemexpense = await Itemexpense.create({amount, transactiondate, description, expensetype})
        res.status(200).json(itemexpense)
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}

//delete
const deleteItemexpense = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such itemexpense'})
    }
  
    const itemexpense = await Itemexpense.findOneAndDelete({_id: id})
  
    if (!itemexpense) {
      return res.status(400).json({error: 'No such itemexpense'})
    }
  
    res.status(200).json(itemexpense)
  }
  
  // update
  const updateItemexpense = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such itemexpense'})
    }
  
    const itemexpense = await Itemexpense.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!itemexpense) {
      return res.status(400).json({error: 'No such itemexpense'})
    }
  
    res.status(200).json(itemexpense)
  }
  
  
  module.exports = {
    getItemexpenses,
    getItemexpense,
    createItemexpense,
    deleteItemexpense,
    updateItemexpense
  }