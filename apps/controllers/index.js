let express = require("express");
let router = express.Router();

router.use("/admin", require(__dirname+"/admin"));
router.use("/blog", require(__dirname+"/blog"));

router.get("/", (req,res)=>{
    // res.json({"message":"This is home page"});
    res.redirect("/blog");
});

module.exports = router;
