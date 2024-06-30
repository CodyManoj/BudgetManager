const income_model = require("../models/income_model")
exports.addIncome = async (req, res) => {
    // console.log("reqBody ", req.body);
    const { title, amount, date, category, description } = req.body;
    

    const numericAmount = parseFloat(amount.replace(/[₹,]/g, ""));
    
    const income = income_model({
        title,
        amount: numericAmount, 
        date,
        category,
        description
    });
    
    // console.log('printed income', income);
    
    try {
        if (!title || !numericAmount || !date || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (numericAmount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }
        await income.save();
        res.status(200).json({ message: "Income is saved" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
    // console.log(income);
};

exports.getIncome = async(req,res) =>{
    try {
        const incomes = await income_model.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}
exports.delete_income = async(req,res) => {
    const {id} = req.params;
    income_model.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message:"Income has been deleted"})
        })
        .catch((err)=>{
            res.status(500).json({message:"Server Error"})
        })
}