const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const userRoute  = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true, })
        // useCreateIndex: true,   })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));


// middlewares 
app.use(express.json());  // act as bodyparser
app.use(helmet());
app.use(morgan("common"));


// app.get("/",(req,res)=>{
//     res.send("welcome to homepage");
// })                                             // we will make our rest API ,so will not use them
// app.get("/users",(req,res)=>{
//     res.send("welcome to users page");
// })

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

app.listen(8800,()=>{
    console.log("Backend Server is running");
});