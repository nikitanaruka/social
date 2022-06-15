const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// router.get("/",(req,res)=>{
//     res.send("hey its user route");
// })

//update user
router.put("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }catch(err){
                return res.status(500).json(err);
                
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set : req.body,
            });
            return res.status(200).json("Account has been updated");
            
        } catch(err){
            return res.status(500).json(err);
          
        }
    }
    else{
        return res.status(403).json("you can only update your own account not this one");
        
    }
});

// delete user
router.delete("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        
        try{
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Account has been deleted");
        } catch(err){
            return res.status(500).json(err);
            
        }
    }
    else{
        return res.status(403).json("you can only delete your own account not this one");
        
    }
});

// get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      return res.status(200).json(other);
    } catch (err) {
      return res.status(500).json(err);
      
    }
  });

// follow a user
router.put("/:id/follow",async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const usertofollow = await User.findById(req.params.id);
            const curruser = await User.findById(req.body.userId);
            if(!usertofollow.followers.includes(req.body.userId)){
                await usertofollow.updateOne({$push : {followers : req.body.userId}});
                await curruser.updateOne({$push : { following : req.params.id }});
                return res.status(200).json("user has been followed");
            }else{
                return res.status(403).json("you already follow this user");
            }
        }catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("you cant follow yourself");
    }
});

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { following: req.params.id } });
          return res.status(200).json("user has been unfollowed");
        } else {
          return res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("you cant unfollow yourself");
    }
  });

module.exports = router