var Main = {
    article : function(item) {
        var content = "<li><div class=\"list_con\"><div class=\"title\">"
            + "<a href=\"" + item.id + "\" >" + item.title + "</a></div>"
            + "<div class=\"summary\">" + item.summary + "</div>"
            + "</div><div class=\"list_userbar\"><span class=\"text\">" + item.createTimeStr
            + "</span><a class=\"floatR\" href=\"" + item.id + "\"><span class=\"num\">"
            + item.readCount + "</span>&nbsp;<span class=\"text\">阅读</span></a></div></div></li>";
        return content;
    },
    getUrlParam : function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
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
                    console.log(search);
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
                console.log(response.data.length);
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
                alert("保存成功！");
                window.location.href = "detail.html?id=" + response.data;
            }
        }
        $.ajax(options);
    }
};
