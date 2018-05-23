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
    getabc : function () {
        alert(1234);
    }
};
