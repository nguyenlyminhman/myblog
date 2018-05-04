function Post() {
    function bindEvent() {
        $(".btn-post").click(function (e) {
            var params = {
                id: $(".id").val(),
                title: $(".title").val(),
                content: $(".content").val(),
                author: $(".author").val()
            };
            console.log(params);
            var base_url = location.protocol + "//" + document.domain + ":" + location.port;
            $.ajax({
                url: base_url + "/admin/post/edit",
                type: "PUT",
                data: params,
                dataType: "JSON",
                success: function (res) {
                    if (res && res.status_code == 200) {
                        location.reload();
                    }
                }
            });
        });

        $(".btn-delete").click(function (e) {
            var post_id = $(this).attr("post_id");
            var base_url = location.protocol + "//" + document.domain + ":" + location.port;
            console.log(post_id)
            $.ajax({
                url: base_url + "/admin/post/delete",
                type: "DELETE",
                data: { id: post_id },
                dataType: "JSON",
                success: function (res) {
                    if (res && res.status_code == 200) {
                        location.reload();
                    }
                }
            });
        });

    }
    bindEvent();
}

$(document).ready(function () {
    new Post();
});