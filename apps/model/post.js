let db = require("../common/database");
let conn = db.getConnection();
let q = require('q');

module.exports = {
    
    getAllPost() {
        var defer = q.defer();
        var query = conn.query("Select * from post", (err, result) => {
            if (err) {
                defer.reject(err + '');
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
}