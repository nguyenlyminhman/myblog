let express = require("express");
let router = express.Router();
let postModel = require("../model/post");

router.get("/", (req, res) => {
    let data = postModel.getAllPost();
    data.then(post => {
        let data = {
            posts: post,
            error: false
        }
        res.render("blog/index", { data: data });
    }).catch(err => {
        res.render("blog/index", { data: { error: true } });
    })
});

router.get("/post/:id" + ".html", (req, res) => {
    let data = postModel.getPostById(req.params.id);
    data.then(post => {
        let data = {
            posts: post[0],
            error: false
        }
        res.render("blog/post", { data: data });
    }).catch(err => {
        res.render("blog/post", { data: { error: "Can not get post details" } });
    })
});

router.get("/about", (req, res) => {
    let data = {
        posts: "post",
        error: false
    }
    res.render("blog/about", { data: data });
});
module.exports = router;

