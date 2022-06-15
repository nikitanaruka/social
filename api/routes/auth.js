const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
// router.get("/register",async (req,res)=>{
    // const user = await new User({
    //     username : "nikita",
    //     email : "bntfhnv@gmail.com",
    //     password : "123456"
    // });
    // await user.save();
    // res.send("thanks for coming here");
//})

router.post("/register",async (req,res)=>{
    
    try{
         // generate new hashed password
        const salt = await bcrypt.genSalt(10);
        const hasedpassword = await bcrypt.hash(req.body.password,salt);
        // create new user 
        const newuser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hasedpassword
        });
        // save user and respond
        const user = await newuser.save();
        return res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);     
        return;
    }
});


// LOGIN
router.post("/login",async (req,res)=>{
    try{
    const user = await User.findOne({ email : req.body.email});
    if(user){
        return res.status(404).json("email not found");
    }

    const validpassword = await bcrypt.compare(req.body.password,user.password);
    if(!validpassword){
        return res.status(400).json("wrong password");
    }

    return res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);   
        return;
    };
});

module.exports = router