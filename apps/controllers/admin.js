let express = require("express");
let router = express.Router();
let userModel = require("../model/users");
let utils = require("../utils/encrypt")

router.get("/", (req, res) => {
    res.json({ "message": "This is admin page" });
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

    // if(!result){
    //     res.render("signup", { data: {error:"Error occurs!"} });
    // }else{
    //     res.render("signup", { data: {success:"Added successfully!"} });
    // }
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
            if(!status){
                res.render("signin", { data: { error: "Email was not existed!" } });
            }else{
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
module.exports = router;

