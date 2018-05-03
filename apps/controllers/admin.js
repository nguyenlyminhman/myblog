let express = require("express");
let router = express.Router();

router.get("/", (req,res)=>{
    res.json({"message":"This is admin page"});
});

module.exports = router;

