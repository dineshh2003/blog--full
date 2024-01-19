const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

  
//Create post
router.post("/", async(req, res) => {
        const newPost = new Post(req.body);
        try{
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        }
        catch(err){
            res.status(500).json(err);
        }
});


// Delete Post
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id){ 
        try{
            await Post.deleteMany({username: user.username});
            const user = await User.findById(req.params.id);
        try{    
               await User.findByIdAndDelete(req.params.id)
               res.status(200).json("User has been deleted...");

    }
    catch(err){
        res.status(401).json(err);
    }
    }catch(err){
        res.status(404).json("User not found")
    }
}
    else{
        res.status(401).json("You can delete your acc only");
    }
});


// GET Post
router.get("/:id", async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    }
});


//update post 
router.put("./:id", async (req, res)=>{
    try{
            const post = Post.findById(req.params.id);
            if(post.username === req.body.username){
                try{
                        const updatedPost = await Post.findByIdAndUpdate(
                            req.params.id, 
                            {
                                $set: req.body,
                            },
                            {new : true}
                            
                        )  ;
                        res.status(200).json(updatedPost);                      
                }
                catch(err){
                    res.status(500).json(err);
                }
            }
            else{
                    res.status(401).json("you can update your post only!!!");
            }
    }
    catch(err){
        res.status(500).json(err);
    }
});


// Get All Post
router.get("/" , async (req, res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;