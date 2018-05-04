let config = require("config");
let bcrypt = require("bcrypt");

module.exports = {

    hashPassword(password) {
        var saltRound = config.get("salt");
        var saltt = bcrypt.genSaltSync(saltRound);
        var hash = bcrypt.hashSync(password, saltt);
        return hash;
    },

    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    },

    requireLogin(req, res, next) {
        if (!req.session.user)
            return res.redirect('/admin/signin');
        next();
    }
}



