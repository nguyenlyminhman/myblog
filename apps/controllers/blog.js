let express = require("express");
let router = express.Router();

router.get("/", (req,res)=>{
    res.json({"message":"This is blof page"});
});

module.exports = router;

