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
    },
    addNewPost(post) {
        if (post) {
            var defer = q.defer();
            var query = conn.query("Insert into post set ?", post, (err, result) => {
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
    getPostById(id) {
        var defer = q.defer();
        var query = conn.query("Select * from post where ?", { id: id }, (err, result) => {
            if (err) {
                defer.reject(err + '');
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    },
    updatePostById(params) {
        if (params) {
            var defer = q.defer();
            var query = conn.query("Update post set title = ?, content=?, author=?, update_at=? where id=?",
                [params.title, params.content, params.author, new Date(), params.id],
                (err, result) => {
                    if (err) {
                        defer.reject(err + '');
                    } else {
                        defer.resolve(result);
                    }
                });
            return defer.promise;
        }
        return false;
    },
    deletePostById(id) {
        if (id) {
            var defer = q.defer();
            var query = conn.query("Delete from post where id=?",
                [id],
                (err, result) => {
                    if (err) {
                        defer.reject(err + '');
                    } else {
                        defer.resolve(result);
                    }
                });
            return defer.promise;
        }
        return false;
    }
} 