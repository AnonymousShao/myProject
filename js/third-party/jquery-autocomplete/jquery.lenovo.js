;
(function($) {
    $.fn.extend({

        lenovo: function(options) {
            //扩展默认配置
            options = $.extend({
                url: "",
                width: 0,
                showName: "name",
                extend: [{
                    id: "" || "id",
                    hiddenId: "",
                }],

                success: function() {}
            }, options);

            this.autocomplete(options.url, {
                max: 30, //列表里的条目数
                minChars: 1, //自动完成激活之前填入的最小字符
                width: options.width ? options.width : 218, //提示的宽度，溢出隐藏
                scrollHeight: 200, //提示的高度，溢出显示滚动条
                matchContains: true, //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
                autoFill: false, //自动填充
                dataType: 'json',
                setFocus: false,
                matchCase: true,
                type:options.type,
                parse: function(data) {
                    if (data.responseObject) {
                        return $.map(data.responseObject.responseData.data_list, function(row) {

                            return {
                                data: row,
                                value: row[options.id],
                                result: row[options.showName]
                            };
                        });
                    }

                },
                formatItem: function(row, i, max) {
                    //显示的值
                    return row[options.showName];
                }
            }).result(function(event, row) {
                if (options.extend) {
                    var that=this;
                    $(options.extend).each(function(index, el) {
                        $(that).attr(el.hiddenId, row[el.id]); //给元素添加自定义属性
                    });
                }
                options.success();
            });
        }
    });
})(jQuery);
