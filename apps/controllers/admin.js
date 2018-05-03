let express = require("express");
let router = express.Router();
let userModel = require("../model/users");

router.get("/", (req, res) => {
    res.json({ "message": "This is admin page" });
});

router.get("/signup", (req, res) => {
    res.render("signup", { data: {} });
});

router.post("/signup", (req, res) => {
    var user = req.body;
    user = {
        email: user.email,
        password: user.password,
        first_name: user.firstname,
        last_name: user.lastname
    }
    var result = userModel.addUser(user);
    if(!result){
        res.render("signup", { data: {error:"Error occurs!"} });
    }else{
        res.render("signup", { data: {success:"Added successfully!"} });
    }
})

module.exports = router;

