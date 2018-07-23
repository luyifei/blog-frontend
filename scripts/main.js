var Main = {
    article : function(item) {
        var content = "<li><div class=\"list_con\"><div class=\"title\">"
            + "<a href=\"javascript:void(0);\" onclick='Main.loadDetail("+ item.id +")' >" + item.title + "</a></div>"
            + "<div class=\"summary\">" + item.summary + "</div>"
            + "</div><div class=\"list_userbar\"><span class=\"text\">" + item.createTimeStr
            + "</span><a class=\"floatR\" href=\"javascript:void(0);\" onclick='Main.loadDetail("+ item.id +")'><span class=\"num\">"
            + item.readCount + "</span>&nbsp;<span class=\"text\">阅读</span></a></div></div></li>";
        return content;
    },
    getUrlParam : function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    },
    loadDetail : function (id) {
    window.open("detail.html?id=" + id);
    }
};
var Search = {
    searchF : function() {
        curPage = 1;
        $("#list-ul").empty();
        var options = {
            url: '/blog/article/list/'+ curPage,
            type: 'get',
            dataType: 'json',
            data: $("#searchForm").serialize(),
            success: function (response) {
                if(response.data.length != 0){
                    $.each(response.data,function (index, item) {
                        var content = Main.article(item);
                        $("#list-ul").append(content);
                    });
                    $("#resultsDiv").show();
                    $("#nonResult").hide();
                    $("#resultsDiv").attr("class","border-list");
                }else{
                    $("#resultsDiv").hide();
                    $("#nonResult").show();
                    var search = $("#search").val();
                    $("#searchContent").text(search);
                }

            }
        };
        $.ajax(options);
    },
    loadData : function(){
        if(curPage == 0){
            return;
        }
        curPage++;
        var options = {
            url: '/blog/article/list/'+ curPage,
            type: 'get',
            dataType: 'json',
            data: $("#searchForm").serialize(),
            success: function (response) {
                $.each(response.data,function (index, item) {
                    var content = Main.article(item);
                    $("#list-ul").append(content);
                });
                $("#resultsDiv").attr("class","border-list");
                isScroll = true;
            }
        };
        $.ajax(options);
    }
};
var Edit = {
    textSubmit : function () {
        var options = {
            url: '/blog/article/save',
            type: 'post',
            dataType: 'json',
            data: $("#edit").serialize(),
            success: function (response) {
                layer.alert('保存成功', {icon: 1});
                window.location.href = "detail.html?id=" + response.data;
            }
        }
        $.ajax(options);
    }
};
var Detail = {
    comment : function(index,item){
        var content = "";
        if(index == 1){
            content = "<div class=\"comment-bottom\">";
        }else{
            content = " <div class=\"comment-other\">";
        }
        content = content + "<div> <span class=\"comment-title\">" + item.userIp + "</span>"
            + "<span class=\"comment-title\">" + item.createTimeStr + "</span>"
            + "<span class=\"comment-title\">#" + index  + "楼</span></div> <div class=\"comment-content\">" + item.content + "</div></div>";
        return content;
    },
    commentSubmit : function () {
        var comment = $("#comment-text").val();
        var articleId = Main.getUrlParam("id");
        var obj = {"comment" : comment,"articleId" : articleId};
        var options = {
            url: '/blog/articleComment/save',
            type: 'post',
            dataType: 'json',
            data: obj ,
            success: function (response) {
                layer.alert('保存成功', {icon: 1});
                $("#comment-text").val("");
                var content = Detail.comment(response.data.commentCount , response.data.articleComment);
                $("#commentList").prepend(content);
            }
        }
        $.ajax(options);
    },
    getComment : function (id) {
        $("#comment-text").val("[reply]"+id+"[/reply]\r");
    },
    commentList : function () {
        var articleId = Main.getUrlParam("id");
        var options = {
            url: '/blog/articleComment/list/' + articleId,
            type: 'get',
            dataType: 'json',
            success: function (response) {
                if(response.data.length > 0){
                    var commentList = "<div id=\"commentList\" class=\"comment-list\"></div>";
                    $("#commentPage").append(commentList);
                }
                $.each(response.data,function (index , item) {
                    var content = Detail.comment(index + 1 , item);
                    $("#commentList").prepend(content);
                });
            }
        }
        $.ajax(options);
    }
};
