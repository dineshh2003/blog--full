const express = require("express");
const app = express();
const PORT = 5000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");
const categoriesRoute = require("./routes/categories");
const multer = require("multer");



dotenv.config();
app.use(express.json());

mongoose
.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
})
.then(console.log("connected to mongoDB"))
.catch((err)=> console.log(err));

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, "images")
    },filename:(req,file,cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded")

})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute)
app.use("/api/categories", categoryRoute);


app.use("/", (req, res) => {
    console.log("hey this is lama url")
})

app.use((req, res) => {
    res.status(404).send("404 - NOT found");
})

app.listen(PORT, ()=>{
    console.log(`Backend is running \nserver started on port : ${PORT}`);
});