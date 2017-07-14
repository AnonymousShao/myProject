/**
 * 功能描述：  系统消息
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by QiangKaiLiang on 2016/11/30
 */

var MessageNotice = function() {

};
MessageNotice.prototype = {
    init: function() {
        commLog.createBrowse(28,'消息-通知详情页');
        setTimeout(function () {
            comm.pcSideModule([{
                item: "讨论",
                href: "//www.yi-ding.net.cn/pages/message/message_discuss.html",
                active: true
            }, {
                item: "赞了我的",
                href: "//www.yi-ding.net.cn/pages/message/message_like.html",
                active: false
            }, {
                item: "动态资讯",
                href: "//www.yi-ding.net.cn/pages/message/message_information.html",
                active: false
            }, {
                item: "系统消息",
                href: "//www.yi-ding.net.cn/pages/message/message_index.html",
                active: false
            }]);
            $(".al-mainSidebarList li").removeClass('active').last().addClass('active');
            var hrefStr='<div class="share rightNav" id="share">' +
                '<i class="icon-share" style="display: block;"></i>' +
                '<p class="shareTxt" style="display: none;">分享</p>' +
                '<article class="sharePic ev-shareBox" id="yd-shareBox">' +
                '<b class="yd-weixin ev-tweixin"><i class="icon-weixin"></i><em>微信</em></b>'  +
                '<section class="Ev-shareWeixinCode" style="display: none;position: absolute;bottom: 100%;">' +
                '<h3>使用微信扫描二维码</h3>' +
                '</section>' +
                '<b class="yd-qqFriends ev-tqq">' +
                '<i class="icon-qq"></i>' +
                '<em>QQ</em>' +
                '</b>' +
                '<b class="yd-qZone ev-tqzone">' +
                '<i class="icon-zone"></i>' +
                '<em>QQ空间</em>' +
                '</b>' +
                '<b class="yd-weibo ev-tsina">' +
                '<i class="icon-weibo"></i>' +
                '<em>微博</em>' +
                '</b>' +
                '</article>' +
                '</div>';
            pcShare({
                container:$(".al-rightNav"),//存放分享组件的父级
                type:6,//默认为1  1：社交分享  2：页面左下角全站分享,3.终端页面的固定分享,4.终端评论区分享，消息的评论我的，只分享到唯医朋友圈, 5:直播分享 ，6:自定义dom结构
                hrefTemplate:hrefStr,//自定义dom结构
                h5Url:h5Url,//微信分享生成二维码的链接
                shareTrend:0,//0:不需要站内动态分享  1：需要站内动态分享
                url: window.location.href,
                qqTitle: "qq分享标题",
                qqZoneSummary: "QQ分享正文",
                sinaTitle: "微博分享标题",
                sinaSummary: "微博分享正文，该项可传可不传，微博分享无正文",
                qqZoneTitle: "qq空间标题",
                qqSummary: "qq空间正文",
                hasH5: "true则有微信分享，无H5页面则不做微信扫码分享",
                shareQQSuc: function () {
                    //qq分享成功回调
                    commLog.creatEvent({"id":102,"url":window.location.href,"keyword":"QQ分享"});
                },
                shareQzoneSuc: function () {
                    //qq空间分享成功回调
                    commLog.creatEvent({"id":103,"url":window.location.href,"keyword":"QQ空间分享"});
                },
                shareWeixinSuc:function(){
                    //微信分享成功回调
                    commLog.creatEvent({"id":100,"url":window.location.href,"keyword":"微信分享"});
                },
                shareSinaSuc: function () {
                    //微博分享成功回调
                    commLog.creatEvent({"id":104,"url":window.location.href,"keyword":"微博分享"});
                }
            });
        }, 10);

    }
};
var messageNotice=new MessageNotice();

messageNotice.init();