const expense_model = require("../models/expense_model")

exports.addExpense = async (req,res) =>{
    // console.log("reqBodyExp ",req.body);
    const{userName,title,amount,date,category,description} = req.body;
    // console.log(req.body);
    const expense = expense_model({
        userName,title,amount,date,category,description
    })
    console.log('exp: ',expense);
    try {
        if(!title || !amount || !date || !category){
            return res.status(400).json({message:"All fields are required"})
        }
        if(amount<=0 || !amount){
            return res.status(400).json({message:"Amount must be positive"}) 
        }
        await expense.save();
        res.status(200).json({message:"Expense is saved"})
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
    console.log(expense)
}
exports.getExpense = async(req,res) =>{
    try {
        const expense = await expense_model.find().sort({createdAt: -1})
        res.status(200).json(expense)
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}
exports.delete_expense = async(req,res) => {
    const {id} = req.params;
    expense_model.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({message:"Expense has been deleted"})
        })
        .catch((err)=>{
            res.status(500).json({message:"Server Error"})
        })
}