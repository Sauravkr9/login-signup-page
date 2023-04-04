import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


mongoose.connect('mongodb://localhost/mydatabase')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", async (req, res)=> {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email }).exec();
        if (user) {
            if (password === user.password ) {
                res.send({ message: "Login Successful", user: user });
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    } catch (error) {
        console.error(error);
        res.send({ message: "An error occurred" });
    }
});


app.post("/register", async (req, res)=> {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email: email }).exec();
        if (userExists) {
            res.send({ message: "User already registered" });
        } else {
            const user = new User({
                name,
                email,
                password,
            });
            await user.save();
            res.send({ message: "Successfully Registered, Please login now." });
        }
    } catch (error) {
        console.error(error);
        res.send({ message: "An error occurred" });
    }
});

app.listen(9002,() => {
    console.log("BE started at port 9002")
})