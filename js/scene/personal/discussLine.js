/**
 * Created by qiangkailiang on 2016/12/22.
 */
var exerciseCommonPraiseNum;
    function showReview(data, type) {
        var outContainer = $(".yd-maskBackground");

        function checkStr(str) {
            return str.length > 0 ? true : false;
        }

        switch (type) {
            case "discuss":
                var listData = data.responseObject.responseData.data_list;
                var reviewStr = "";
                var imgSrcBox = {};
                var discussId = "";
                var duringTime = "";
                var timeStr = "";
                var logSrc = "";
                var logStr = "";
                var cusId = "";
                var reviewContent = "";
                var recommendNum = "";
                var customerName = "";
                var nameStr = "";
                var customerCompanyStr = "";
                var upNum = "";
                var upNumStr = "";
                var recoStr = "";
                var imgBoxData = [];
                var titleName = data.responseObject.responseData.belongTitle;
                for (var disNum = 0; disNum < listData.length; disNum++) {
                    var isValid = listData[disNum].reviewStatus;
                    imgSrcBox["imgIte" + disNum] = [];
                    imgBoxData[disNum] = {};
                    imgBoxData[disNum].imgData = [];

                    for (var attachNum = 0; attachNum < listData[disNum].attachment_list.length; attachNum++) {
                        imgBoxData[disNum].imgData[attachNum] = {};
                        imgBoxData[disNum].imgData[attachNum].time = listData[disNum].attachment_list[attachNum].attachment.uploadTime;
                        imgBoxData[disNum].imgData[attachNum].name = "";
                        imgBoxData[disNum].imgData[attachNum].src = listData[disNum].attachment_list[attachNum].attachment.reviewAttUrl;
                        imgSrcBox["imgIte" + disNum][attachNum] = listData[disNum].attachment_list[attachNum].attachment.reviewAttUrl;
                    }
                    var innerImgSrc = "";
                    var imgBoxLen = imgSrcBox["imgIte" + disNum].length;
                    /*<section class="yd-timelineImgBox">
                     <figure class="yd-timelineImg">
                     <img src="/image/index/hh.png" alt="">
                     </figure>
                     <figure class="yd-timelineImg">
                     <img src="/image/index/hh.png" alt="">
                     </figure>
                     <figure class="yd-timelineImg">
                     <img src="/image/index/hh.png" alt="">
                     </figure>
                     <figure class="yd-timelineImg">
                     <img src="/image/index/hh.png" alt="">
                     </figure>
                     <figure class="yd-timelineImg">
                     <img src="/image/index/hh.png" alt="">
                     </figure>
                     <figure class="yd-timelineImg">
                     <img src="/image/index/hh.png" alt="">
                     <figure class="yd-moreImgMask">
                     <p>还有<span>12</span>张<i class="icon-detailsArrow"></i></p>
                     </figure>
                     </figure>
                     </section>*/
                    switch (imgSrcBox["imgIte" + disNum].length) {
                        case 0:

                            break;
                        case 1:
                            innerImgSrc = "<section class=\"yd-timelineImgBox\"  data-imgData=\'" + JSON.stringify(imgBoxData[disNum].imgData) + "\'>" +
                                "<figure class=\"yd-timelineImg\"><img src=\""+imgSrcBox["imgIte" + disNum][0]+"\" alt=\"\"></figure>" +
                                "</section>";
                            break;
                        case 2:
                            innerImgSrc = "<section class=\"yd-timelineImgBox\"  data-imgData=\'" + JSON.stringify(imgBoxData[disNum].imgData) + "\'>" +
                                "<figure class=\"yd-timelineImg\"><img src=\""+imgSrcBox["imgIte" + disNum][0]+"\" alt=\"\"></figure>" +
                                "<figure class=\"yd-timelineImg\"><img src=\""+imgSrcBox["imgIte" + disNum][1]+"\" alt=\"\"></figure>" +
                                "</section>";
                            break;
                        case 3:
                            innerImgSrc = "<section class=\"yd-timelineImgBox\"  data-imgData=\'" + JSON.stringify(imgBoxData[disNum].imgData) + "\'>" +
                                "<figure class=\"yd-timelineImg\"><img src=\""+imgSrcBox["imgIte" + disNum][0]+"\" alt=\"\"></figure>" +
                                "<figure class=\"yd-timelineImg\"><img src=\""+imgSrcBox["imgIte" + disNum][1]+"\" alt=\"\"></figure>" +
                                "<figure class=\"yd-timelineImg\"><img src=\""+imgSrcBox["imgIte" + disNum][2]+"\" alt=\"\"></figure>" +
                                "</section>";
                            break;
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                            var resetImg = imgBoxLen - 3;
                            innerImgSrc = "<section class=\"yd-timelineImgBox\"  data-imgData=\'" + JSON.stringify(imgBoxData[disNum].imgData) + "\'>" +
                                "<figure class=\"yd-timelineImg\"><img src=\""+imgSrcBox["imgIte" + disNum][0]+"\" alt=\"\"></figure>" +
                                "<figure class=\"yd-timelineImg\"><img src=\""+imgSrcBox["imgIte" + disNum][1]+"\" alt=\"\"></figure>" +
                                "<figure class=\"yd-timelineImg\"><img src=\""+imgSrcBox["imgIte" + disNum][2]+"\" alt=\"\"><figure class=\"yd-moreImgMask\"><p>还有<span>"+resetImg +"</span>张<i class=\"icon-detailsArrow\"></i></p></figure></figure>" +
                                "</section>";
                            break;
                        default:
                            break;
                    }
                    if (listData[disNum].id) {
                        if (checkStr(listData[disNum].id)) {
                            discussId = listData[disNum].id;
                        } else {

                        }
                    }
                    if (listData[disNum].createTime) {
                        if (checkStr(listData[disNum].createTime)) {
                            //console.log(listData[disNum].createTime);
                            duringTime = comm.date.diffDay_one(listData[disNum].createTime, comm.date.local_time());
                            timeStr = "<p class=\"yd-timelineTime\">" + duringTime + "</p>";
                        } else {

                        }
                    }
                    //头像数据有问题
                    var defaultLogUrl = "//www.yi-ding.net.cn/image/authority/login/normalImg.png";
                    if (listData[disNum].customerLogoUrl) {
                        if (checkStr(listData[disNum].customerLogoUrl)) {
                            logSrc = listData[disNum].customerLogoUrl;
                            logStr = "<a href=\"javascript:void(0)\"><img src=\"" + logSrc + "\" alt=\"\"></a>";
                        } else {
                            logStr = "<a href=\"javascript:void(0)\"><img src=\"" + defaultLogUrl + "\" alt=\"\"></a>";
                        }
                    } else {
                        logStr = "<a href=\"javascript:void(0)\"><img src=\"" + defaultLogUrl + "\" alt=\"\"></a>";
                    }

                    if (listData[disNum].customerId) {
                        if (checkStr(listData[disNum].customerId)) {
                            cusId = listData[disNum].customerId;
                        } else {

                        }
                    }
                    if (listData[disNum].reviewContent) {
                        if (checkStr(listData[disNum].reviewContent)) {
                            var parentName = listData[disNum].parentCustomerName;
                            reviewContent = comm.htmlToString(listData[disNum].reviewContent);
                            reviewStr = "<article class=\"yd-timelineContentText\"><a href=\"javascript:void(0)\">" + parentName + "：</a>" + reviewContent + "</article>";
                        } else {

                        }
                    }
                    var recommendStr = "";
                    if (listData[disNum].recommendNum) {
                        if (checkStr(listData[disNum].recommendNum)) {
                            recommendNum = listData[disNum].recommendNum;
                            if (recommendNum == "0") {
                                recommendNum = "回答";
                            }
                            recommendStr = "<div class=\"aswer\" data-reviewType=\'"+listData[disNum].reviewType+"\' data-refBelongId=\'"+listData[disNum].refBelongId+"\'><i></i><span>" + recommendNum + "</span></div>";
                        } else {

                        }
                    }
                    if (listData[disNum].customerName) {
                        if (checkStr(listData[disNum].customerName)) {
                            customerName = listData[disNum].customerName;
                            nameStr = "<a href=\"javascript:void(0)\">" + customerName + "<i class=\"yd-vipUser\"></i></a>"
                        } else {
                            nameStr = "<a href=\"javascript:void(0)\" class=' lucency'>" + "暂未认证" + "<i class=\"yd-vipUser\"></i></a>";
                        }
                    } else {
                        nameStr = "<a href=\"javascript:void(0)\" class=' lucency'>" + "暂未认证" + "<i class=\"yd-vipUser\"></i></a>";
                    }
                        var customerCompany = "";
                    if (listData[disNum].customerCompany) {
                        if (checkStr(listData[disNum].customerCompany)) {
                            customerCompany = listData[disNum].customerCompany;
                            customerCompanyStr = "<span>" + customerCompany + "</span>";
                        } else {
                            customerCompanyStr = "<span  class='lucency'>" + "暂未认证" + "</span>";
                        }
                    } else {
                        customerCompanyStr = "<span  class='lucency'>" + "暂未认证" + "</span>";
                    }
                    if (listData[disNum].upNum) {
                        if (checkStr(listData[disNum].upNum)) {
                            upNum = listData[disNum].upNum;
                            if (upNum == "0") {
                                upNum = "点赞";
                            }
                            upNumStr = "<div class=\"praise\"><i class=\"selected\"></i><span>" + upNum + "</span></div>";
                        } else {

                        }
                    }
                    recoStr += "<section class=\"yd-timelineContentItemBox\"><i class=\"yd-timeline\"></i><article class=\"yd-timelineContentItem\"><figure class=\"yd-timelineUserImg\">" +
                        logStr +
                        "</figure><article class=\"yd-timelineContentTextBox\"><header class=\"yd-timelineContentAuthor\">" +
                        nameStr +
                        customerCompanyStr +
                        timeStr +
                        "</header>" +
                        reviewStr +
                        "</article>" +
                        "</article>" +
                        "</section>";


                }
                var crecoStr = "";
                if (listData[listData.length - 1].child_list.length > 0) {
                    var childData = listData[listData.length - 1].child_list;
                    var creviewStr = "";
                    var cimgSrcBox = {};
                    var cdiscussId = "";
                    var cduringTime = "";
                    var ctimeStr = "";
                    var clogSrc = "";
                    var clogStr = "";
                    var ccusId = "";
                    var creviewContent = "";
                    var crecommendNum = "";
                    var ccustomerName = "";
                    var cnameStr = "";
                    var ccustomerCompanyStr = "";
                    var cupNum = "";
                    var cupNumStr = "<div class=\"praise\"><i></i><span></span></div>";
                    var cimgBoxData = [];
                    for (var childNum = 0; childNum < childData.length; childNum++) {
                        var cisValid = childData[childNum].reviewStatus;
                        cimgSrcBox["imgIte" + childNum] = [];
                        cimgBoxData[childNum] = {};
                        cimgBoxData[childNum].imgData = [];
                        for (var cattachNum = 0; cattachNum < childData[childNum].attachment_list.length; cattachNum++) {
                            cimgBoxData[childNum].imgData[cattachNum] = {};
                            cimgBoxData[childNum].imgData[cattachNum].time = childData[childNum].attachment_list[cattachNum].attachment.uploadTime;
                            cimgBoxData[childNum].imgData[cattachNum].name = "";
                            cimgBoxData[childNum].imgData[cattachNum].src = childData[childNum].attachment_list[cattachNum].attachment.reviewAttUrl;
                            cimgSrcBox["imgIte" + childNum][cattachNum] = childData[childNum].attachment_list[cattachNum].attachment.reviewAttUrl;
                        }
                        var cinnerImgSrc = "";
                        var cimgBoxLen = cimgSrcBox["imgIte" + childNum].length;
                        if(childData[childNum].reviewContent!="该条评论已被作者删除") {
                            switch (cimgSrcBox["imgIte" + childNum].length) {
                                case 0:

                                    break;
                                case 1:
                                    cinnerImgSrc = "<section class=\"yd-timelineImgBox\"     data-discussid=\'"+childData[childNum].id+"\'  data-imgData=\'" + JSON.stringify(cimgBoxData[childNum].imgData) + "\'>" +
                                        "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][0] + "\" alt=\"\"></figure>" +
                                        "</section>";
                                    break;
                                case 2:
                                    cinnerImgSrc = "<section class=\"yd-timelineImgBox\"    data-discussid=\'"+childData[childNum].id+"\'   data-imgData=\'" + JSON.stringify(cimgBoxData[childNum].imgData) + "\'>" +
                                        "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][0] + "\" alt=\"\"></figure>" +
                                        "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][1] + "\" alt=\"\"></figure>" +
                                        "</section>";
                                    break;
                                case 3:
                                    cinnerImgSrc = "<section class=\"yd-timelineImgBox\"    data-discussid=\'"+childData[childNum].id+"\'   data-imgData=\'" + JSON.stringify(cimgBoxData[childNum].imgData) + "\'>" +
                                        "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][0] + "\" alt=\"\"></figure>" +
                                        "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][1] + "\" alt=\"\"></figure>" +
                                        "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][2] + "\" alt=\"\"></figure>" +
                                        "</section>";
                                    break;
                                case 4:
                                case 5:
                                case 6:
                                case 7:
                                case 8:
                                case 9:
                                    var cresetImg = cimgBoxLen - 3;
                                    cinnerImgSrc = "<section class=\"yd-timelineImgBox\"    data-discussid=\'"+childData[childNum].id+"\'  data-imgData=\'" + JSON.stringify(cimgBoxData[childNum].imgData) + "\'>" +
                                        "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][0] + "\" alt=\"\"></figure>" +
                                        "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][1] + "\" alt=\"\"></figure>" +
                                        "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][2] + "\" alt=\"\"><figure class=\"yd-moreImgMask\"><p>还有<span>" + cresetImg + "</span>张<i class=\"icon-detailsArrow\"></i></p></figure></figure>" +
                                        "</section>";
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (childData[childNum].id) {
                            if (checkStr(childData[childNum].id)) {
                                cdiscussId = childData[childNum].id;
                            }
                        }
                        if (childData[childNum].createTime) {
                            if (checkStr(childData[childNum].createTime)) {
                                cduringTime = comm.date.diffDay_one(childData[childNum].createTime, comm.date.local_time());
                                ctimeStr = "<p class=\"yd-timelineTime\">" + cduringTime + "</p>";
                            }
                        }
                        //头像数据有问题
                        var cdefaultLogUrl = "//www.yi-ding.net.cn/image/authority/login/normalImg.png";
                        if (childData[childNum].customerLogoUrl) {
                            if (checkStr(childData[childNum].customerLogoUrl)) {
                                clogSrc = childData[childNum].customerLogoUrl;
                                clogStr = "<a href=\"javascript:void(0)\"><img src=\"" + clogSrc + "\" alt=\"\"></a>";
                            } else {
                                logStr = "<a href=\"javascript:void(0)\"><img src=\"" + cdefaultLogUrl + "\" alt=\"\"></a>";
                            }
                        } else {
                            clogStr = "<a href=\"javascript:void(0)\"><img src=\"" + cdefaultLogUrl + "\" alt=\"\"></a>";
                        }

                        if (childData[childNum].customerId) {
                            if (checkStr(childData[childNum].customerId)) {
                                ccusId = childData[childNum].customerId;
                            }
                        }
                        if (childData[childNum].reviewContent) {
                            if (checkStr(childData[childNum].reviewContent)) {
                                var cparentName = childData[childNum].parentCustomerName;
                                creviewContent = childData[childNum].reviewContent;
                                creviewStr = "<article class=\"yd-timelineContentText\"><a href=\"javascript:void(0)\">回复给" + cparentName + "：</a>" + creviewContent + "</article>";
                            } else {

                            }
                        }
                        /*var crecommendStr = "<div class=\"aswer\" data-discussid=\'"+childData[childNum].parentId+"\' data-refBelongId=\'"+childData[childNum].refBelongId+"\'><i></i><span></span></div>";
                         if (childData[childNum].reviewNum) {
                         if (checkStr(childData[childNum].reviewNum)) {
                         crecommendNum = childData[childNum].reviewNum;
                         if (crecommendNum == "0") {
                         crecommendNum = "回复";
                         }
                         crecommendStr = "<div class=\"aswer\"  data-discussid=\'"+childData[childNum].parentId+"\' data-refBelongId=\'"+childData[childNum].refBelongId+"\'><i></i><span>" + crecommendNum + "</span></div>";
                         } else {

                         }
                         }*/
                        if (childData[childNum].customerName) {
                            if (checkStr(childData[childNum].customerName)) {
                                ccustomerName = childData[childNum].customerName;
                                if(childData[childNum].customerState==2||childData[childNum].customerState==1){
                                    cnameStr = "<a href=\"javascript:void(0)\">" + ccustomerName + "<i class=\"yd-vipUser\"></i></a>";
                                }else {
                                    cnameStr = "<a href=\"javascript:void(0)\">" + ccustomerName + "<i></i></a>";
                                }
                            } else {
                                cnameStr = "<a href=\"javascript:void(0)\" class=' lucency'>" + "暂未认证" + "<i></i></a>";
                            }
                        } else {
                            cnameStr = "<a href=\"javascript:void(0)\" class=' lucency'>" + "暂未认证" + "<i></i></a>";
                        }
                        var ccustomerCompany = "";
                        if (childData[childNum].customerCompany) {
                            if (checkStr(childData[childNum].customerCompany)) {
                                ccustomerCompany = childData[childNum].customerCompany;
                                ccustomerCompanyStr = "<span>" + ccustomerCompany + "</span>";
                            } else {
                                ccustomerCompanyStr = "<span  class='lucency'>" + "暂未认证" + "</span>";
                            }
                        } else {
                            ccustomerCompanyStr = "<span  class='lucency'>" + "暂未认证" + "</span>";
                        }
                        /*if (childData[childNum].upNum) {
                         if (checkStr(childData[childNum].upNum)) {
                         cupNum = childData[childNum].upNum;
                         if (cupNum == "0") {
                         cupNum = "点赞";
                         }
                         if(childData[childNum].isPrefer=='0'){
                         cupNumStr = "<div class=\"praise\"   data-discussid=\'"+discussId+"\'><i></i><span>"+cupNum+"</span></div>";
                         }else {
                         if(cupNum=="点赞"){
                         cupNum=1;
                         }
                         cupNumStr = "<div class=\"praise\"   data-discussid=\'"+discussId+"\'><i class='selected'  data-praiseid=\'"+childData[disNum].preferId+"\'></i><span>"+cupNum+"</span></div>";
                         }
                         } else {

                         }
                         }*/
                        crecoStr += "<section class=\"yd-timelineContentItemBox\"><i class=\"yd-timeline\"></i><article class=\"yd-timelineContentItem\"><figure class=\"yd-timelineUserImg\">" + clogStr + "</figure><article class=\"yd-timelineContentTextBox\"><header class=\"yd-timelineContentAuthor\">" + cnameStr + ccustomerCompanyStr + ctimeStr + "</header>" + creviewStr + cinnerImgSrc+"</article>" + "</article>" + "</section>";
                    }
                }
                var discussStr = "<section class=\"exercise-discuss\">" +
                    "<header class=\"al-commentDetailsTitle ev-title\">讨论<i class=\"al-commentDetailsClose ev-close\"></i></header>" +
                    "<section class=\"yd-timelineContent\">" +
                    "<header class=\"yd-timelineTitle\"><h2>" + titleName + "</h2><a class=\"btn-primary al-timelineFollow\">关注</a></header>" +
                    recoStr +
                    "<footer class=\"yd-timelineFooter\"><div class=\"clear\"><div class=\"disscussFunction clear\"><div class=\"aswer\"><i></i><span>回答</span></div><div class=\"praise\"><i></i><span>点赞</span></div></div>" +
                    "<div class=\"discussPublish pcModule\"  data-attach=\'0\'   >" +
                    "<textarea placeholder=\"请输入你想说的话\"></textarea>" +
                    "<div class=\"uploadImg\" style=\"display: none;\">" +
                    "<ul class=\"uploadImgContainer\"></ul>" +
                    "<div class=\"imgNum\">还能添加9张图片</div>" +
                    "</div>" +
                    "<div class=\"discussPublishImg\">" +
                    "<form class=\"uploadIcon uploadPic\" method=\"POST\" enctype=\"multipart/form-data\">                    图片" +
                    "<input type=\"file\" class=\"postPicButton\" name=\"file\" style=\"font-size: 12px; cursor: pointer; position: absolute; left: 0px; opacity: 0; outline: none; width: 50px; height: 30px;\">" +
                    "</form><div class=\"uploadBut\">" +
                    "<button class=\"al-commentCancel evReviewBoxCancel\">取消</button>" +
                    "<button class=\"al-commentCommit evReviewBoxSubmit fb_but\" data-parent=\'00" + + disNum + "\'>评论</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div></footer>" +
                    "</section>" +
                    "<section class=\"yd-timelineContent al-replayComment\">" +
                    crecoStr +
                    "</section>" +
                    "</section>";
                outContainer.html(discussStr);
                $(".aswer").each(function () {
                    // console.log($(this))
                    $(this).unbind("click").bind("click", function () {
                        var options = {"type":"14","success":function(){
                            publishCriticism($(".discussPublish").show());
                        },"falied":function(){
                            comm.confirmBox({
                                "title": "暂未认证不能进行相关操作",
                                "cancel": "暂不认证",
                                "ensure": "去认证",
                                "ensureCallback": function () {
                                    loginAbout.approve.show({
                                        "success": function () {
                                            globalVar.approve = true;
                                            loginAbout.approve.exit()
                                        }
                                    });
                                },
                                "cancelCallback": function () {
                                    $(".yd-confirmModalMask").remove();
                                }
                            });
                        }};
                        loginAbout.permission.returnAu(options);
                    });
                });
                $(".praise").each(function () {
                    $(this).unbind("click").bind("click", function () {
                        $(this).find("i").toggleClass("selected");
                    });
                });
                $(".al-commentDetailsClose").unbind("click").bind("click", function () {
                    outContainer.remove();
                    $('body').removeClass('yd_overflow');
                });
                $(".yd-timelineImgBox .yd-timelineImg").each(function(){
                    $(this).unbind("click").bind("click",function(){
                        var nowImdData = JSON.parse($(this).parent().attr("data-imgData"));
                        var nowIndex = parseInt($(this).index())+1;
                        var nowDiscussId = $(this).parent().attr("data-discussid");

                        // console.log(nowImdData)
                        creatCarousel.creatHtml(nowImdData,nowIndex,nowDiscussId);
                    })
                });
                break;
        }
        comm.loading.hide();
    }
    function awserPaier() {
        //发表评论
        $(".aswer").each(function(){
            $(this).unbind("click").bind("click", function () {
                var approveInfo=JSON.parse(localStorage.getItem('approveInfo'));
                if(approveInfo.state==1||approveInfo.state==2){
                    // console.log(loginAbout.approve.status().auState)
                    // data-discussid=\'"+listData[disNum].refId+"\' data-reviewid=\'"+listData[disNum].id+"\' data-reviewType=\'"+listData[disNum].reviewType+"\' data-refBelongId=\'"+listData[disNum].refBelongId
                    var discussId = $(this).attr("data-discussid");
                    var reviewid = $(this).attr("data-reviewid");
                    var reviewType=$(this).attr('data-reviewType');
                    var refBelongId=$(this).attr('data-refBelongId');
                    var isquestion=$(this).attr('data-isquestion');
                    var options = {
                        container: $(this).parent(),
                        refId: discussId,
                        position: "after",
                        parentid: reviewid,
                        reviewType:reviewType,
                        refBelongId:refBelongId,
                        isquestion:isquestion
                    };

                    public(options);
                }else{
                    authentication.init({"type":"trigger",before:function(){},"success":function(){
                        authentication.exit();

                    }});
                }

            });
        });
        //点赞功能
        $(".praise").each(function(){
            $(this).unbind("click").bind("click",function(){
                var approveInfo=JSON.parse(localStorage.getItem('approveInfo'));
                if(approveInfo.state==1||approveInfo.state==2){
                    var spanText=$(this).find('span');
                    var isQuestion=$(this).attr('data-isquestion');
                    exerciseCommonPraiseNum=spanText.text();
                    $(this).find("i").toggleClass("selected");
                    var isThisObj = $(this).find("i");
                    var praiseOnOff = $(this).find("i").hasClass("selected");
                    // data-discussid=\'"+discussId+"\' data-reviewid=\'"+listData[disNum].refId+"\' data-reviewType=\'"+listData[disNum].reviewType+"\' data-refBelongId=\'"+listData[disNum].refBelongId+"\'>
                    var refid = $(this).attr("data-discussid");
                    // var refid = $(this).attr("data-discussid");
                    var refbelongid = $(this).attr("data-refbelongid");
                    if(praiseOnOff){
                        var praiseData='';
                        if(isQuestion){
                            praiseData = {
                                "preferType":"4",
                                "refId":refbelongid,
                                "customerId":loginAbout.login.status().userId
                            };
                        }else {
                            praiseData = {
                                "preferType":"8",
                                "refId":refid,
                                "customerId":loginAbout.login.status().userId
                            };
                        }
                        praiseData = {"paramJson": $.toJSON(praiseData)};
                        $.ajax({
                            url: "//www.yi-ding.net.cn/call/customer/prefer/create/",    //请求的url地址
                            dataType: "json",   //返回格式为json
                            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                            data: praiseData,    //参数值
                            type: "POST",   //请求方式
                            beforeSend: function () {
                                //请求前的处理
                            },
                            success: function (req) {
                                //请求成功时处理

                                if (req.responseObject.responseStatus) {
                                    var praiseId = req.responseObject.responsePk;
                                    isThisObj.attr("data-praiseId",praiseId);
                                    if(isThisObj.hasClass('selected')){
                                        if(exerciseCommonPraiseNum=='点赞'){
                                            spanText.text('1')
                                        }else {
                                            exerciseCommonPraiseNum++;
                                            spanText.text(exerciseCommonPraiseNum)
                                        }
                                    }

                                }

                            },
                            complete: function () {
                                //请求完成的处理
                            },
                            error: function () {
                                //请求出错处理
                            }
                        });
                    }else{
                        var zanId = isThisObj.attr("data-praiseId");
                        // console .log(isThisObj)
                        // console.log(zanId)
                        var cancelpraiseData = {
                            "id":zanId
                        };
                        cancelpraiseData = {"paramJson": $.toJSON(cancelpraiseData)};
                        $.ajax({
                            url: "//www.yi-ding.net.cn/call/customer/prefer/cancel/",    //请求的url地址
                            dataType: "json",   //返回格式为json
                            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                            data: cancelpraiseData,    //参数值
                            type: "POST",   //请求方式
                            beforeSend: function () {
                                //请求前的处理
                            },
                            success: function (req) {
                                //请求成功时处理

                                if (req.responseObject.responseStatus) {
                                    // console.log("取消点赞");
                                    if(!isThisObj.hasClass('selected')){
                                        if(exerciseCommonPraiseNum=='点赞'){

                                        }else {
                                            exerciseCommonPraiseNum--;
                                            if(exerciseCommonPraiseNum=='0'){
                                                spanText.text('点赞');
                                            }else {
                                                spanText.text(exerciseCommonPraiseNum);
                                            }
                                        }
                                    }

                                }

                            },
                            complete: function () {
                                //请求完成的处理
                            },
                            error: function () {
                                //请求出错处理
                            }
                        });
                    }
                }else{
                    authentication.init({"type":"trigger",before:function(){},"success":function(){
                        authentication.exit();

                    }});
                }


            });
        });
        //对划线查看大图
        $(".yd-timelineImgBox .yd-timelineImg").each(function(){
            $(this).unbind("click").bind("click",function(){
                var nowImdData = JSON.parse($(this).parent().attr("data-imgData"));
                var nowIndex = parseInt($(this).index())+1;
                var nowDiscussId = $(this).parent().attr("data-discussid");
                creatCarousel.creatHtml(nowImdData,nowIndex,nowDiscussId);
            })
        });
    }

function disscussLine(data,callBack){
    $('body').addClass('yd_overflow');
    comm.maskBackground.show("rgba(0,0,0,.6)");
    var outContainer = $(".yd-maskBackground");
    function checkStr(str) {
        return str.length > 0 ? true: false;
    }

    var listData = data.responseObject.responseData.data_list;
    var reviewStr = "";
    var imgSrcBox = {};
    var discussId = "";
    var duringTime = "";
    var timeStr = "";
    var logSrc = "";
    var logStr = "";
    var cusId = "";
    var reviewContent = "";
    var recommendNum = "";
    var customerName = "";
    var nameStr = "";
    var customerCompanyStr = "";
    var upNum = "";
    var upNumStr = "";
    var recoStr = "";
    var imgBoxData = [];
    var titleName='';
    var courseTitle='';
    var courseTitleStr = "";
    if(data.responseObject.responseData.belongTitle==''){
         titleName = data.responseObject.responseData.title;
    }else {
        titleName = data.responseObject.responseData.belongTitle;
        courseTitle= data.responseObject.responseData.title;
        courseTitleStr="<header class=\"yd-timelineTitle\" data-titleid=\'"+data.responseObject.responseData.data_list[0].refBelongId+"\'><h2>"+courseTitle+"</h2></header>";
    }
    if(data.responseObject.responseData.head_message){
        titleName=data.responseObject.responseData.head_message.questionName;
        courseTitle= data.responseObject.responseData.head_message.courseTitle;
        courseTitleStr="<header class=\"yd-timelineTitle\" data-titleid=\'"+data.responseObject.responseData.head_message.questionId+"\'><h2>"+courseTitle+"</h2></header>";
    }
    for (var disNum = 0; disNum < listData.length; disNum++) {
        var isValid = listData[disNum].reviewStatus;
        imgSrcBox["imgIte" + disNum] = [];
        imgBoxData[disNum] = {};
        imgBoxData[disNum].imgData = [];

        for (var attachNum = 0; attachNum < listData[disNum].attachment_list.length; attachNum++) {
            imgBoxData[disNum].imgData[attachNum] = {};
            imgBoxData[disNum].imgData[attachNum].time = listData[disNum].attachment_list[attachNum].attachment.uploadTime;
            imgBoxData[disNum].imgData[attachNum].name = "";
            imgBoxData[disNum].imgData[attachNum].src = listData[disNum].attachment_list[attachNum].attachment.reviewAttUrl;
            imgSrcBox["imgIte" + disNum][attachNum] = listData[disNum].attachment_list[attachNum].attachment.reviewAttUrl;
        }
        // console.log(innerImgSrc)
        if (listData[disNum].id) {
            if (checkStr(listData[disNum].id)) {
                discussId = listData[disNum].id;
            }
        }
        var innerImgSrc = "";
        var imgBoxLen = imgSrcBox["imgIte" + disNum].length;
        // console.log(listData[disNum].reviewContent)
        if(listData[disNum].reviewContent!="该条评论已被作者删除"){
            switch (imgSrcBox["imgIte"+disNum].length){
                case 0:
                    break;
                case 1:
                    innerImgSrc = "<ul class=\"oneAds\" data-imgData=\'"+JSON.stringify(imgBoxData[disNum].imgData)+"\'>"+
                        "<li><img src=\""+imgSrcBox["imgIte"+disNum][0]+"\"> </li>"+
                        "</ul>" ;
                    break;
                case 2:
                    innerImgSrc = "<ul class=\"moreAds\" data-imgData=\'"+JSON.stringify(imgBoxData[disNum].imgData)+"\'>"+
                        "<li><img src=\""+imgSrcBox["imgIte"+disNum][0]+"\"></li>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][1]+"\"></li>"+
                        "</ul>";
                    break;
                case 3:
                    innerImgSrc = "<ul class=\"moreAds\" data-imgData=\'"+JSON.stringify(imgBoxData[disNum].imgData)+"\'>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][0]+"\"></li>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][1]+"\"></li>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][2]+"\"></li>" +
                        "</ul>";
                    break;
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    var resetImg = imgBoxLen-3
                    innerImgSrc = "<ul class=\"moreAds\" data-imgData=\'"+JSON.stringify(imgBoxData[disNum].imgData)+"\'>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][0]+"\"></li>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][1]+"\"></li>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][2]+"\"><div class=\"numImg\"></div><i><span>还有"+resetImg+"张</span></i></li>" +
                        "</ul>";
                    break;
                default:
                    break;
            }
        }

        if (listData[disNum].createTime) {
            if (checkStr(listData[disNum].createTime)) {
                //console.log(listData[disNum].createTime);
                duringTime = comm.date.diffDay_one(listData[disNum].createTime, comm.date.local_time());
                timeStr = "<p class=\"yd-timelineTime\">" + duringTime + "</p>";
            }
        }
        //头像数据有问题
        var defaultLogUrl = "//www.yi-ding.net.cn/image/authority/login/normalImg.png";
        if (listData[disNum].customerLogoUrl) {
            if (checkStr(listData[disNum].customerLogoUrl)) {
                logSrc = listData[disNum].customerLogoUrl;
                logStr = "<a href=\"javascript:void(0)\"><img src=\"" + logSrc + "\" alt=\"\"></a>";
            } else {
                logStr = "<a href=\"javascript:void(0)\"><img src=\"" + defaultLogUrl + "\" alt=\"\"></a>";
            }
        } else {
            logStr = "<a href=\"javascript:void(0)\"><img src=\"" + defaultLogUrl + "\" alt=\"\"></a>";
        }

        if (listData[disNum].customerId) {
            if (checkStr(listData[disNum].customerId)) {
                cusId = listData[disNum].customerId;
            }
        }
        if (listData[disNum].reviewContent) {
            if (checkStr(listData[disNum].reviewContent)) {
                var parentName = listData[disNum].parentCustomerName;
                reviewContent = comm.htmlToString(listData[disNum].reviewContent);
                if(parentName!=''){
                    reviewStr = "<article class=\"yd-timelineContentText\"><a href=\"javascript:void(0)\">回复给" + parentName + "：</a>" + reviewContent +  innerImgSrc+"</article>";
                }else {
                    reviewStr = "<article class=\"yd-timelineContentText\"><a href=\"javascript:void(0)\">" + parentName + "</a>" + reviewContent +  innerImgSrc+"</article>";
                }
            }
        }else {
            reviewStr = "<article class=\"yd-timelineContentText\"><a href=\"javascript:void(0)\">" + '' + "</a>" + '' +  innerImgSrc+"</article>";
        }
        var recommendStr = "";
        if (listData[disNum].reviewNum) {
            if (checkStr(listData[disNum].reviewNum)) {
                recommendNum = listData[disNum].reviewNum;
                if(data.responseObject.responseData.head_message){
                    recommendNum=data.responseObject.responseData.head_message.questionReviewNum;
                }
                if (recommendNum == "0") {
                    recommendNum = "回复";
                }
                if(data.responseObject.responseData.head_message){
                    recommendStr = "<div class=\"aswer\" data-isquestion=\'true\' data-discussid=\'"+listData[disNum].refId+"\' data-reviewid=\'"+listData[disNum].id+"\' data-reviewType=\'"+listData[disNum].reviewType+"\' data-refBelongId=\'"+listData[disNum].refBelongId+"\'><i></i><span>" + recommendNum + "</span></div>";
                }else {
                    recommendStr = "<div class=\"aswer\" data-discussid=\'"+listData[disNum].refId+"\' data-reviewid=\'"+listData[disNum].id+"\' data-reviewType=\'"+listData[disNum].reviewType+"\' data-refBelongId=\'"+listData[disNum].refBelongId+"\'><i></i><span>" + recommendNum + "</span></div>";
                }

            }
        }
        if (listData[disNum].customerName) {
            if (checkStr(listData[disNum].customerName)) {
                customerName = listData[disNum].customerName;
                if(listData[disNum].customerState==2||listData[disNum].customerState==1){
                    nameStr = "<a href=\"javascript:void(0)\">" + customerName + "<i class=\"yd-vipUser\"></i></a>";
                }else {
                    nameStr = "<a href=\"javascript:void(0)\">" + customerName + "<i></i></a>";
                }
            } else {
                nameStr = "<a href=\"javascript:void(0)\" class=' lucency'>" + "暂未认证" + "<i></i></a>";
            }
        } else {
            nameStr = "<a href=\"javascript:void(0)\" class=' lucency'>" + "暂未认证" + "<i></i></a>";
        }
        var customerCompany = "";
        if (listData[disNum].customerCompany) {
            if (checkStr(listData[disNum].customerCompany)) {
                customerCompany = listData[disNum].customerCompany;
                customerCompanyStr = "<span>" + customerCompany + "</span>";
            } else {
                customerCompanyStr = "<span  class='lucency'>" + "暂未认证" + "</span>";
            }
        } else {
            customerCompanyStr = "<span  class='lucency'>" + "暂未认证" + "</span>";
        }
        if (listData[disNum].upNum) {
            if (checkStr(listData[disNum].upNum)) {
                upNum = listData[disNum].upNum;
                if(data.responseObject.responseData.head_message){
                    upNum=data.responseObject.responseData.head_message.questionPreferNum;
                }
                if (upNum == "0") {
                    upNum = "点赞";
                }
                if(data.responseObject.responseData.head_message){
                    if(listData[disNum].isPrefer=='0'){
                        upNumStr = "<div class=\"praise\" data-isquestion=\'true\'  data-discussid=\'"+discussId+"\' data-reviewid=\'"+listData[disNum].refId+"\' data-reviewType=\'"+listData[disNum].reviewType+"\' data-refBelongId=\'"+listData[disNum].refBelongId+"\'><i></i><span>"+upNum+"</span></div>";
                    }else {
                        if(upNum=="点赞"){
                            upNum=1;
                        }
                        if(listData[disNum].preferId!=undefined){
                            upNumStr = "<div class=\"praise\"  data-isquestion=\'true\'  data-discussid=\'"+discussId+"\' data-reviewid=\'"+listData[disNum].refId+"\' data-reviewType=\'"+listData[disNum].reviewType+"\' data-refBelongId=\'"+listData[disNum].refBelongId+"\'><i class='selected'  data-praiseid=\'"+listData[disNum].preferId+"\'></i><span>"+upNum+"</span></div>";
                        }else {
                            upNumStr = "<div class=\"praise\"  data-isquestion=\'true\'  data-discussid=\'"+discussId+"\' data-reviewid=\'"+listData[disNum].refId+"\' data-reviewType=\'"+listData[disNum].reviewType+"\' data-refBelongId=\'"+listData[disNum].refBelongId+"\'><i class='selected'  data-praiseid=\'\'></i><span>"+upNum+"</span></div>";
                        }
                    }
                }else {
                    if(listData[disNum].isPrefer=='0'){
                        upNumStr = "<div class=\"praise\"   data-discussid=\'"+discussId+"\' data-reviewid=\'"+listData[disNum].refId+"\' data-reviewType=\'"+listData[disNum].reviewType+"\' data-refBelongId=\'"+listData[disNum].refBelongId+"\'><i></i><span>"+upNum+"</span></div>";
                    }else {
                        if(upNum=="点赞"){
                            upNum=1;
                        }
                        if(listData[disNum].preferId!=undefined){
                            upNumStr = "<div class=\"praise\"    data-discussid=\'"+discussId+"\' data-reviewid=\'"+listData[disNum].refId+"\' data-reviewType=\'"+listData[disNum].reviewType+"\' data-refBelongId=\'"+listData[disNum].refBelongId+"\'><i class='selected'  data-praiseid=\'"+listData[disNum].preferId+"\'></i><span>"+upNum+"</span></div>";
                        }else {
                            upNumStr = "<div class=\"praise\"    data-discussid=\'"+discussId+"\' data-reviewid=\'"+listData[disNum].refId+"\' data-reviewType=\'"+listData[disNum].reviewType+"\' data-refBelongId=\'"+listData[disNum].refBelongId+"\'><i class='selected'  data-praiseid=\'\'></i><span>"+upNum+"</span></div>";
                        }
                    }
                }
            }
        }
        if(data.responseObject.responseData.head_message){
            recoStr += "<section class=\"yd-timelineContentItemBox\"><i class=\"\"></i><article class=\"yd-timelineContentItem\"><figure class=\"yd-timelineUserImg\">" + logStr + "</figure><article class=\"yd-timelineContentTextBox\"><header class=\"yd-timelineContentAuthor\">" + nameStr + customerCompanyStr + timeStr + "</header>" + reviewStr + "</article>" + "</article>" +"</section>";
        }else {
            recoStr += "<section class=\"yd-timelineContentItemBox\"><i class=\"yd-timeline\"></i><article class=\"yd-timelineContentItem\"><figure class=\"yd-timelineUserImg\">" + logStr + "</figure><article class=\"yd-timelineContentTextBox\"><header class=\"yd-timelineContentAuthor\">" + nameStr + customerCompanyStr + timeStr + "</header>" + reviewStr + "</article>" + "</article>" +"</section>";
        }


    }
    var crecoStr = "";
    if(data.responseObject.responseData.head_message){
        var discussStr = "<section class=\"exercise-discuss\">" + "<header class=\"al-commentDetailsTitle ev-title\">讨论<i class=\"al-commentDetailsClose ev-close\"></i></header>" + "<section class=\"yd-timelineContent courseTopBg\">"+courseTitleStr + "<header class=\"yd-timelineTitle\"><h2>" + titleName + "</h2></header>"  + "<footer class=\"yd-timelineFooter\"><div class=\"clear\"><div class=\"disscussFunction clear\">"+recommendStr+upNumStr+"</div></div></footer>"+ recoStr + "</section>" + "<section class=\"yd-timelineContent al-replayComment\">" + crecoStr + "</section>" +  "</section>";
    }else {
        if (listData[listData.length - 1].child_list.length > 0) {
            var childData = listData[listData.length - 1].child_list;
            var creviewStr = "";
            var cimgSrcBox = {};
            var cdiscussId = "";
            var cduringTime = "";
            var ctimeStr = "";
            var clogSrc = "";
            var clogStr = "";
            var ccusId = "";
            var creviewContent = "";
            var crecommendNum = "";
            var ccustomerName = "";
            var cnameStr = "";
            var ccustomerCompanyStr = "";
            var cupNum = "";
            var cupNumStr = "<div class=\"praise\"><i></i><span></span></div>";
            var cimgBoxData = [];
            for (var childNum = 0; childNum < childData.length; childNum++) {
                var cisValid = childData[childNum].reviewStatus;
                cimgSrcBox["imgIte" + childNum] = [];
                cimgBoxData[childNum] = {};
                cimgBoxData[childNum].imgData = [];
                for (var cattachNum = 0; cattachNum < childData[childNum].attachment_list.length; cattachNum++) {
                    cimgBoxData[childNum].imgData[cattachNum] = {};
                    cimgBoxData[childNum].imgData[cattachNum].time = childData[childNum].attachment_list[cattachNum].attachment.uploadTime;
                    cimgBoxData[childNum].imgData[cattachNum].name = "";
                    cimgBoxData[childNum].imgData[cattachNum].src = childData[childNum].attachment_list[cattachNum].attachment.reviewAttUrl;
                    cimgSrcBox["imgIte" + childNum][cattachNum] = childData[childNum].attachment_list[cattachNum].attachment.reviewAttUrl;
                }
                var cinnerImgSrc = "";
                var cimgBoxLen = cimgSrcBox["imgIte" + childNum].length;
                if(childData[childNum].reviewContent!="该条评论已被作者删除") {
                    switch (cimgSrcBox["imgIte" + childNum].length) {
                        case 0:

                            break;
                        case 1:
                            cinnerImgSrc = "<section class=\"yd-timelineImgBox\"     data-discussid=\'"+childData[childNum].id+"\'  data-imgData=\'" + JSON.stringify(cimgBoxData[childNum].imgData) + "\'>" +
                                "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][0] + "\" alt=\"\"></figure>" +
                                "</section>";
                            break;
                        case 2:
                            cinnerImgSrc = "<section class=\"yd-timelineImgBox\"    data-discussid=\'"+childData[childNum].id+"\'   data-imgData=\'" + JSON.stringify(cimgBoxData[childNum].imgData) + "\'>" +
                                "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][0] + "\" alt=\"\"></figure>" +
                                "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][1] + "\" alt=\"\"></figure>" +
                                "</section>";
                            break;
                        case 3:
                            cinnerImgSrc = "<section class=\"yd-timelineImgBox\"    data-discussid=\'"+childData[childNum].id+"\'   data-imgData=\'" + JSON.stringify(cimgBoxData[childNum].imgData) + "\'>" +
                                "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][0] + "\" alt=\"\"></figure>" +
                                "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][1] + "\" alt=\"\"></figure>" +
                                "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][2] + "\" alt=\"\"></figure>" +
                                "</section>";
                            break;
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                            var cresetImg = cimgBoxLen - 3;
                            cinnerImgSrc = "<section class=\"yd-timelineImgBox\"    data-discussid=\'"+childData[childNum].id+"\'  data-imgData=\'" + JSON.stringify(cimgBoxData[childNum].imgData) + "\'>" +
                                "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][0] + "\" alt=\"\"></figure>" +
                                "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][1] + "\" alt=\"\"></figure>" +
                                "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][2] + "\" alt=\"\"><figure class=\"yd-moreImgMask\"><p>还有<span>" + cresetImg + "</span>张<i class=\"icon-detailsArrow\"></i></p></figure></figure>" +
                                "</section>";
                            break;
                        default:
                            break;
                    }
                }
                if (childData[childNum].id) {
                    if (checkStr(childData[childNum].id)) {
                        cdiscussId = childData[childNum].id;
                    }
                }
                if (childData[childNum].createTime) {
                    if (checkStr(childData[childNum].createTime)) {
                        cduringTime = comm.date.diffDay_one(childData[childNum].createTime, comm.date.local_time());
                        ctimeStr = "<p class=\"yd-timelineTime\">" + cduringTime + "</p>";
                    }
                }
                //头像数据有问题
                var cdefaultLogUrl = "//www.yi-ding.net.cn/image/authority/login/normalImg.png";
                if (childData[childNum].customerLogoUrl) {
                    if (checkStr(childData[childNum].customerLogoUrl)) {
                        clogSrc = childData[childNum].customerLogoUrl;
                        clogStr = "<a href=\"javascript:void(0)\"><img src=\"" + clogSrc + "\" alt=\"\"></a>";
                    } else {
                        logStr = "<a href=\"javascript:void(0)\"><img src=\"" + cdefaultLogUrl + "\" alt=\"\"></a>";
                    }
                } else {
                    clogStr = "<a href=\"javascript:void(0)\"><img src=\"" + cdefaultLogUrl + "\" alt=\"\"></a>";
                }

                if (childData[childNum].customerId) {
                    if (checkStr(childData[childNum].customerId)) {
                        ccusId = childData[childNum].customerId;
                    }
                }
                if (childData[childNum].reviewContent) {
                    if (checkStr(childData[childNum].reviewContent)) {
                        var cparentName = childData[childNum].parentCustomerName;
                        creviewContent = childData[childNum].reviewContent;
                        creviewStr = "<article class=\"yd-timelineContentText\"><a href=\"javascript:void(0)\">回复给" + cparentName + "：</a>" + creviewContent + "</article>";
                    } else {

                    }
                }
                /*var crecommendStr = "<div class=\"aswer\" data-discussid=\'"+childData[childNum].parentId+"\' data-refBelongId=\'"+childData[childNum].refBelongId+"\'><i></i><span></span></div>";
                 if (childData[childNum].reviewNum) {
                 if (checkStr(childData[childNum].reviewNum)) {
                 crecommendNum = childData[childNum].reviewNum;
                 if (crecommendNum == "0") {
                 crecommendNum = "回复";
                 }
                 crecommendStr = "<div class=\"aswer\"  data-discussid=\'"+childData[childNum].parentId+"\' data-refBelongId=\'"+childData[childNum].refBelongId+"\'><i></i><span>" + crecommendNum + "</span></div>";
                 } else {

                 }
                 }*/
                if (childData[childNum].customerName) {
                    if (checkStr(childData[childNum].customerName)) {
                        ccustomerName = childData[childNum].customerName;
                        if(childData[childNum].customerState==2||childData[childNum].customerState==1){
                            cnameStr = "<a href=\"javascript:void(0)\">" + ccustomerName + "<i class=\"yd-vipUser\"></i></a>";
                        }else {
                            cnameStr = "<a href=\"javascript:void(0)\">" + ccustomerName + "<i></i></a>";
                        }
                    } else {
                        cnameStr = "<a href=\"javascript:void(0)\" class=' lucency'>" + "暂未认证" + "<i></i></a>";
                    }
                } else {
                    cnameStr = "<a href=\"javascript:void(0)\" class=' lucency'>" + "暂未认证" + "<i></i></a>";
                }
                var ccustomerCompany = "";
                if (childData[childNum].customerCompany) {
                    if (checkStr(childData[childNum].customerCompany)) {
                        ccustomerCompany = childData[childNum].customerCompany;
                        ccustomerCompanyStr = "<span>" + ccustomerCompany + "</span>";
                    } else {
                        ccustomerCompanyStr = "<span  class='lucency'>" + "暂未认证" + "</span>";
                    }
                } else {
                    ccustomerCompanyStr = "<span  class='lucency'>" + "暂未认证" + "</span>";
                }
                /*if (childData[childNum].upNum) {
                 if (checkStr(childData[childNum].upNum)) {
                 cupNum = childData[childNum].upNum;
                 if (cupNum == "0") {
                 cupNum = "点赞";
                 }
                 if(childData[childNum].isPrefer=='0'){
                 cupNumStr = "<div class=\"praise\"   data-discussid=\'"+discussId+"\'><i></i><span>"+cupNum+"</span></div>";
                 }else {
                 if(cupNum=="点赞"){
                 cupNum=1;
                 }
                 cupNumStr = "<div class=\"praise\"   data-discussid=\'"+discussId+"\'><i class='selected'  data-praiseid=\'"+childData[disNum].preferId+"\'></i><span>"+cupNum+"</span></div>";
                 }
                 } else {

                 }
                 }*/
                crecoStr += "<section class=\"yd-timelineContentItemBox\"><i class=\"yd-timeline\"></i><article class=\"yd-timelineContentItem\"><figure class=\"yd-timelineUserImg\">" + clogStr + "</figure><article class=\"yd-timelineContentTextBox\"><header class=\"yd-timelineContentAuthor\">" + cnameStr + ccustomerCompanyStr + ctimeStr + "</header>" + creviewStr + cinnerImgSrc+"</article>" + "</article>" + "</section>";
            }
        }
        var discussStr = "<section class=\"exercise-discuss\">" + "<header class=\"al-commentDetailsTitle ev-title\">讨论<i class=\"al-commentDetailsClose ev-close\"></i></header>" + "<section class=\"yd-timelineContent courseTopBg\">"+courseTitleStr + "<header class=\"yd-timelineTitle\"><h2>" + titleName + "</h2></header>" + recoStr + "<footer class=\"yd-timelineFooter\"><div class=\"clear\"><div class=\"disscussFunction clear\">"+recommendStr+upNumStr+"</div></div></footer>" + "</section>" + "<section class=\"yd-timelineContent al-replayComment\">" + crecoStr + "</section>" +  "</section>";
    }
    outContainer.html(discussStr);
    var outContainerId=outContainer.find('.aswer').attr('data-discussid');
    awserPaier();
    // console.log(outContainerId)
    // var index=exerciseCommon.indexDiscuss;
    // exerciseCommon.praiseAswer(index,2,outContainerId);
    // console.log(outContainer)
    callBack&&callBack();
    $(".al-commentDetailsClose").unbind("click").bind("click",function(){
        outContainer.remove();
        $('body').removeClass('yd_overflow');
    });
};
function public(option) {
    $(".discussPublish").remove();
    var discussStr = "<div class=\"discussPublish pcModule\" data-discussid=\"" + option.parentid + "\" style=\'display: block\'>" +
        "<textarea placeholder=\"请输入你想说的话\"></textarea>" +
        "<div class=\"uploadImg\" style=\"display: none;\">" +
        "<ul class=\"uploadImgContainer\"></ul>" +
        "<div class=\"imgNum\">还能添加9张图片</div>" +
        "</div>" +
        "<div class=\"discussPublishImg\">" +
        "<form class=\"uploadIcon uploadPic\"" +
        " method=\"POST\" " +
        "enctype=\"multipart/form-data\">图片" +
        "<input type=\"file\" " +
        "class=\"postPicButton\" " +
        "name=\"file\" style=\"font-size: 12px;" +
        " cursor: pointer; position: absolute;" +
        " left: 0px; opacity: 0; outline: none; " +
        "width: 50px; height: 30px;\">" +
        "</form>" +
        "<div class=\"uploadBut\">" +
        "<button class=\"al-commentCancel evReviewBoxCancel\">取消</button>" +
        "<button class=\"al-commentCommit evReviewBoxSubmit fb_but\"" +
        " >发表</button>" +
        "</div>" +
        "</div>" +
        "</div>";
    switch (option.position){
        case "before":
            option.container.before(discussStr);
            break;
        case "after":
            option.container.after(discussStr);
            break;
        case "append":
            option.container.append(discussStr);
            break;
        case "inner":
            option.container.html(discussStr);
            break;
        default:
            break;
    }

    var obj = option.container.parent().find(".discussPublish");
    var postPicBtn = obj.find(".postPicButton");
    var imgConatiner = obj.find(".uploadImgContainer");
    var imgSide = obj.find(".uploadImg");
    var imgNumLis = obj.find(".imgNum");
    var contentInput = obj.find("textarea");
    var contentStr = "";
    contentInput.unbind("input propertychange").bind("input propertychange", function () {
        if ($(this).val().length > 0) {
            contentStr = $(this).val();
        }
    });
    imgSide.hide();
    /*实现图片本地预览*/
    postPicBtn.unbind("change").bind("change", function () {
        //$(this).attr({"disabled":false});
        $(".discussPublishImg").click(function(){
            return false;
        });
        var isThisChange = $(this);
        var postData = {
            "imageType": "5"
        };
        var isThis = this;
        var checkLen = imgConatiner.find("li").length;
        if (checkLen < 9) {
            obj.find(".uploadNow").removeClass('uploadNow');
            if(!comm.browser.msie){
                imgConatiner.append("<li class=\"uploadNow\" data-imgid=\'\'><div class='postImgloadingBg'></div><div class='postImgloading'></div><img src=\"\"><button class=\"delePostImg\"></button> </li>");
                var nowImgObj = obj.find(".uploadNow img");
                var imgType = ["bmp", "gif", "png", "jpg","jpeg"];
                if (isThis.value) {
                    if (!RegExp("\.(" + imgType.join("|") + ")$", "i").test(isThis.value.toLowerCase())) {
                        //alert("图片类型必须是" + imgType.join("，") + "中的一种");
                        popup({
                            // "hasImg":false,
                            "text": "图片限于bmp,png,gif,jpg,jpeg格式"
                        });
                        var uploadImgContainer=$('.uploadImgContainer li');
                        for(var i=0;i<uploadImgContainer.length;i++){
                            if(uploadImgContainer.eq(i).attr('data-imgid')==''){
                                uploadImgContainer.eq(i).remove();
                            }
                        }
                        isThis.value = "";
                    }else {
                        var browser=commLog.getBrowserInfo();
                        var verinfoNum='';
                        var verinfo=''
                        if(browser){
                            verinfoNum = (browser + "").replace(/[^0-9.]/ig, "");
                            verinfo = (browser + "").replace(/[^a-zA-Z]/ig, "")+','+verinfoNum;
                        }
                        if(verinfo=='msie,8.0'){
                            if (!comm.browser.msie) {//判断ie
                                if ($.browser.version < 7) {
                                    nowImgObj.attr('src', isThis.files.item(0).getAsDataURL());
                                }
                                else {
                                    oFReader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                                    oFReader.onload = function (oFREvent) {
                                        nowImgObj.attr({"src": oFREvent.target.result})
                                    };
                                    var oFile = isThis.files[0];
                                    oFReader.readAsDataURL(oFile);
                                }

                                obj.find(".uploadNow").removeClass('uploadNow').attr({"data-status": "success"});
                                var nowLen = parseInt(9 - imgConatiner.find("li").length);
                                var nowStr = "还能添加" + nowLen + "张图片";
                                imgNumLis.html(nowStr);
                                obj.attr({"data-attach": "1"});
                                imgSide.show();
                                obj.find(".delePostImg").each(function () {
                                    $(this).unbind("click").bind("click", function () {
                                        var _this=$(this);
                                        comm.confirmBox({
                                            "title": "确认删除已添加的图片吗？",
                                            "cancel": "取消",
                                            "ensure": "删除图片",
                                            "ensureCallback": function () {
                                                _this.parent().remove();
                                                var residueLen = imgConatiner.find("li").length;
                                                var nowNum = parseInt(9 - residueLen);
                                                var nowStr = "还能添加" + nowNum + "张图片";
                                                imgNumLis.html(nowStr);
                                                obj.attr({"data-attach": "1"});
                                                if (residueLen == 0) {
                                                    imgSide.hide();
                                                    obj.attr({"data-attach": "0"});
                                                    postPicBtn.val("");
                                                }
                                            },
                                            "cancelCallback": function () {
                                                $(".yd-confirmModalMask").remove();
                                            }
                                        });
                                    });
                                });
                            }
                        }else {
                            var fileSize = (isThis.files[0].size)/1048576;
                            if(fileSize>5){
                                popup({
                                    // "hasImg":false,
                                    "text": "图片不能大于5MB"
                                });
                                var uploadImgContainer=$('.uploadImgContainer li');
                                for(var i=0;i<uploadImgContainer.length;i++){
                                    if(uploadImgContainer.eq(i).attr('data-imgid')==''){
                                        uploadImgContainer.eq(i).remove();
                                    }
                                }
                                isThis.value = "";

                            }else {
                                if (!comm.browser.msie) {//判断ie
                                    if ($.browser.version < 7) {
                                        nowImgObj.attr('src', isThis.files.item(0).getAsDataURL());
                                    }
                                    else {
                                        oFReader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                                        oFReader.onload = function (oFREvent) {
                                            nowImgObj.attr({"src": oFREvent.target.result})
                                        };
                                        var oFile = isThis.files[0];
                                        oFReader.readAsDataURL(oFile);
                                    }

                                    obj.find(".uploadNow").removeClass('uploadNow').attr({"data-status": "success"});
                                    var nowLen = parseInt(9 - imgConatiner.find("li").length);
                                    var nowStr = "还能添加" + nowLen + "张图片";
                                    imgNumLis.html(nowStr);
                                    obj.attr({"data-attach": "1"});
                                    imgSide.show();
                                    obj.find(".delePostImg").each(function () {
                                        $(this).unbind("click").bind("click", function () {
                                            var _this=$(this);
                                            comm.confirmBox({
                                                "title": "确认删除已添加的图片吗？",
                                                "cancel": "取消",
                                                "ensure": "删除图片",
                                                "ensureCallback": function () {
                                                    _this.parent().remove();
                                                    var residueLen = imgConatiner.find("li").length;
                                                    var nowNum = parseInt(9 - residueLen);
                                                    var nowStr = "还能添加" + nowNum + "张图片";
                                                    imgNumLis.html(nowStr);
                                                    obj.attr({"data-attach": "1"});
                                                    if (residueLen == 0) {
                                                        imgSide.hide();
                                                        obj.attr({"data-attach": "0"});
                                                        postPicBtn.val("");
                                                    }
                                                },
                                                "cancelCallback": function () {
                                                    $(".yd-confirmModalMask").remove();
                                                }
                                            });
                                        });
                                    });
                                }
                            }
                        }
                    }

                }


            }
        }else {
            popup({
                // "hasImg":false,
                "text": "最多添加9张图片"
            });
        }
        postData = {paramJson: $.toJSON(postData)};
        $(this).parent().ajaxSubmit({//ie上传存在问题
            url: "//www.yi-ding.net.cn/call/yiding/upload/attachment/upload/",
            dataType: 'text',
            data: postData,
            type: "POST",
            clearForm: true,
            success: function (data) {
                //isThisChange.removeAttr("disabled");
                $(".postImgloadingBg").remove();
                $(".postImgloading").remove();
                /*if(resultStr.responseObject.responseStatus){*/
                var resultStr = $.parseJSON(data.replace(/<.*?>/ig, ""));
                var imgSrc = resultStr.responseObject.responseMessage.url;
                if(resultStr.responseObject.responsePk!=0){
                    var imgId = resultStr.responseObject.responsePk;
                }
                var checkLen = imgConatiner.find("li").length;
                if (checkLen < 9) {
                    if (comm.browser.msie) {//判断ie
                        obj.find(".uploadNow").removeClass('uploadNow');
                        imgConatiner.append("<li class=\"uploadNow\" data-imgid=\'" + imgId + "\'><img src=\"\"><button class=\"delePostImg\"></button> </li>");
                        var nowImgObj = obj.find(".uploadNow img");
                        nowImgObj.attr({"src": imgSrc});
                        obj.find(".uploadNow").removeClass('uploadNow').attr({"data-status": "success"});
                        var nowLen = parseInt(9 - imgConatiner.find("li").length);
                        var nowStr = "还能添加" + nowLen + "张图片";
                        imgNumLis.html(nowStr);
                        obj.attr({"data-attach": "1"});
                        imgSide.show();
                        obj.find(".delePostImg").each(function () {
                            $(this).unbind("click").bind("click", function () {
                                var _this=$(this);
                                comm.confirmBox({
                                    "title": "确认删除已添加的图片吗？",
                                    "cancel": "取消",
                                    "ensure": "删除图片",
                                    "ensureCallback": function () {
                                        _this.parent().remove();
                                        var residueLen = imgConatiner.find("li").length;
                                        var nowNum = parseInt(9 - residueLen);
                                        var nowStr = "还能添加" + nowNum + "张图片";
                                        imgNumLis.html(nowStr);
                                        obj.attr({"data-attach": "1"});
                                        if (residueLen == 0) {
                                            imgSide.hide();
                                            obj.attr({"data-attach": "0"});
                                            postPicBtn.val("");
                                        }
                                    },
                                    "cancelCallback": function () {
                                        $(".yd-confirmModalMask").remove();
                                    }
                                });
                            });
                        });
                    } else {
                        var lastOne = obj.find(".uploadImgContainer li").length - 1;
                        obj.find(".uploadImgContainer li").eq(lastOne).attr({"data-imgid": imgId})
                    }
                }
                $(".discussPublishImg").off("click");
                /*}*/
            }
        });
    });

    function clearData() {
        obj.find("textarea").val("");
        obj.find(".postPicButton").val("");
        obj.find(".uploadImgContainer").html("");
    }

    obj.find(".al-commentCancel").unbind("click").bind("click", function () {
        comm.confirmBox({
            "title": "确定放弃讨论吗?",
            "cancel": "放弃",
            "ensure": "继续编辑",
            "content": "现在退出已编辑内容将会被删除",
            "ensureCallback": function () {

            },
            "cancelCallback": function () {
                $(".discussPublish").remove();
                if($('.queShiTiDisNothing').length==1){
                    $('.queShiTiDisNothing').show();
                }
            }
        });

    });
    obj.find(".al-commentCommit").unbind("click").bind("click", function () {
        var uploadImgContainer1=$('.uploadImgContainer li');
        for(var i=0;i<uploadImgContainer1.length;i++){
            // console.log(uploadImgContainer1.eq(i).attr('data-imgid'))
            if(uploadImgContainer1.eq(i).attr('data-imgid')==''){
                return;
            }
        }
        var discussText=$(this).parents('.discussPublish').find('textarea').val();
        var uploadImgLength=$(this).parents('.discussPublish').find('.uploadImgContainer li').length;
        // console.log(discussText)
        // console.log(uploadImgLength)
        // console.log(!/[u4e00-u9fa5aa-zA-Z]{2,}/.test(discussText))
        if(discussText==''&&uploadImgLength==0){
            return;
        }
        if(/^[\s]{0,}$/.test(discussText)&&uploadImgLength==0){
            return;
        }
        // console.log(option)
        var refId = option.refId;
        var attachOnOff = parseInt(obj.attr("data-attach"));
        var parentId = option.parentid;
        var postData = {};
        if (attachOnOff == 1) {
            var imgIdList = "";
            obj.find(".uploadImgContainer li").each(function () {
                imgIdList += $(this).attr("data-imgid") + ",";
            });
            imgIdList = imgIdList.substring(0, imgIdList.length - 1);
            var refBelongId=option.refBelongId;
            var type=option.reviewType;
            if(option.isquestion){
                parentId=0;
            }
            postData = {
                "customerId": loginAbout.login.status().userId,
                "isUploadAttachment": attachOnOff,
                "pictureIds": imgIdList,
                "reviewContent": contentStr,
                "parentId": parentId,
                "reviewType": type,
                "refId": refId,
                "refBelongId":refBelongId
            };

        } else {
            attachOnOff = "0";
            var refBelongId=option.refBelongId;
            var type=option.reviewType;
            if(option.isquestion){
                parentId=0;
            }
            postData = {
                "customerId": loginAbout.login.status().userId,
                "isUploadAttachment": attachOnOff,
                "pictureIds": imgIdList,
                "reviewContent": contentStr,
                "parentId": parentId,
                "reviewType": type,
                "refId": refId,
                "refBelongId":refBelongId
            };
        }
        postData = {paramJson: $.toJSON(postData)};
        $.ajax({
            url: "//www.yi-ding.net.cn/call/customer/review/createReview/",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            data: postData,    //参数值
            type: "POST",   //请求方式
            beforeSend: function() {
                //请求前的处理
            },
            success: function(req) {
                //请求成功时处理

                if(req.responseObject.responseStatus){
                    $(".discussPublish").remove();
                    if($('.yd-commentBox').length==1){
                        refreshDisplayContent();
                    }
                    // console.log(option.parentId)
                    // console.log(parentId)
                    refreshDisplayDisline(option);
                }

            },
            complete: function() {
                //请求完成的处理
            },
            error: function() {
                //请求出错处理
            }
        });
        var discussText=$(this).parents('.discussPublish').find('textarea').val();
        var uploadImgLength=$(this).parents('.discussPublish').find('.uploadImgContainer li').length;
        // console.log(discussText)
        // console.log(uploadImgLength)
        if(discussText==''&&uploadImgLength==0){
            $(".discussPublish").remove();
            return;
        }

    });
};
 function contentList(dataArr) {
    return '<section class="yd-commentItem" data-id="' + dataArr.id + '">' +
        '<figure class="yd-commentImg">' +
        '<a href="' + (dataArr.customerId !== localStorage.getItem('userId') ? '//www.yi-ding.net.cn/pages/personal/others_index.html?cId=' + dataArr.customerId : 'javascript:void(0)') + '"><img src="' + dataArr.customerLogoUrl + '" alt=""></a>' +
        '</figure>' +
        '<figcaption class="yd-commentContext">' +
        '<h2><em>' + dataArr.customerName + '</em>' + (parseInt(dataArr.customerState) === 1 || parseInt(dataArr.customerState) === 2 ? '<i class="icon-vip"></i>' : '') + '<span>' + comm.date.diffDay_one(dataArr.createTime.substr(0, 19), comm.date.local_time()) + '</span></h2>' +
        '<p><span class="yd-classMark">' +
        (function (sData) {
            var type = "";
            if (sData.refBelongId.length == 0) {
                switch (parseInt(sData.reviewType)) {
                    case 1:
                        type = "课程" + (parseInt(sData.parentId) === 0 ? "" : "讨论");
                        break;
                    case 2:
                        type = "习题" + (parseInt(sData.parentId) === 0 ? "" : "讨论");
                        break;
                }
            } else {
                return '<span>课程讨论</span>';
            }

            return type;
        })(dataArr) +
        '</span>' +
        (function () {
            //非讨论 资源
            if (dataArr.refBelongId.length!=0){
                if(dataArr.parentId.toString().length>5){
                    return '<a href="javascript:void(0)" class="checkDiscuss" data-discussid="' + dataArr.parentId+ '" data-parentid="' + dataArr.parentId+ '"  data-reviewType="' + dataArr.reviewType+ '" data-refBelongId="' + dataArr.refBelongId+ '" data-refId="' + dataArr.refId+ '">' + comm.htmlToString(dataArr.parentReviewContent) + '</a>'
                }else {
                    if(dataArr.parentId==0){
                        return '<a href="javascript:void(0)" class="checkDiscuss" data-discussid="' + dataArr.parentId+ '" data-parentid="' + dataArr.refBelongId+ '" data-reviewType="' + dataArr.reviewType+ '" data-refBelongId="' + dataArr.refBelongId+ '" data-refId="' + dataArr.refId+ '">' + comm.htmlToString(dataArr.parentReviewContent) + '</a>'
                    }else {
                        return '<a href="javascript:void(0)" class="checkDiscuss" data-discussid="' + dataArr.parentId+ '">' + comm.htmlToString(dataArr.parentReviewContent) + '</a>'
                    }
                }

            }else{
                if (dataArr.parentId == 0) {
                    //课程——API提供templateUrl
                    if (dataArr.reviewType == 1) {
                        return '<a href="//' + dataArr.refUrl + '" target="_blank">' + dataArr.refName + '</a>';
                    }
                    else if (dataArr.reviewType == 2) {
                        return '<a href="//www.yi-ding.net.cn/pages/classes/questions.html?exerciseId=' + dataArr.refId + '" target="_blank">' + dataArr.refName + '</a>';
                    }
                } else if (dataArr.parentId != 0){
                    return '<a href="javascript:void(0)" class="checkDiscuss" data-discussid="' + dataArr.parentId + '">' + comm.htmlToString(dataArr.parentReviewContent) + '</a>'
                }
            }
        })() +
        (dataArr.reviewStatus == 1 ? '<em class="yd-commentDelete">删除评论</em></p>' : '') +
        (function () {
            var result = "";
            switch (parseInt(dataArr.reviewStatus)) {
                case 1:

                        result = '<article>' +
                            '<a class="checkDiscuss" href="javascript:void(0)" data-discussid="' + dataArr.id + '">' + comm.htmlToString(dataArr.reviewContent) + '</a>' +
                            '</article>';
                    // if(dataArr.parentId==0){
                    //     result = '<article>' +
                    //         '<a class="checkDiscuss" href="javascript:void(0)" data-discussid="' + dataArr.id + '">' + dataArr.reviewContent + '</a>' +
                    //         '</article>';
                    // }else if(dataArr.parentId!=0){
                    //     result = '<article>' +
                    //         '<a class="checkDiscuss" href="javascript:void(0)" data-discussid="' + dataArr.parentId + '">' + dataArr.reviewContent + '</a>' +
                    //         '</article>';
                    // }
                    break;
                case 2:
                    result = '<article class="yd-contentDeleted">' +
                        '<ahref="javascript:void(0)">' + comm.htmlToString(dataArr.reviewContent) + '</a>' +
                        '</article>';
                    break;
                case 3:
                    result = '<article class="yd-contentDeleted">' +
                        '<ahref="javascript:void(0)">' + comm.htmlToString(dataArr.reviewContent) + '</a>' +
                        '</article>';
                    break;
                case 4:
                    result = '<article>' +
                        '<a class="checkDiscuss" href="javascript:void(0)" data-discussid="' + dataArr.id + '">' + comm.htmlToString(dataArr.reviewContent) + '</a>' +
                        '</article>';
                    break;
            }
            return result;
        })() +

        '</figcaption>' +
        '</section>';
}
function refreshDisplayMessage() {
    var that = this;
    var data = {};
    $.ajax({
        url: "//www.yi-ding.net.cn/call/yiding/customer/message/getMapReviewList/",
        type: 'get',
        dataType: 'json',
        data: {
            paramJson: $.toJSON({
                customerId: localStorage.getItem("userId"),
                pageSize: 10,
                pageIndex: 1
            })
        },
    })
        .done(function (data) {
            // console.log("success");
            $('.contentInner').html('');
            if (!$.isEmptyObject(data.responseObject.responseData)) {
                var dataList = data.responseObject.responseData.data_list;
                $(dataList).each(function (index, el) {
                    $(".yd-msgListPart").append(messageListTemplate(el));
                });
                mComm.selectDelete();
                mComm.tipsReaded();
            } else {
                $(".yd-noContentTips").show();
            }
        })
        .fail(function () {
            // console.log("error");
        });
}
 function messageListTemplate(dataArr) {
    return '<section class="yd-msgListItem" data-id="' + dataArr.id + '">' +
        '<header class="yd-msgListTitle">' +
        '<figure class="yd-msgListHeadImg">' +
        '<a href="'+(dataArr.customerId!==localStorage.getItem('userId')?'//www.yi-ding.net.cn/pages/personal/others_index.html?cId='+ dataArr.customerId:'javascript:void(0)')+'" target="_blank">' +
        '<img src="' + dataArr.customerLogoUrl + '" alt="">' +
        (dataArr.isRead == 0 ? '<i class="newTips"></i>' : '' ) +
        '</a>' +
        '</figure>' +
        '<article class="yd-msgListTitleContent">' +
        '<a href="//www.yi-ding.net.cn/pages/personal/others_index.html?cId=' + dataArr.customerId + '">' + dataArr.customerName + (dataArr.customerState == 1||dataArr.customerState == 2 ? '<i class="icon-vip"></i>' : '') + '</a>' +
        '<span class="yd-msgListTime">' + comm.date.diffDay_one(dataArr.createTime.substr(0, 19), comm.date.local_time()) + '</span>' +
        '</article>' +
        '</header>' +
        '<article class="yd-msgListClass">' +
        (function (sData) {
            switch (parseInt(sData.itemType)) {
                case 1:
                    return '<span>课程讨论</span>';
                    break;
                case 2:
                    return '<span>习题讨论</span>';
                    break;
            }
        })(dataArr) +
        '<p class="checkDiscuss" data-discussid="' + dataArr.itemReviewId + '">' + (dataArr.reviewId.length == 0 ? dataArr.itemContent : dataArr.itemReviewContent) + '</p>' +
        '</article>' +
        '<article class="yd-msgListItemContent">' +
        (function () {
            //评论的是资源
            if (dataArr.reviewId.length === 0) {
                return '<a href="' + dataArr.itemUrl + '" >' + dataArr.reviewContent + '</a>';
                //评论的是评论
            } else {
                return '<a href="javascript:void(0)" class="checkDiscuss" data-discussid="' + dataArr.reviewId + '">' + (dataArr.reviewContent?(dataArr.reviewContent.length > 200 ? dataArr.reviewContent.substring(0, 130) + '...' : dataArr.reviewContent):'') + '</a>';
            }
        })() +
        '</article>' +
        '</section>';
}
function refreshDisplayContent() {
    var that = this;
    var data = {
        visitSiteId: 13,
        logoUseFlag: 3,
        customerId: localStorage.getItem('userId'),
        scene: 1,
        reviewStatus: 1,
        pageIndex: 1,
        pageSize: 20
    };
    function scroll() {
        var wNum = 2;

        var data = {
            visitSiteId: 13,
            logoUseFlag: 3,
            customerId: localStorage.getItem('userId'),
            reviewStatus: 1,
            scene: 1,
            pageIndex: wNum,
            pageSize: 20
        };
        $('.yd-commentBox').off("scroll").scrollPagination({
            'contentPage': "//www.yi-ding.net.cn/call/customer/review/json_list/",
            'contentData': $.extend(data, {
                pageIndex: function () {
                    return wNum++;
                },
            }),
            'scrollTarget': $(window),
            'heightOffset': 0,
            'delaytime': 1000,
            'type': "get",
            'beforeLoad': function () {
                comm.loading.show();
            },
            'afterLoad': function () {
                comm.loading.hide();
            },
            'loader': function (res) {
                if ($.isEmptyObject(res)) {
                    $(".yd-commentBox").attr('scrollPagination', 'disabled');
                    return false;
                } else {

                    if ($.isEmptyObject(res.responseObject.responseData) || (res.responseObject.responseData.data_list && res.responseObject.responseData.data_list.length === 0)) {

                        $(".yd-commentBox").attr('scrollPagination', 'disabled');
                        return false;
                    } else {
                        $(res.responseObject.responseData.data_list).each(function (index, ele) {
                            $('.yd-commentBox').append(contentList(ele));
                        });
                    }
                }

            }
        });
    }
    $.ajax({
        url: "//www.yi-ding.net.cn/call/customer/review/json_list/",
        type: 'POST',
        dataType: 'json',
        data: {
            paramJson: $.toJSON(data)
        },
        timeout: 10000,
        beforeSend: function () {
            comm.loading.show();
        }
    })
        .done(function (data) {
            // console.log("success");
            $('.yd-commentBox').html('');
            if (!$.isEmptyObject(data.responseObject.responseData)) {
                var dataList = data.responseObject.responseData.data_list;
                if (dataList.length !== 0) {
                    $(dataList).each(function (index, el) {
                        $('.yd-commentBox').append(contentList(el));

                        $(".yd-commentBox").off("click").on("click",".checkDiscuss", function () {

                            var discussId = $(this).attr('data-discussid');
                            var reviewType = $(this).attr('data-reviewType');
                            var refBelongId = $(this).attr('data-refBelongId');
                            var refId = $(this).attr('data-refId');
                            var postData={};
                            var url='';
                            if(discussId==0){
                                postData = {
                                    "visitSiteId": 13,
                                    "scene": '0',
                                    "logoUseFlag": "3",
                                    "customerId": localStorage.getItem('userId'),
                                    "refId": refId,
                                    refBelongId:refBelongId
                                };
                                url="//www.yi-ding.net.cn/call/customer/review/json_list/"
                            }else {
                                postData = {
                                    "reviewId": discussId,
                                    "sortType": "7",
                                    "scene": '4',
                                    "logoUseFlag": "2",
                                    "pageIndex": "1",
                                    "pageSize": "10",
                                    refBelongId:''
                                };
                                url="//www.yi-ding.net.cn/call/customer/review/json_list/"
                            }
                            $('body').addClass('yd_overflow');
                            comm.maskBackground.show("rgba(0,0,0,.6)");
                            var discussStr = "";
                            postData = {"paramJson": $.toJSON(postData)};
                            $.ajax({
                                url: url,    //请求的url地址
                                dataType: "json",   //返回格式为json
                                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                                data: postData,    //参数值
                                type: "GET",   //请求方式
                                beforeSend: function () {
                                    //请求前的处理
                                    comm.loading.show();
                                },
                                success: function (req) {
                                    //请求成功时处理

                                    if (req.responseObject.responseStatus) {
                                        comm.loading.hide();
                                        /* showReview(req, "discuss");*/
                                        disscussLine(req);
                                        $(".yd-timelineContent .yd-timelineContentItemBox").eq($(".yd-timelineContent .yd-timelineContentItemBox").length - 1).addClass('last')
                                        $(".yd-timelineContent .yd-timelineContentItemBox").eq(0).addClass('first')
                                    }

                                },
                                complete: function () {
                                    //请求完成的处理
                                },
                                error: function () {
                                    //请求出错处理
                                }
                            });

                        })
                    });
                    $(window).scrollTop(0);
                    scroll();
                    comm.loading.hide();

                }
            } else {
                $(".yd-noContentTips").show();
            }
            comm.loading.hide();

            $(".yd-commentDelete").off().on("click", function () {
                deleteComment($(this).parents(".yd-commentItem").attr("data-id"));
            });
        })
        .fail(function () {
            // console.log("XHR Error...");
            comm.loading.hide();

        });
}
 function deleteComment(id) {
    $.ajax({
        url: "//www.yi-ding.net.cn/call/customer/review/delete/",
        type: 'POST',
        dataType: 'json',
        data: {
            paramJson: $.toJSON({
                id: id
            })
        },
        timeout: 10000,
        beforeSend: function () {
            comm.loading.show();
        }
    })
        .done(function (data) {
            // console.log("success");
            if (data.responseObject.responseStatus) {
                popup({
                    text: "删除成功！"
                })
                $(".yd-commentItem[data-id='" + id + "']").remove();
            } else {
                popup({
                    text: "删除失败..."
                })
            }
            comm.loading.hide();
        })
        .fail(function () {
            // console.log("error");
        });

}
function refreshDisplayDisline(ID) {
    var discussId=ID.parentid;
    // console.log(ID)
    var postData={};
    var url='';
    if(ID.isquestion){
        postData = {
            "visitSiteId": 13,
            "scene": '0',
            "logoUseFlag": "3",
            "customerId": localStorage.getItem('userId'),
            "refId": ID.refId,
            refBelongId:ID.refBelongId
        };
        url="//www.yi-ding.net.cn/call/customer/review/json_list/"
    }else {
        postData = {
            "reviewId":discussId,
            "sortType": "7",
            "scene": "4",
            "logoUseFlag": "2",
            "pageIndex": "1",
            "pageSize": "10",
            refBelongId:''
        };
        url="//www.yi-ding.net.cn/call/customer/review/json_list/"
    }

    postData = {"paramJson": $.toJSON(postData)};
    $.ajax({
        url: url,    //请求的url地址
        dataType: "json",   //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: postData,    //参数值
        type: "post",   //请求方式
        beforeSend: function () {
            //请求前的处理
            comm.loading.show();
        },
        success: function (req) {
            //请求成功时处理

            if (req.responseObject.responseStatus) {
                comm.loading.hide();
                /* showReview(req, "discuss");*/
                disscussLine(req);
                $(".yd-timelineContent .yd-timelineContentItemBox").eq($(".yd-timelineContent .yd-timelineContentItemBox").length - 1).addClass('last')
                $(".yd-timelineContent .yd-timelineContentItemBox").eq(0).addClass('first')
            }

        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });
}
function picForm(obj,len){
    var postPicBtn = obj.find(".postPicButton");
    var imgConatiner = obj.find(".uploadImgContainer");
    var imgSide = obj.find(".uploadImg");
    var imgNumLis = obj.find(".imgNum");
    imgSide.hide();
    /*实现图片本地预览*/
    postPicBtn.unbind("change").bind("change",function(){
        var postData = {
            "imageType":"5"
        };
        var isThis = this;
        var checkLen = imgConatiner.find("li").length;
        if(checkLen<len){
            obj.find(".uploadNow").removeClass('uploadNow');
            imgConatiner.append("<li class=\"uploadNow\" data-imgid=\'\'><img src=\"\"><button class=\"delePostImg\"></button> </li>");
            var nowImgObj = obj.find(".uploadNow img");
            var  imgType= ["bmp", "gif", "png", "jpg"];
            if (isThis.value) {
                if (!RegExp("\.(" + imgType.join("|") + ")$", "i").test(isThis.value.toLowerCase())) {
                    //alert("图片类型必须是" + imgType.join("，") + "中的一种");
                    isThis.value = "";
                    return false;
                }
                if (!comm.browser.msie) {//判断ie
                    if ($.browser.version < 7) {
                        nowImgObj.attr('src', isThis.files.item(0).getAsDataURL());
                    }
                    else {
                        oFReader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                        oFReader.onload = function(oFREvent){
                            nowImgObj.attr({"src":oFREvent.target.result})
                        };
                        var oFile = isThis.files[0];
                        oFReader.readAsDataURL(oFile);
                    }

                    obj.find(".uploadNow").removeClass('uploadNow').attr({"data-status":"success"});
                    var nowLen = len-imgConatiner.find("li").length;
                    var nowStr = "还能添加"+nowLen+"张图片";
                    imgNumLis.html(nowStr);
                    obj.attr({"data-attach":"1"});
                    imgSide.show();
                    obj.find(".delePostImg").each(function(){
                        $(this).unbind("click").bind("click",function(){
                            $(this).parent().remove();
                            var residueLen = imgConatiner.find("li").length;
                            var nowNum = len-residueLen;
                            var nowStr = "还能添加"+nowNum+"张图片";
                            imgNumLis.html(nowStr);
                            obj.attr({"data-attach":"1"});
                            if(residueLen==0){
                                imgSide.hide();
                                obj.attr({"data-attach":"0"});
                                postPicBtn.val("");
                            }
                        });
                    });
                }

            }
        }
        postData ={paramJson: $.toJSON(postData)};
        $(this).parent().ajaxSubmit({//ie上传存在问题
            url: "//www.yi-ding.net.cn/call/yiding/upload/attachment/upload/",
            dataType: 'text',
            data :postData,
            type: "POST",
            clearForm: true,
            success: function (data) {
                /*if(resultStr.responseObject.responseStatus){*/
                var resultStr = $.parseJSON(data.replace(/<.*?>/ig,""));
                var imgSrc = resultStr.responseObject.responseMessage.url;
                var imgId = resultStr.responseObject.responsePk;
                var checkLen = imgConatiner.find("li").length;
                if(checkLen<len){
                    if (comm.browser.msie) {//判断ie
                        obj.find(".uploadNow").removeClass('uploadNow');
                        imgConatiner.append("<li class=\"uploadNow\" data-imgid=\'"+imgId+"\'><img src=\"\"><button class=\"delePostImg\"></button> </li>");
                        var nowImgObj = obj.find(".uploadNow img");
                        nowImgObj.attr({"src":imgSrc});
                        obj.find(".uploadNow").removeClass('uploadNow').attr({"data-status":"success"});
                        var nowLen = len-imgConatiner.find("li").length;
                        var nowStr = "还能添加"+nowLen+"张图片";
                        imgNumLis.html(nowStr);
                        obj.attr({"data-attach":"1"});
                        imgSide.show();
                        obj.find(".delePostImg").each(function(){
                            $(this).unbind("click").bind("click",function(){
                                $(this).parent().remove();
                                var residueLen = imgConatiner.find("li").length;
                                var nowNum = len-residueLen;
                                var nowStr = "还能添加"+nowNum+"张图片";
                                imgNumLis.html(nowStr);
                                obj.attr({"data-attach":"1"});
                                if(residueLen==0){
                                    imgSide.hide();
                                    obj.attr({"data-attach":"0"});
                                    postPicBtn.val("");
                                }
                            });
                        });
                    }else{
                        var lastOne =  obj.find(".uploadImgContainer li").length-1;
                        // console.log(obj.find(".uploadNow li"))
                        obj.find(".uploadImgContainer li").eq(lastOne).attr({"data-imgid":imgId})
                    }

                }

                /*}*/
            }
        });
    });
}
function publishCriticism(obj){
    // console.log(obj)
    var questionContainer = obj;
    var contentInput = obj.find("textarea");
    var queHeader = $(".courseContHeader");
    picForm(questionContainer,9);
    function clearData(){
        questionContainer.find("textarea").val("");
        questionContainer.find(".postPicButton").val("");
        questionContainer.find(".uploadImgContainer").html("");
    }
    questionContainer.find(".al-commentCancel").unbind("click").bind("click",function(){
        comm.confirmBox({
            "title":"确定放弃讨论吗?",
            "cancel":"取消",
            "ensure":"继续编辑",
            "content":"现在退出已编辑内容将会被删除",
            "ensureCallback":function(){

            },
            "cancelCallback":function(){
                clearData();
                queHeader.show();
                questionContainer.hide();
            }
        });
    });
    var contentStr = "";
    contentInput.unbind("input propertychange").bind("input propertychange",function(){
        if($(this). val().length>0){
            contentStr =$(this).val();
        }
    });
    questionContainer.find(".al-commentCommit").unbind("click").bind("click",function(){
        queHeader.show();
        questionContainer.hide();
        // console.log(obj.attr("data-discussid"))
        var formId = $(this).attr("data-parent");
        var formObj = $("div[data-parent='"+formId+"']");
        var attachOnOff = obj.attr("data-attach");
        var parentId = "0";
        if(obj.attr("data-discussid")){
            parentId = obj.attr("data-discussid");
        }
        var blongeId = "0";
        if(obj.attr("data-discussType")!="2"){
            blongeId = obj.parent().parent().attr("data-thinkid");
        }
        // console.log(blongeId);
        var postData = {};
        if(attachOnOff==1){
            var imgIdList = "";
            obj.find(".uploadImgContainer li").each(function(){
                imgIdList+=$(this).attr("data-imgid")+",";
            });
            imgIdList = imgIdList.substring(0,imgIdList.length-1);
            postData = {
                "customerId":localStorage.getItem("userId"),
                "isUploadAttachment":attachOnOff,
                "pictureIds":imgIdList,
                "reviewContent":contentStr,
                "parentId":parentId,
                "reviewType":"1",
                "refId":course.global.courseId,//习题的id
                "refBelongId":blongeId
            };
        }else{
            postData = {
                "customerId":localStorage.getItem("userId"),
                "isUploadAttachment":attachOnOff,
                "reviewContent":contentStr,
                "parentId":parentId,
                "reviewType":"1",
                "refId":course.global.courseId,//习题的id
                "refBelongId":blongeId
            };
        }
        postData = {paramJson: $.toJSON(postData)};
        $.ajax({
            url: "//www.yi-ding.net.cn/call/customer/review/createReview/",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            data: postData,    //参数值
            type: "POST",   //请求方式
            beforeSend: function() {
                //请求前的处理
            },
            success: function(req) {
                //请求成功时处理

                if(req.responseObject.responseStatus){
                    clearData();
                    /*


                    重新展示讨论*/
                    // course.class.ajax("discuss");
                }

            },
            complete: function() {
                //请求完成的处理
            },
            error: function() {
                //请求出错处理
            }
        });
        queHeader.show();
        questionContainer.hide();
        queHeader.show();
        questionContainer.hide();
    });
}
