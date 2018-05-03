let db = require("../common/database");
let conn = db.getConnection();
let q = require('q')

function addUser(user) {
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
}
module.exports = {addUser};