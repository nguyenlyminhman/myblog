let express = require("express");
let router = express.Router();
let userModel = require("../model/users");
let postModel = require("../model/post");
let utils = require("../utils/encrypt")

router.get("/", (req, res) => {
    let data = postModel.getAllPost();
    data.then(post => {
        let data = {
            posts: post,
            error: false
        }
        res.render("admin/dashboard", { data: data });
    }).catch(err => {
        res.render("admin/dashboard", { data: { error: true } });
    })
});


router.get("/signup", (req, res) => {
    res.render("signup", { data: {} });
});

router.post("/signup", async (req, res) => {
    var user = req.body;
    var hashePassword = utils.hashPassword(user.password);
    user = {
        email: user.email,
        password: hashePassword,
        first_name: user.firstname,
        last_name: user.lastname
    }
    console.log(user);

    userModel.addUser(user).then(data => {
        res.render("signup", { data: { success: "Added successfully!" } });
    }).catch(err => {
        res.render("signup", { data: { error: "Email was existed!" } });
    })
});

router.get("/signin", (req, res) => {
    res.render("signin", { data: {} });
});

router.post("/signin", (req, res) => {
    var params = req.body;
    if (params.email) {
        userModel.getUserByEmail(params.email).then(data => {
            var user = data[0];
            var status = utils.comparePassword(params.password, user.password);
            if (!status) {
                res.render("signin", { data: { error: "Email was not existed!" } });
            } else {
                req.session.user = user;
                res.redirect("/admin/")
            }
        }).catch(err => {
            res.render("signin", { data: { error: "Email was not existed!" } });
        })
    }


    // if(!result){
    //     res.render("signup", { data: {error:"Error occurs!"} });
    // }else{
    //     res.render("signup", { data: {success:"Added successfully!"} });
    // }
});

router.get("/post/new", (req, res) => {
    res.render("admin/post/new");
});

router.post("/post/new", (req, res) => {
    let post = req.body;
    let now = new Date();

    post.create_at = now;
    post.update_at = now;

    let data = postModel.addNewPost(post);
    data.then(result => {
        res.redirect("/admin")
    }).catch(err => {
        res.render("admin/post/new", { data: { error: false } })
    })
});


router.get("/post/edit/:id", (req, res) => {
    let params = req.params;
    let id = params.id;

    let data = postModel.getPostById(id);
    if (data) {
        data.then(result => {
            let post = result[0];
            let data = {
                post: post,
                error: false
            }
            res.render("admin/post/edit", { data: data })
        }).catch(err => {
            res.render("admin/post/edit", { data: { error: "Can not get post by its id" } })
        })
    } else {
        res.render("admin/post/edit", { data: { error: "Can not get post by its id" } })
    }
});

router.put("/post/edit", (req, res) => {
    let params = req.body;
    let data = postModel.updatePostById(params);
    if (!data) {
        res.json({ status_code: 500 });
    } else {
        data.then(result => {
            res.json({ status_code: 200 });
        }).catch(err=>{
            res.json({ status_code: 500 });
        })
    }
});

router.delete("/post/delete", (req, res) => {
    let params = req.body;
    let data = postModel.deletePostById(params.id);
    if (!data) {
        res.json({ status_code: 500 });
    } else {
        data.then(result => {
            res.json({ status_code: 200 });
        }).catch(err=>{
            res.json({ status_code: 500 });
        })
    }
})

module.exports = router;

