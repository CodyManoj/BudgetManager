const user_model=require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register=async(req,res)=>{
    
    const { userName, password,confirmPassword} = req.body;
    console.log(req.body);
    try{
       if(password!==confirmPassword){
        return res.status(400).json({message:"Password and Confirm Password must same"});
       }
       const userF = await user_model.findOne({userName: userName });
    //    console.log(userF);
       if(userF){
        return res.status(201).json({message:"UserName already exist"});
       }
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
          
        const user = new user_model({ userName, password: hashedPassword });
        await user.save();
    
        res.status(200).json({ message: 'User registered successfully, You can login now!' });
    }catch(err){
        res.status(500).json({message:"Server Error"})
    }
}

exports.login=async(req,res)=>{
    const { userName, password } = req.body;
   try{
    const user = await user_model.findOne({userName:userName });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Create a JWT token
    // const token = jwt.sign({ userId: user._id }, 'secret_key');
    
   return res.status(200).json({userName:userName});
  } catch (error) {
   return res.status(500).json({ message: 'Error logging in' });
  }
}