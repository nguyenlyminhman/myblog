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
    }
    bindEvent();
}

$(document).ready(function () {
    new Post();
});