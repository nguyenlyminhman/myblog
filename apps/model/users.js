let db = require("../common/database");
let conn = db.getConnection();
let q = require('q')
module.exports = {
    addUser(user) {
        if (user) {
            var defer = q.defer();
            var query = conn.query("Insert into users set ?", user, (err, result) => {
                if (err) {
                    defer.reject(err + '');
                } else {
                    defer.resolve(result);
                }
            })
            return defer.promise;
        }
        return false;
    },

    getUserByEmail(email) {
        if (email) {
            var defer = q.defer();
            var query = conn.query("Select * from users where ?", { email: email }, (err, result) => {
                if (err) {
                    defer.reject(err + '');
                } else {
                    defer.resolve(result);
                }
            })
            return defer.promise;
        }
        return false;
    },

    getAllUser() {
        var defer = q.defer();
        var query = conn.query("Select * from users", (err, result) => {
            if (err) {
                defer.reject(err + '');
            } else {
                defer.resolve(result);
            }
        })
        return defer.promise;
    }
}