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

router.get("/post/:seolink" + ".html", (req, res) => {
    let data = postModel.getPostBySeolink(req.params.seolink);
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

router.get("/contact", (req, res) => {
    let data = {
        posts: "post",
        error: false
    }
    res.render("blog/contact", { data: data });
});
module.exports = router;

