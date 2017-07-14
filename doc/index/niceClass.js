/**
 * Created by zhanghongda on 2017/3/14.
 */
//精品课程内容
function niceClass() {
    t = this;
    t.ajaxFn({
        url: t.path.niceClass,
        type: "get",
        param: {
            customerId: t.params.customerId,
            visitSiteId: 13,
            pageIndex: 1,
            pageSize: 10,
            attUseFlag: 3,
            sortType: 2,
        },
        fn: function (data) {
            var obj = data.responseObject.responseData.data_list;
            var quality = $("#quality");
            var len = obj.length;
            for (var i = 0; i < len; i++) {
                if (comm.isPC()) {
                    courseJump = obj[i].pageStoragePath;
                } else {
                    courseJump = obj[i].webStoragePath;
                }
                var text = '<section class="contentInnerItem" courseJump="' + courseJump + '">' +
                    '<article class="contentInnerContext">' +
                    '<h2>' + obj[i].courseTitle + '</h2>' +
                    '<p><span class="user">' + obj[i].courseAuth.authorName + '</span><span class="hospital">' + obj[i].courseAuth.company + '</span></p>' +
                    '<article class="contentOtherMsg">' +
                    '<span class="resourceType">' + obj[i].seriesTitle + '</span>' +
                    '<i class="icon-comment"></i>' +
                    '<span>' + obj[i].reviewNum + '</span>' +
                    '</article>' +
                    '</article>' +
                    '<figure class="contentInnerImg">' +
                    '<img src="' + obj[i].videoAttUrl + '" alt="">' +
                    '</figure>' +
                    '</section>'
                quality.append(text);
            }
        }
    })
}