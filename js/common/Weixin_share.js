/**
 * Created by sunhaibin on 2016/4/15.
 * ʹ�� wechat_share({
 *               title:'abc',                   //��������ѱ���?
 *               desc:'abc',
 *               link:window.location.href,         //��д����Ĭ�ϵ�ǰ
 *               imgUrl:''//img00.allinmd.cn/comm/header/logo.png',
 *               timeLineTitle:'����Ȧ����',
 *               qqTitle:''
 *            });
 */

function wechat_share(obj){

    var controller={
        init:function(obj){
            var t=this;
            t.options={};
            var shareData = {
                title: document.title,
                desc: "�㼯����������Ƶ��ҽѧ���ס��������ۡ�����ط���Դ��ҽ��רҵ��������",
                link: window.location.href,
                imgUrl: 'https://m.allinmd.cn/image/allin_logo.png',
                timeLineTitle:"",			//����Ȧ���⣬û��ʹ��Ĭ��title
                qqTitle:'',
                fnSuc:function(){
                    if($('.dk-result-pointer').length){
                        $('.dk-result-pointer,.dk-result-pointer-bg').remove();
                        $("body").unbind('touchmove');
                    }
                },
                fnCancel:function(){
                    if($('.dk-result-pointer').length){
                        $('.dk-result-pointer,.dk-result-pointer-bg').remove();
                        $("body").unbind('touchmove');
                    }
                },
	            // 分享给朋友回�?
	            fnMessageSuc: function () {

	            },
	            // 分享到朋友圈回调
	            fnTimelineSuc: function () {

	            }
            };
            t.options=$.extend(shareData,obj);
            t.getWxConfig();
        },
        getWxConfig:function(){
            var t=this;
            var dataJson=comm.ajax.sync('/mcall/wx/api/getJSConfig/',{paramJson: $.toJSON({url:window.location.href})});
            var data = dataJson.responseObject.responseData;
            wx.config({
                debug: false,
                appId:data.appId,//"wx8d4a2df6fdc13658",
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ]
            });
            setTimeout(function(){
                t.shareContent();
            },500)
        },
        shareContent:function(){
            var t = this;
            wx.ready(function(){
                wx.onMenuShareAppMessage({
                    title:t.options.title,
                    desc:t.options.desc,
                    link:t.options.link,
                    imgUrl:t.options.imgUrl,
                    success:function(){
                        if(t.options.fnSuc){
                            t.options.fnSuc();
                        }
	                    if(t.options.fnMessageSuc){
		                    t.options.fnMessageSuc();
	                    }
                    },
                    cancel:function(){
                        if(t.options.fnCancel){
                            t.options.fnCancel();
                        }
                    }
                });
                wx.onMenuShareTimeline({
                    title:t.options.timeLineTitle===""?t.options.title:t.options.timeLineTitle,
                    desc:t.options.desc,
                    link:t.options.link,
                    imgUrl:t.options.imgUrl,
                    success:function(){
                        if(t.options.fnSuc){
                            t.options.fnSuc();
                        }
	                    if(t.options.fnTimelineSuc){
		                    t.options.fnTimelineSuc();
	                    }
                    },
                    cancel:function(){
                        if(t.options.fnCancel){
                            t.options.fnCancel();
                        }
                    }
                });
                wx.onMenuShareQQ({
                    title:t.options.qqTitle===""?t.options.title:t.options.qqTitle,
                    desc:t.options.desc,
                    link:t.options.link,
                    imgUrl:t.options.imgUrl,
                    success:function(){
                        if(t.options.fnSuc){
                            t.options.fnSuc();
                        }
                    },
                    cancel:function(){
                        if(t.options.fnCancel){
                            t.options.fnCancel();
                        }
                    }
                });

            })
        }
    };
    controller.init(obj);
}
