const { addIncome,getIncome,delete_income} = require('../controller/income')
const { addExpense,getExpense,delete_expense } = require('../controller/expense')
const {register,login}=require('../controller/user')
const router = require('express').Router()
router.post('/register',register);
router.post('/login',login);
router.post('/add_income',addIncome)
router.get('/get_income',getIncome)
router.delete('/delete_income/:id',delete_income)
router.post('/addExpense',addExpense)
router.get('/getExpense',getExpense)
router.delete('/delete_expense/:id',delete_expense)
module.exports = router