/**
 * Created by ALLIN on 2016/11/23.
 */
// var authenticationHtml;
var authentication = {};
$(document).ready(function () {
    authentication = {

        isImg:false,
        iputObj:null,
        customer:null,
        //认证初始化判断认证状态和根据不同的状态进行不同的操作
        init: function(obj) {
            if(localStorage.getItem('unActive')==1||obj.type=='trigger'){
                authentication.keyState();
                if(localStorage.getItem('userId')){
                    authentication.show(obj);
                }
            }
            // authentication.enterCertification(obj);
        },
        //进入认证
        enterCertification:function (obj) {
            authentication.customer = localStorage.getItem('userId');
            authentication.callBack = obj;
            authentication.firstSubmit();
            authentication.secondSubmit();
            authentication.third();
        },
        callBack:{},
        //获取用户的认证状态-1（未认证（包括没有任何基本信息，有基本信息，唯医联合登录缺少基地信息））；0二次提交认证；1认证通过；2运营确认；3（认证拒绝）；4再次认证
        keyState:function () {
            var userApproveInfo='';
            //如果存在用户ID证明已经登录或认证，调取认证信息，如果存在认证信息，就不调用认证信息的接口
            if(localStorage.getItem('userId')){
                if(localStorage.getItem('approveInfo')){
                      userApproveInfo=JSON.parse(localStorage.getItem("approveInfo"));/*.state*/
                }else {
                    var postData = {
                        customerId:localStorage.getItem('userId'),
                        "isValid": "1"
                    };
                    postData = {
                        paramJson: $.toJSON(postData)
                    };
                    $.ajax({
                        url: "//www.yi-ding.net.cn/call/yiding/customer/auth/getMapById/",
                        type: 'GET',
                        dataType: 'json',
                        async: false,
                        data: postData,
                        success: function(req) {
                            if(req.responseObject.responseStatus){
                                localStorage.setItem("approveInfo",JSON.stringify(req.responseObject.responseData.data_list[0].customerAuth));
                                userApproveInfo=JSON.parse(localStorage.getItem("approveInfo"));/*.state*/
                            }else {
                                localStorage.setItem("approveInfo",JSON.stringify({"state":"-1"}));
                                userApproveInfo=JSON.parse(localStorage.getItem("approveInfo"));/*.state*/
                            }
                        },
                        error: function(xhr, type, error) {

                        }
                    });
                }
            }else {
            //    调取登录方法

            }
            return userApproveInfo;
        },
        //进入认证页面
        show:function (obj) {
            var stateType=authentication.keyState().state;
            switch (parseInt(stateType)){
                case -1:
                    if(authentication.keyState().fullName){
                        var baseName = authentication.keyState().baseName;
                        var isBase = (baseName.length>0)?true:false;
                        //有基本信息，但是没有基地信息
                        if(!isBase){
                            //显示基本信息
                            authentication.rejectPage();
                            if(obj){
                                obj.before&&obj.before();
                            }
                            //所有的认证方法
                            authentication.enterCertification(obj);
                        }
                        //有基本信息
                        if(isBase){
                            authentication.rejectPage();
                            if(obj){
                                obj.before&&obj.before();
                            }
                            authentication.enterCertification(obj);
                        }
                    }else {
                        //没有任何信息
                        authentication.rejectPage();
                        if(obj){
                            obj.before&&obj.before();
                        }
                        authentication.enterCertification(obj);
                    }
                    break;
                case 0:
                    comm.alertBox({
                        "title":"很抱歉！我们正在加紧审核您的认证信息，请耐心等待...",
                        "ensure":"好的",
                        "ensureCallback":function(){
                            //后续操作
                            localStorage.setItem("unActive",0);
                            if(localStorage.getItem("allinUrl")){
                                window.location.href=localStorage.getItem("allinUrl");
                                localStorage.removeItem("allinUrl");
                            }else {
                                if(obj.reload){
                                    if(obj.reload){
                                        window.location.reload();
                                    }
                                }
                            }
                        }
                    });
                    return;
                    break;
                case 1:
                    return;
                    break;
                case 2:
                    return;
                    break;
                case 3:
                    //认证拒绝，显示认证信息
                    authentication.rejectPage(true);
                    if(obj){
                        obj.before&&obj.before();
                    }
                    authentication.enterCertification(obj);
                    return false;
                    break;
                case 4:
                    comm.alertBox({
                        "title":"很抱歉！我们正在加紧审核您的认证信息，请耐心等待...",
                        "ensure":"好的",
                        "ensureCallback":function(){
                            //后续操作
                            localStorage.setItem("unActive",0);
                            if(localStorage.getItem("allinUrl")){
                                window.location.href=localStorage.getItem("allinUrl");
                                localStorage.removeItem("allinUrl");
                            }else {
                                    if(obj.reload){
                                        window.location.reload();
                                    }
                            }
                        }
                    });
                    return;
                    break;
                default:
                    break;
            }
        },
        //认证界面
        rejectPage:function (isTure) {
            comm.maskBackground.show("rgba(0,0,0,.6)");
            var container = $(".yd-maskBackground");
            var approveHtml='<section class="authentication-out">'+
                '    <!--验证默认-->'+
                '    <section class="authentication authentication1" style="display: display:none;">'+
                '        <section class="width">'+
                '            <aside class="Jurisdiction">'+
                '                <div class="userNormal"><img src="/image/authority/authentication/renzheng.png"></div>'+
                '                <div class="rz-after">认证后<br>'+
                '                    你将拥有全部课程观看、讨论、下载权限</div>'+
                '                <div class="authNone">暂不认证</div>'+
                '            </aside>'+
                '         <section class="authorityCommon">'+
                '            <header class="title">'+
                '                <div class="authorityTitle">医师认证</div>'+
                '            </header>'+
                '            <aside class="rzInput">'+
                '                <div class="titleInput clear marginTop">'+
                '                    <div class="titleText">姓名</div>'+
                '                    <input class="titleType input-name" placeholder="请输入姓名">'+
                '                </div>'+
                '                <!--专业选中-->'+
                '                <div class="titleInput clear marginTop" style="display: none;">'+
                '                    <div class="titleText">专业</div>'+
                '                    <ul class="checkboxXl input-checkbox">'+
                '                        <!--<li><span style="margin:0;">小儿骨科</span><i class="ev-tagClose" tagid="5">X</i></li>-->'+
                '                    </ul>'+
                '                    <section class="yd-tagSelectorBox hide al-header-pcModule Ev-professionalBox">'+
                '                        <header class="yd-tagSelectorBoxTitle">选择专业领域<span class="yd-tagSelectorBoxCloseBtn">X</span></header>'+
                '                        <section class="yd-tagSelectorItem">'+
                '                            <!--<button>关节</button>-->'+
                '                        </section>'+
                '                        <footer class="yd-tagSelectorBoxFootBtn">'+
                '                            <button class="yd-personalAdviceSubmit Ev-professionalSure">确定</button>'+
                '                            <button class="yd-personalAdviceCancel Ev-professionalCancel">取消</button>'+
                '                        </footer>'+
                '                    </section>'+
                '                </div>'+
                '                <!--专业选中 end-->'+
                '                <!--专业默认-->'+
                '                <div class="titleInput clear marginTop">'+
                '                    <div class="titleText">专业</div>'+
                '                    <input class="titleType" placeholder="请选择专业">'+
                '                </div>'+
                '                <!--专业默认 end-->'+
                '                <!--下拉列表参考 //www.allinmd.cn/pages/personal/customerInfo.html-->'+
                '                <!--职称选中-->'+
                '                <div class="titleInput clear marginTop" style="display: none;">'+
                '                    <div class="titleText title-technical">职称</div>'+
                '                    <div class="technical input-technical"></div>'+
                '                    <section class="al-tagSelectorBox ev-medicalBox" style="display: none;">'+
                '                        <header class="al-tagSelectorBoxTitle">选择职称<span class="al-tagSelectorBoxCloseBtn ev-medCancel">X</span></header>'+
                '                        <section class="al-tagSelectorItem ev-medicalConList al-tagSelectorItem1">'+
                '                            <article class="al-tagSelectorList tagSelectorList1">'+
                '                            </article>'+
                '                            <article class="al-tagSelectorList hide tagSelectorList2" style="display: none;">'+
                '                            </article>'+
                '                            <article class="al-tagSelectorList hide tagSelectorList3" style="display: none;">'+
                '                            </article>'+
                '                        </section>'+
                '                        <footer class="al-tagSelectorBoxFootBtn">'+
                '                            <button class="al-personalAdviceSubmit ev-medSave">确定</button>'+
                '                            <button class="al-personalAdviceCancel ev-medCancel">取消</button>'+
                '                        </footer>'+
                '                    </section>'+
                '                </div>'+
                '                <!--职称选中 end-->'+
                '                <!--职称默认-->'+
                '                <div class="titleInput clear marginTop">'+
                '                    <div class="titleText">职称</div>'+
                '                    <input class="titleType" placeholder="请选择职称">'+
                '                </div>'+
                '                <!--职称默认 end-->'+
                '                <div class="titleInput clear marginTop hospital">'+
                '                    <div class="titleText">就职医院</div>'+
                '                    <input class="titleType input-hospital" placeholder="请输入就职医院">'+
                '                    <ul class="set-down hospitalDown" style="display: none;"></ul>'+
                '                </div>'+
                '                <div class="titleInput clear base">'+
                '                    <div class="titleText">住培基地</div>'+
                '                    <input class="titleType input-base" placeholder="请输入住培基地">'+
                '                    <ul class="set-down baseDown" style="display: none;"></ul>'+
                '                </div>'+
                '            </aside>'+
                '            <!--激活按钮添加 类名 （activation）-->'+
                '            <div class="loginBtn">继续</div>'+
                '        </section>'+
                '    </section>'+
                '    </section>'+
                '    <!--验证默认 END-->'+
                '    <!--认证工作表-->'+
                '    <section class="authentication authentication-Style2" style="display:none ;">'+
                '        <section class="width">'+
                '         <section class="authorityCommon">'+
                '            <header class="title" style="display: none;">'+
                '                <div class="authorityTitle">医师认证</div>'+
                '                <div class="errortipHeader"><span>当前网络环境不佳，上传失败</span></div>'+
                '            </header>'+
                '            <aside class="authenticationStyle">'+
                '                <div class="clear">'+
                '                    <div class="styleTitle">认证类型：</div>'+
                '                    <figure class="selectBorder"><span class="authenticationType"></span>'+
                '                        <ul class="authenticationList"></ul>'+
                '                    </figure>'+
                '                </div>'+
                '                <div class="pitchOn" style="visibility: hidden;">工作证</div>'+
                '                <section class="titleInput clear marginTop authenticationNum1">'+
                '                    <div class="titleText authenticationNum">证件编号</div>'+
                '                    <input class="titleType" placeholder="请输入证件编号（选填）">'+
                '                </section>'+
                '                <div class="uploadPhoto clear">'+
                '                    <div class="leftNormalImg" id="file"><img src="/image/authority/authentication/auth_uploadphoto.png"> <span>上传认证照片</span>'+
                '                        <div class="againPopup" style="display: none;">'+
                '                            <div class="againPopupBg"></div>'+
                '                            <div class="againPopupText">重新上传</div>'+
                '                        </div>'+
                '                        <form class="uploadIcon uploadPic" method="POST" enctype="multipart/form-data">'+
                '                            <input type="file" name="file" class="authenticationFile" multiple="" id="myfile">'+
                '                        </form>'+
                '                    </div>'+
                '                    <div class="rightNormalImg"><img src="/image/authority/authentication/sample_degree.png"> <span>示例</span></div>'+
                '                </div>'+
                '            </aside>'+
                '            <!--激活按钮添加 类名 （activation）-->'+
                '            <div class="loginBtn">提交</div>'+
                '        </section>'+
                '    </section>'+
                '    </section>'+
                '    <!--认证工作表 END-->'+
                '    <!--认证拒绝-->'+
                '    <section class="authentication authentication3" style="display:none ;">'+
                '        <section class="width">'+
                '         <section class="authorityCommon">'+
                '            <header class="refuseTitle">认证拒绝</header>'+
                '            <aside class="refuseText">您提交的认证资料未通过审核，请修改后重新提交</aside>'+
                '            <div class="loginBtn activation">重新认证</div>'+
                '            <div class="authenticationNone">暂不认证</div>'+
                '        </section>'+
                '    </section>'+
                '   </section>'+
                '    <!--认证拒绝 end-->'+
                '</section>';
            container.html(approveHtml);
            $('.authentication1').hide();
            authentication.iputObj=$('.yd-maskBackground .titleInput');
            var userInfor=authentication.keyState();
            if(userInfor.fullName){
                $('.input-name').val(userInfor.fullName);
                $('.input-hospital').val(userInfor.company);
                if(userInfor.baseName){
                    $('.input-base').val(userInfor.baseName);
                    if(isTure){
                        $('.authentication3').show();
                        commLog.createBrowse(23,'医师认证-认证拒绝页',window.location.href)
                    }else {
                        $('.authentication-Style2').show();
                        commLog.createBrowse(15,'医师认证-认证类型页（认证第二步)',window.location.href)
                    }
                }else {
                    $('.authentication1').show();
                    commLog.createBrowse(14,'医师认证-认证基本信息页（认证第一步)',window.location.href)
                }
                function splitStr(str){
                    /*2_关节,5_肩肘外科,*/
                    if(str.length>0){
                        var firstStr = str.split(",");
                        var secondStr = [];
                        for(var strNum = 0;strNum<firstStr.length;strNum++){
                            secondStr[strNum] = {};
                            secondStr[strNum].title = firstStr[strNum].substring(firstStr[strNum].indexOf("_")+1);
                            secondStr[strNum].id = firstStr[strNum].substring(0,firstStr[strNum].indexOf("_"));
                        }
                    }

                    return secondStr;
                }
                var splitMajor = splitStr(userInfor.areasExpertise);
                var userMedicalStr = splitStr(userInfor.medicalTitle);
                var majorStr = "";
                var medicalStr="";
                for(var maNum = 0;maNum<splitMajor.length;maNum++){
                    majorStr+="<li><span style=\"margin:0;\">"+splitMajor[maNum].title+"</span><i class=\"ev-tagClose\" tagid=\""+splitMajor[maNum].id+"\">X</i></li>";
                }
                for(var maNum = 0;maNum<userMedicalStr.length;maNum++){
                    medicalStr+="<li><span style=\"margin:0;\">"+userMedicalStr[maNum].title+"</span><i class=\"ev-tagClose\" tagid=\""+userMedicalStr[maNum].id+"\">X</i></li>";
                }
                $('.input-checkbox').html(majorStr);
                $('.input-technical').html(medicalStr);
                //页面初始化
                $('.yd-maskBackground .titleInput').eq(1).show();
                $('.yd-maskBackground .titleInput').eq(3).show();
                $('.yd-maskBackground .titleInput').eq(2).hide();
                $('.yd-maskBackground .titleInput').eq(4).hide();
            }else {
                $('.authentication1').show();
                commLog.createBrowse(14,'医师认证-认证基本信息页（认证第一步)',window.location.href)
                //页面初始化
                $('.yd-maskBackground .titleInput').eq(1).hide();
                $('.yd-maskBackground .titleInput').eq(3).hide();
            }
        },
        //填写基本信息
        firstSubmit: function() {
            authentication.authenticationInint();
            $('.authNone').off('click').on('click',function () {
                commLog.creatEvent({"id":16,"url":window.location.href,"keyword":"暂不认证"});
                $(".yd-confirmModalMask.yd-alertModalMask").remove();
                comm.confirmBox({
                    "title": "确认放弃认证吗？",
                    'content':"放弃认证，将无法：</br>浏览完整系列课程</br>参与课程问答",
                    "cancel": "放弃",
                    "ensure": "继续认证",
                    "ensureCallback": function () {

                    },
                    "cancelCallback": function () {
                        $(".yd-confirmModalMask").remove();
                        $(".yd-maskBackground").remove();
                        localStorage.setItem("unActive",0);
                        if(localStorage.getItem("allinUrl")){
                            window.location.href=localStorage.getItem("allinUrl");
                            localStorage.removeItem("allinUrl");
                        }else {
                            if(authentication.callBack.reload&&window.location.href.indexOf('course')==-1){
                                location.reload();//刷新页面
                            }
                        }

                    }
                });

            })
            $(".authentication1 .loginBtn").removeClass('activation');
            //姓名
            $('.input-name').click(function() {
                authentication.hideSetDown();
                authentication.medicalTitleBtn();
                authentication.tagSelectorBoxCloseBtn();
            })
            $('.input-name').blur(function() {
                authentication.inputName($(this))
            })
            //专业
            authentication.iputObj.eq(2).click(function() {
                authentication.checkBox();
            });
            authentication.iputObj.eq(2).find('input').on('keyup',function () {
                authentication.checkBox();
            });
            $('.checkboxXl').click(function() {
                authentication.checkBox();
            })
            $('.yd-personalAdviceCancel').click(authentication.tagSelectorBoxCloseBtn);
            $('.yd-personalAdviceSubmit').click(authentication.tagSelectorBoxCloseBtn);
            $('.yd-tagSelectorBoxCloseBtn').click(authentication.tagSelectorBoxCloseBtn);
            //职称
            authentication.iputObj.eq(4).find('input').on('keyup',function () {
                authentication.technical();
            });
            authentication.iputObj.eq(4).click(function() {
                authentication.technical();
            })
            $('.technical').off('click').on('click',function(e) {
                e.stopPropagation();
                e.preventDefault();
                authentication.technical();
            })
            $('.al-personalAdviceSubmit').click(authentication.medicalTitleBtn);
            $('.al-tagSelectorBoxCloseBtn').click(authentication.medicalTitleBtn);
            $('.al-personalAdviceCancel').click(authentication.medicalTitleBtn);
            //联想词
            authentication.inputChange();
            $('.input-hospital').on('mouseout',function () {
                $('.hospitalDown').hide();
            })
            $('.hospitalDown').on('mouseover',function () {
                $('.hospitalDown').show();
            })
            $('.input-base').on('mouseout',function () {
                $('.baseDown').hide();
            })
            $('.baseDown').on('mouseover',function () {
                $('.baseDown').show();
            })
            //点击继续
            authentication.loginBtn();
        },
        //动态获取专业，职称
        authenticationInint:function () {
            var text1 = {
                isValid: '1',
                treeLevels:'1,2',
                platformId:'1',
                firstResult:'0',
                maxResult:'20'
            }
            text1 = {
                paramJson: $.toJSON(text1)
            };
            authentication.ajaxRequest('//www.yi-ding.net.cn/call/comm/data/baseinfo/getTagList/',text1,'GET',function(req) {
                var data = req.responseObject.responseData.data_list;
                for(var i = 0; i < data.length; i++) {
                    var button = $("<button></button>");
                    button.text(data[i].tagName);
                    button.attr('tagid',data[i].id);
                    $('.yd-tagSelectorItem').append(button);
                }
            })
            var text2={
                isValid: '1',
                typeId:'2',
                roleId:'7',
                visitSiteId:'13'
            }
            text2={
                paramJson: $.toJSON(text2)
            }
            authentication.ajaxRequest('//www.yi-ding.net.cn/call/comm/data/baseinfo/getRoleConfigList/', text2,'GET', function(req) {
                var data = req.responseObject.responseData.data_list;
                var dataList1='';
                var dataList2='';
                var dataList3='';
                for(var i = 0; i < data.length; i++) {
                    if(data[i].sortId==1){
                        dataList1+='<span class="ev-medicalLiList" select-status="false" medicalid="'+data[i].refId+'">'+data[i].refValue+'</span>';
                    }else if(data[i].sortId==2){
                        dataList2+='<span class="ev-medicalLiList" select-status="false" medicalid="'+data[i].refId+'">'+data[i].refValue+'</span>';
                    }else if(data[i].sortId==3){
                        dataList3+='<span class="ev-medicalLiList" select-status="false" medicalid="'+data[i].refId+'">'+data[i].refValue+'</span>';
                    }
                }
                dataList1+='<span class="ev-medicalLiList" select-status="false" medicalid="0">其他</span>';
                $('.authentication1 .tagSelectorList1').html(dataList1);
                $('.authentication1 .tagSelectorList2').html(dataList2);
                $('.authentication1 .tagSelectorList3').html(dataList3);
            })
        },
        //姓名表单检测
        inputName:function (contaner) {
            var s=contaner.val();
            if(s.length>0){
                if(/^\s|^\.|^\▪|^\·|\s$|\.$|\▪$|\·$/.test(s)){
                    $('.authentication1 .errortipHeader1').remove()
                    var divStr="<div class='errortipHeader1'><span>请输入正确的名字</span></div>";
                    $('.authentication1').append(divStr);
                    $(".authentication1 .loginBtn").removeClass('activation');
                }else {
                    if(/^[\u4e00-\u9fa5\s\.\▪\·]{1,25}$|^[A-Za-z\s\.\▪\·]{1,50}$|^([A-Za-z\s\.\▪\·]|[\u4e00-\u9fa5\s\.\▪\·]){1,50}$/.test(s)){
                        for(var i=0;i<s.length;i++){
                            if(s[i]==' '&&s[i+1]==' '){
                                $('.authentication1 .errortipHeader1').remove()
                                var divStr="<div class='errortipHeader1'><span>请输入正确的名字</span></div>";
                                $('.authentication1').append(divStr);
                                $(".authentication1 .loginBtn").removeClass('activation');
                                return;
                            }
                        }
                        $('.authentication1 .errortipHeader1').remove()
                        authentication.loginBtnActive();
                    }else {
                        $('.authentication1 .errortipHeader1').remove()
                        var divStr="<div class='errortipHeader1'><span>请输入正确的名字</span></div>";
                        $('.authentication1').append(divStr);
                        $(".authentication1 .loginBtn").removeClass('activation');
                    }
                }
            }else {
                $('.authentication1 .errortipHeader1').remove()
                $(".authentication1 .loginBtn").removeClass('activation');
            }
        },
        //专业选择
        checkBox: function() {
            authentication.hideSetDown();
            authentication.medicalTitleBtn();
            if($('.ev-medicalBox').css('display') == 'none') {
                var newCheckbox=[];
                authentication.iputObj.eq(1).show();
                authentication.iputObj.eq(2).hide();
                var button=$(".al-header-pcModule .yd-tagSelectorItem button");
                button.removeClass('active');
                var professionalLi=$('.input-checkbox li');
                for(var i=0;i<professionalLi.length;i++){
                    for(var j=0;j<button.length;j++){
                        if(button.eq(j).text()==professionalLi.eq(i).find('span').text()){
                            button.eq(j).addClass('active');
                        }
                    }
                }
                $('.al-header-pcModule').show();
                var indexNum=0;
                for(var i=1;i<button.length;i++){
                    if(button.eq(i).hasClass('active')){
                        indexNum++;
                    }
                }
                if(indexNum==button.length-1){
                    button.eq(0).addClass('active');
                }
                button.each(function(){
                    $(this).unbind("click").bind("click",function(){
                        $(this).toggleClass("active");
                        var selectOnOff = $(this).hasClass("active");
                        var chooseAllOnOff = ($(this).attr("tagid")=="1")?true:false;
                        if(selectOnOff){
                            var tagSelectorItemBtn=$(".yd-tagSelectorItem button");
                            if(chooseAllOnOff){
                                tagSelectorItemBtn.addClass('active');
                            }else {
                                var j=0;
                                for(var i=1;i<tagSelectorItemBtn.length;i++){
                                    if(tagSelectorItemBtn.eq(i).hasClass('active')){
                                        j++;
                                    }
                                }
                                if(j==tagSelectorItemBtn.length-1){
                                    tagSelectorItemBtn.eq(0).addClass('active');
                                }
                            }
                        }else{
                            if(chooseAllOnOff){
                                var tagSelectorItemBtn1=$(".yd-tagSelectorItem button");
                                $(".yd-tagSelectorItem button").removeClass('active');
                            }else {
                                var tagSelectorItemBtn1=$(".yd-tagSelectorItem button");
                                tagSelectorItemBtn1.eq(0).removeClass('active');
                            }
                        }

                    })
                });
                $('.al-header-pcModule .yd-personalAdviceCancel').off('click').on('click',function () {
                    commLog.creatEvent({"id":22,"url":window.location.href,"keyword":"专业返回","browseType":"17","browseTypeSourceUrl":window.location.href});
                    $('.al-header-pcModule').hide();
                    $(".al-header-pcModule .yd-tagSelectorItem button").removeClass('active');
                    var professionalLi=$('.input-checkbox li');
                    for(var i=0;i<professionalLi.length;i++){
                        for(var j=0;j<button.length;j++){
                            if(button.eq(j).text()==professionalLi.eq(i).find('span').text()){
                                button.eq(j).addClass('active');
                            }
                        }
                    }
                    authentication. tagSelectorBoxCloseBtn();
                })
                $('.al-header-pcModule .yd-personalAdviceSubmit').off('click').on('click',function () {
                    commLog.creatEvent({"id":23,"url":window.location.href,"keyword":"专业保存","browseType":"17","browseTypeSourceUrl":window.location.href});
                    $('.al-header-pcModule').hide();
                    var pcModuleStr='';
                    $('#professionalName01').val('');
                    for(var i=0;i<button.length;i++){
                        if(button.eq(i).hasClass('active')&&i!=0){
                            var text=button.eq(i).text();
                            var tagId=button.eq(i).attr('tagid');
                            pcModuleStr+="<li><span style=\"margin:0;\">"+text+"</span><i class=\"ev-tagClose\" tagid=\""+tagId+"\">X</i></li>";
                        }
                    }
                    $('.input-checkbox').html(pcModuleStr);
                    $('.input-checkbox li .ev-tagClose').off('click').on('click',function () {
                        $(this).parents('li').remove();
                        var text2= $(this).parents('li').find('span').text();
                        for(var i=0;i<button.length;i++){
                            if(button.eq(i).text()==text2){
                                button.eq(i).removeClass('active');
                            }
                        }
                        button.eq(0).removeClass('active');
                        authentication. tagSelectorBoxCloseBtn();
                    })
                    authentication. tagSelectorBoxCloseBtn();
                })
                $('.al-header-pcModule .yd-tagSelectorBoxCloseBtn').off('click').on('click',function () {
                    commLog.creatEvent({"id":22,"url":window.location.href,"keyword":"专业返回","browseType":"17","browseTypeSourceUrl":window.location.href});
                    $('.al-header-pcModule').hide();
                    $(".al-header-pcModule .yd-tagSelectorItem button").removeClass('active');
                    var professionalLi=$('.input-checkbox li');
                    for(var i=0;i<professionalLi.length;i++){
                        for(var j=0;j<button.length;j++){
                            if(button.eq(j).text()==professionalLi.eq(i).find('span').text()){
                                button.eq(j).addClass('active');
                            }
                        }
                    }
                    authentication. tagSelectorBoxCloseBtn();
                })
            }
        },
        //职称选择
        technical:function () {
            authentication.hideSetDown();
            if($('.al-header-pcModule').css('display') == 'none') {
                authentication.iputObj.eq(3).show();
                authentication.iputObj.eq(4).hide();
                var medicalLiList=$('.al-tagSelectorBox .ev-medicalLiList');
                var medicalLiList1=$('.al-tagSelectorBox .tagSelectorList1 .ev-medicalLiList');
                var medicalLiList2=$('.al-tagSelectorBox .tagSelectorList2 .ev-medicalLiList');
                var medicalLiList3=$('.al-tagSelectorBox .tagSelectorList3 .ev-medicalLiList');
                medicalLiList.removeClass('active');
                var technicalLi=$('.input-technical li span');
                for(var i=0;i<medicalLiList.length;i++){
                    for(var j=0;j<technicalLi.length;j++){
                        if(technicalLi.eq(j).text()==medicalLiList.eq(i).text()){
                            medicalLiList.eq(i).addClass('active');
                        }
                    }
                }
                $('.ev-medicalBox').show();
                medicalLiList1.each(function () {
                    $(this).unbind("click").bind("click", function () {
                        if($(this).text()!='其他'){
                            if($(this).hasClass('active')){
                                $(this).removeClass("active");
                            }else {
                                if($(this).text()=='医学生'||$(this).text()=='住院医师'||$(this).text()=='主治医师'){
                                    medicalLiList.removeClass('active');
                                    $('.al-tagSelectorBox .tagSelectorList2').hide();
                                    $('.al-tagSelectorBox .tagSelectorList3').hide();
                                }else {
                                    medicalLiList1.removeClass('active');
                                    $('.al-tagSelectorBox .tagSelectorList2').show();
                                    $('.al-tagSelectorBox .tagSelectorList3').show();
                                }
                                $(this).addClass("active");
                            }
                        }else {
                            $('.al-tagSelectorBox .tagSelectorList2').show();
                            $('.al-tagSelectorBox .tagSelectorList3').show();
                        }

                    })
                });
                medicalLiList2.each(function () {
                    $(this).unbind("click").bind("click", function () {
                        if($(this).hasClass('active')){
                            $(this).removeClass("active");
                        }else {
                            medicalLiList2.removeClass('active');
                            $(this).addClass("active");
                        }
                    })
                });
                medicalLiList3.each(function () {
                    $(this).unbind("click").bind("click", function () {
                        if($(this).hasClass('active')){
                            $(this).removeClass("active");
                        }else {
                            medicalLiList3.removeClass('active');
                            $(this).addClass("active");
                        }
                    })
                });
                $('.al-tagSelectorBox .al-personalAdviceSubmit').off('click').on('click',function () {
                    commLog.creatEvent({"id":21,"url":window.location.href,"keyword":"职称保存","browseType":"16","browseTypeSourceUrl":window.location.href});
                    $('.ev-medicalBox').hide();
                    var medicalNameStr = '';
                    for (var i = 0; i < medicalLiList.length; i++) {
                        if (medicalLiList.eq(i).hasClass('active')) {
                            medicalNameStr+="<li><span style=\"margin:0;\">"+medicalLiList.eq(i).text()+"</span><i class=\"ev-tagClose\" tagid=\""+medicalLiList.eq(i).attr('medicalid')+"\">X</i></li>";
                        }
                    }
                    $('.input-technical').html(medicalNameStr);
                    authentication.medicalTitleBtn();
                });
                $('.al-tagSelectorBox .al-personalAdviceCancel').off('click').on('click',function () {
                    commLog.creatEvent({"id":20,"url":window.location.href,"keyword":"职称返回","browseType":"16","browseTypeSourceUrl":window.location.href});
                    $('.ev-medicalBox').hide();
                    medicalLiList.removeClass('active');
                    var technicalLi=$('.input-technical li span');
                    for(var i=0;i<medicalLiList.length;i++){
                        for(var j=0;j<technicalLi.length;j++){
                            if(technicalLi.eq(j).text()==medicalLiList.eq(i).text()){
                                medicalLiList.eq(i).addClass('active');
                            }
                        }
                    }
                    authentication.medicalTitleBtn();
                });
                $('.al-tagSelectorBox .al-tagSelectorBoxCloseBtn').off('click').on('click',function () {
                    commLog.creatEvent({"id":20,"url":window.location.href,"keyword":"职称返回","browseType":"16","browseTypeSourceUrl":window.location.href});
                    $('.ev-medicalBox').hide();
                    medicalLiList.removeClass('active');
                    var technicalLi=$('.input-technical li span');
                    for(var i=0;i<medicalLiList.length;i++){
                        for(var j=0;j<technicalLi.length;j++){
                            if(technicalLi.eq(j).text()==medicalLiList.eq(i).text()){
                                medicalLiList.eq(i).addClass('active');
                            }
                        }
                    }
                    authentication.medicalTitleBtn();
                });
                $('.input-technical li .ev-tagClose').off('click').on('click',function () {
                    $(this).parents('li').remove();
                    var text2= $(this).parents('li').find('span').text();
                    for(var i=0;i<medicalLiList.length;i++){
                        if(medicalLiList.eq(i).text()==text2){
                            medicalLiList.eq(i).removeClass('active');
                        }
                    }
                    authentication.medicalTitleBtn();
                });
            }
        },
        //第二步
        secondSubmit: function() {
            authentication.renzheng();
            $('.authentication-Style2 .title').hide();
            $('.pitchOn').css('visibility', 'hidden');
            $('.pitchOn').html('');
            $('.authentication-Style2 .againPopup').hide();
            $('.pitchOn').click(function() {
                $('.authentication-Style2 .selectBorder').show();

            })
            $(".authentication-Style2 .loginBtn").removeClass('activation');
            authentication.imgLoad();
            $('.authenticationNum1 .titleType').unbind("keyup").bind("keyup", function () {
                var s=$(this).val();
                if(s.length>0){
                    if(/^[A-Za-z0-9]{1,50}$/.test(s)){
                        $('.authentication-Style2  .errortipHeader1').remove();
                        var titleText=$('.pitchOn').text();
                        if(authentication.isImg&&titleText!=''){
                            $('.authentication-Style2 .loginBtn').addClass('activation');
                        }
                    }else {
                        $('.authentication-Style2  .errortipHeader1').remove()
                        var divStr="<div class='errortipHeader1'><span>请输入正确的证件编号</span></div>";
                        $('.authentication-Style2  ').append(divStr);
                        $('.authentication-Style2 .loginBtn').removeClass('activation');
                    }
                }else {
                    var titleText=$('.pitchOn').text();
                    if(authentication.isImg&&titleText!=''){
                        $('.authentication-Style2 .loginBtn').addClass('activation');
                    }
                    $('.authentication-Style2  .errortipHeader1').remove()
                }
            })
        },
        //认证拒绝
        third:function (){
            $('.authentication3 .loginBtn').on('click',function () {
                commLog.creatEvent({"id":27,"url":window.location.href,"keyword":"重新认证","browseType":"23","browseTypeSourceUrl":window.location.href});
                $('.authentication3').hide();
                $('.authentication1').show();
                commLog.createBrowse(14,'医师认证-认证基本信息页（认证第一步)',window.location.href)
                authentication.iputObj.eq(1).show();
                authentication.iputObj.eq(3).show();
                authentication.iputObj.eq(2).hide();
                authentication.iputObj.eq(4).hide();
                authentication.loginBtnActive();
            })
            $('.authentication3 .authenticationNone').off('click').on('click',function () {
                comm.confirmBox({
                    "title": "确认放弃认证吗？",
                    'content':"放弃认证，将无法：</br>浏览完整系列课程</br>参与课程问答",
                    "cancel": "放弃",
                    "ensure": "继续认证",
                    "ensureCallback": function () {

                    },
                    "cancelCallback": function () {
                        commLog.creatEvent({"id":16,"url":window.location.href,"keyword":"暂不认证"});
                        $(".yd-confirmModalMask").remove();
                        $(".yd-maskBackground").remove();
                        localStorage.setItem("unActive",0);
                        if(localStorage.getItem("allinUrl")){
                            window.location.href=localStorage.getItem("allinUrl");
                            localStorage.removeItem("allinUrl");
                        }else {
                            if(authentication.callBack.reload&&window.location.href.indexOf('course')==-1){
                                location.reload();//刷新页面
                            }
                        }
                    }
                });

            })
        },
        imgLoad:function () {
            $("#myfile").unbind("change").bind("change", function () {
                // console.log(this.files[0].size)
                var fileText = $(this).val().split('.')[1].toUpperCase();
                if (fileText == "BMP" ||fileText == "PNG" || fileText == "GIF" || fileText == "JPG"|| fileText == "JPEG") {
                    var browser=commLog.getBrowserInfo();
                    var verinfoNum='';
                    var verinfo=''
                    if(browser){
                        verinfoNum = (browser + "").replace(/[^0-9.]/ig, "");
                        verinfo = (browser + "").replace(/[^a-zA-Z]/ig, "")+','+verinfoNum;
                    }
                    if(verinfo=='msie,8.0'){
                        var imgHtml = "<figure class='yd-loading1'>" +
                            "<img src='/image/personal/loading_big@2x.png' alt=''>" +
                            "<p>" + "上传中" + "</p>" +
                            "</figure>";
                        $('.authentication-Style2').css({
                            'position': "relative"
                        })
                        $('.authentication-Style2').append(imgHtml);
                        var titleStyle = $('.authentication-Style2 .titleType').val();
                        var file = $('.authenticationFile').val();
                        var postData = {
                            "imageType": "2",
                            // customerId:'1480388490367',
                            customerId: authentication.customer,
                            "visitSiteId": "13"
                        };
                        postData = {paramJson: $.toJSON(postData)};
                        $(this).parent().ajaxSubmit({
                            url: "//www.yi-ding.net.cn/call/yiding/upload/attachment/upload/",
                            dataType: 'text',
                            data: postData,
                            type: "post",
                            clearForm: true,
                            success: function (data) {
                                authentication.uploadImg(data);
                            },
                            error: function () {
                                $('.yd-loading1').remove();
                                authentication.isImg = false;
                                $('.againPopup').show();
                                $('.authentication-Style2 .loginBtn').removeClass('activation');
                            }
                        });
                    }else {
                        var fileSize = (this.files[0].size)/1048576;
                        if (fileSize < 5 ) {
                            var imgHtml = "<figure class='yd-loading1'>" +
                                "<img src='/image/personal/loading_big@2x.png' alt=''>" +
                                "<p>" + "上传中" + "</p>" +
                                "</figure>";
                            $('.authentication-Style2').css({
                                'position': "relative"
                            })
                            $('.authentication-Style2').append(imgHtml);
                            var titleStyle = $('.authentication-Style2 .titleType').val();
                            var file = $('.authenticationFile').val();
                            var postData = {
                                "imageType": "2",
                                // customerId:'1480388490367',
                                customerId: authentication.customer,
                                "visitSiteId": "13"
                            };
                            postData = {paramJson: $.toJSON(postData)};
                            $(this).parent().ajaxSubmit({
                                url: "//www.yi-ding.net.cn/call/yiding/upload/attachment/upload/",
                                dataType: 'text',
                                data: postData,
                                type: "post",
                                clearForm: true,
                                success: function (data) {
                                    authentication.uploadImg(data);
                                },
                                error: function () {
                                    $('.yd-loading1').remove();
                                    authentication.isImg = false;
                                    $('.againPopup').show();
                                    $('.authentication-Style2 .loginBtn').removeClass('activation');
                                }
                            });
                        } else {
                            popup({
                                // "hasImg":false,
                                "text": "图片不能大于5MB"
                            });
                            // alert("图片不大于50MB。");
                        }
                    }
                } else {
                    popup({
                        // "hasImg":false,
                        "text": "图片限于bmp,png,gif,jpg,jpeg格式"
                    });
                    // alert("图片限于bmp,png,gif,jpg格式");

                }
            })
        },
        uploadImg:function (data){
            $('.yd-loading1').remove();
            popup({
                "hasImg":true,
                "text":"上传成功"
            });
            var resultStr = $.parseJSON(data.replace(/<.*?>/ig,""));
            if(resultStr.responseObject.responseStatus){
                authentication.isImg=true;
                var titleText=$('.pitchOn').text();
                var errorLength2=$('.authentication-Style2 .errortipHeader1').length;
                if(authentication.isImg&&titleText!=''&&errorLength2==0){
                    $('.authentication-Style2 .loginBtn').addClass('activation');
                }
                var imgSrc = resultStr.responseObject.responseMessage.url;
                $(".leftNormalImg>img").attr({"src":imgSrc});
                $('.authenticationFile').attr('filePathAth',resultStr.responseObject.responseMessage.path);
                $('.authentication-Style2 .loginBtn').click(function () {
                    commLog.creatEvent({"id":19,"url":window.location.href,"keyword":"认证第二步提交"});
                    var errorLength2=$('.authentication-Style2 .errortipHeader1').length;
                    var titleList=$('.pitchOn').attr('pitchonid');
                    var titleText=$('.pitchOn').text();
                    var titleStyle=$('.authentication-Style2 .titleType').val();
                    var file=$('.authenticationFile').attr('filepathAth');
                    var jsonTitle={
                        // customerId:'1480388490367',
                        customerId:authentication.customer,
                        attType:titleList,
                        attCode:titleStyle,
                        attPath:file,
                        visitSiteId:'0',
                        opflag:'2'
                    }
                    var postData ={paramJson: $.toJSON(jsonTitle)};
                    if(authentication.isImg&&titleText!=''&&errorLength2==0){
                        var url='//www.yi-ding.net.cn/call/yiding/customer/auth/createAuth/';
                        authentication.ajaxRequest(url,postData,'post',function (data) {
                            authentication.saveSucess(data.responseObject);
                        });
                    }else{
                        $('.authentication-Style2 .loginBtn').removeClass('activation');
                    }
                })
            }else {
                $('.authentication-Style2 .title').show();
                $('.againPopup').show();
            }
        },
        loginBtnActive: function() {
            var name = $('.input-name').val();
            var checkbox = $('.input-checkbox').text();
            var technical = $('.input-technical li').length;
            var hospital = $('.input-hospital').val();
            var base = $('.input-base').val();
            var errorLength=$('.authentication1 .errortipHeader1').length;
            var checkboxLi=$('.input-checkbox li').length;
            if(name != '' && checkboxLi>0 && technical != 0 && hospital != '' && base != ''&&errorLength==0) {
                $('.authentication1 .loginBtn').addClass('activation');
            } else {
                $(".authentication1 .loginBtn").removeClass('activation');
            }
        },
        loginBtn: function() {
            $('.authentication1 .loginBtn').click(function() {
                commLog.creatEvent({"id":17,"url":window.location.href,"keyword":"认证第一步提交"});
                var errorLength=$('.authentication1 .errortipHeader1').length;
                var name = $('.input-name').val();
                var checkbox = $('.input-checkbox').text();
                var technicalHtml='';
                for(var i=0;i<$('.input-checkbox li').length;i++){
                    var tagidText=$('.input-checkbox li i')[i].getAttribute('tagid')+'_'+$('.input-checkbox li span')[i].innerText+',';
                    technicalHtml+=tagidText;
                }
                var technicalHtmlSlice=technicalHtml.slice(0,technicalHtml.length-1);
                var technical = $('.input-technical li').length;
                var technicalText='';
                for(var i=0;i<technical;i++){
                    var meTagid=$('.input-technical li i')[i].getAttribute('tagid')+'_'+$('.input-technical li span')[i].innerText;
                    if(meTagid!='_'){
                        technicalText+=meTagid+',';
                    }
                }
                var technicalTextSlice=technicalText.slice(0,technicalText.length-1);
                var hospital = $('.input-hospital').val();
                var base = $('.input-base').val();
                var checkboxLi=$('.input-checkbox li').length;
                var companyId=$('.input-hospital').attr('tagid')||0;
                var baseId=$('.input-base').attr('tagId')||0;
                var statu=authentication.keyState().state;
                var jsonText = {
                    // customerId: '1480388490367',
                    customerId:authentication.customer,
                    fullName: name,
                    areasExpertise: technicalHtmlSlice,
                    medicalTitle: technicalTextSlice,
                    companyId: companyId,
                    company: hospital,
                    baseId: baseId,
                    baseName: base,
                    state: statu,
                    visitSiteId: '0',
                    opflag: '1'
                }
                localStorage.setItem('keyNext', JSON.stringify(jsonText));
                var postData = {
                    paramJson: $.toJSON(jsonText)
                };
                if(name != '' && checkboxLi>0 && technical != 0 && hospital != '' && base != ''&&errorLength==0) {
                    var url = '//www.yi-ding.net.cn/call/yiding/customer/auth/createAuth/';
                    authentication.ajaxRequest(url, postData,'post', function(data) {
                        authentication.nextSubmit(data.responseObject, postData)
                    })
                } else {
                    $(this).removeClass('activation');
                }
            })
        },
        ajaxRequest: function(url, text,type, callback) {
            $.ajax({
                url: url,
                type: type,
                dataType: 'json',
                data: text,
                success: function(req) {
                    callback(req);

                },
                error: function(xhr, type, error) {
                    // alert(error);
                }
            });
        },
        renzheng: function() {
            var postData = {
                "visitSiteId": "13",
                isValid:'1',
                "roleId": "6"
            };
            postData = {
                paramJson: $.toJSON(postData)
            };
            var strContainer = $(".authenticationList");
            var url="//www.yi-ding.net.cn/call/comm/data/baseinfo/getRoleConfigList/";
            authentication.ajaxRequest(url, postData,'GET', function(req) {
                var data = req.responseObject.responseData.data_list;
                var str = "";
                for(var sNum = 0; sNum < data.length; sNum++) {
                    var name = data[sNum].refValue;
                    str += "<li ydauthenId="+data[sNum].refId+">" + name + "</li>";

                }
                strContainer.html(str);
                authentication.clickInput("renzheng");
            })
        },
        creatCheckboxLi: function(container, title,isCreat) {
            var li = $("<li><span style='margin:0;'></span><i class='ev-tagClose' tagid=''>X</i></li>");
            if(!isCreat){
                li.find('span').text(title);
            }else {
                li.find('span').text(title.split("_")[1]);
                li.find('i').attr('tagid',title.split("_")[0]);
            }
            container.append(li);
            authentication.creatActive();
        },
        hideSetDown: function() {
            $('.baseDown').hide();
            $('.hospitalDown').hide();
        },
        medicalTitleBtn: function() {
            $('.ev-medicalBox').hide();
            if($('.technical').text() == '') {
                authentication.iputObj.eq(4).show();
                authentication.iputObj.eq(4).find('input').val('');
                authentication.iputObj.eq(3).hide();
                $(".authentication1 .loginBtn").removeClass('activation');
            }else {
                authentication.loginBtnActive();
            }
        },
        tagSelectorBoxCloseBtn: function() {
            $('.al-header-pcModule').hide();
            if($('.checkboxXl li').length == 0) {
                authentication.iputObj.eq(2).show();
                authentication.iputObj.eq(2).find('input').val('');
                authentication.iputObj.eq(1).hide();
                $(".authentication1 .loginBtn").removeClass('activation');
            }else {
                authentication.loginBtnActive();
            }
        },
        clickInput: function(type) {
            switch(type) {
                case "base":
                    $(".baseDown li").each(function() {
                        $(this).unbind("click").bind("click", function() {
                            var reStr = $(this).html();
                            if(reStr.length > 0) {
                                $(".baseDown").hide();
                                var inputBase=$('.input-base').attr('tagId',$(this).attr('tagid'));
                                $(this).parent().prev().val(reStr);
                            }
                        })
                    });
                    break;
                case "hospital":
                    $(".hospitalDown li").each(function() {
                        $(this).unbind("click").bind("click", function() {
                            commLog.creatEvent({"id":25,"url":window.location.href,"keyword":"医院选择"});
                            var reStr = $(this).html();
                            if(reStr.length > 0) {
                                $(".hospitalDown").hide();
                                var inputHospital=$('.input-hospital').attr('tagId',$(this).attr('tagid'));
                                $(this).parent().prev().val(reStr);
                            }
                        })
                    });
                    break;
                case "renzheng":
                    $(".authenticationList li").each(function() {
                        $(this).unbind("click").bind("click", function() {
                            var reStr = $(this).html();
                            var pictId=$(this).attr('ydauthenid');
                            if(reStr.length > 0) {
                                $(".authentication-Style2 .selectBorder").hide();
                                var errorLength2=$('.authentication-Style2 .errortipHeader1').length;
                                $(".pitchOn").html(reStr);
                                if(authentication.isImg &&errorLength2==0){
                                    $('.authentication-Style2 .loginBtn').addClass('activation');
                                }
                                $(".pitchOn").attr('pitchOnId',pictId)
                                $('.pitchOn').css('visibility','visible');
                                if($('.pitchOn').text()=='工作证'||$('.pitchOn').text()=='学生证'){
                                    $('.authenticationNum1').hide();
                                    $('.authenticationNum1 input').val('');
                                    $('.authentication-Style2  .errortipHeader1').remove();
                                }else {
                                    $('.authenticationNum1').show();
                                }
                                switch($('.pitchOn').text()){
                                    case "工作证":
                                        $('.rightNormalImg img').attr('src','/image/authority/authentication/sample_employee.png');
                                        break;
                                    case "学生证":
                                        $('.rightNormalImg img').attr('src','/image/authority/authentication/sample_student.png');
                                        break;
                                    case "医师执业证":
                                        $('.rightNormalImg img').attr('src','/image/authority/authentication/sample_Doctor.png');
                                        break;
                                    case "医师资格证":
                                        $('.rightNormalImg img').attr('src','/image/authority/authentication/sample_Doctor.png');
                                        break;
                                    case "医学学位证":
                                        $('.rightNormalImg img').attr('src','/image/authority/authentication/sample_degree.png');
                                        break;
                                    case "医学学历证":
                                        $('.rightNormalImg img').attr('src','/image/authority/authentication/sample_degree.png');
                                        break;
                                    default:
                                        break
                                }
                            }
                        });
                    });
                    break;
                default:
                    break;
            }
        },
        inputChange: function() {
            var searchTool = $('.input-hospital');
            var lenovoContainer = $(".hospitalDown");
            var baseContainer = $(".baseDown");
            var baseTool = $(".input-base");
            searchTool.unbind("keyup").bind("keyup", function() {
                authentication.loginBtnActive();
                var isStr = $(this).val();
                isStr=encodeURI(isStr)
                var postData = {
                    "hospitalName": isStr,
                    isValid:'1',
                    firstResult:'0',
                    maxResult:'10'
                };
                postData = {
                    paramJson: $.toJSON(postData)
                };
                lenovoContainer.show();
                if(isStr.length > 0) {
                    var url="//www.yi-ding.net.cn/call/comm/data/baseinfo/getHospitalList/";
                    authentication.ajaxRequest(url,postData,'GET',function (req) {
                        if(req.responseObject.responseStatus) {
                            var data = req.responseObject.responseData.data_list;
                            if(req.responseObject.responseMessage==''){
                                var lenStr = "";
                                for(var num = 0; num < data.length; num++) {
                                    var name = data[num].hospitalName;
                                    lenStr += "<li tagId='"+data[num].id+"'>" + name + "</li>";
                                }
                                lenovoContainer.html(lenStr);
                                authentication.clickInput("hospital");
                                lenovoContainer.show();
                            }else {
                                lenovoContainer.hide();
                            }
                        }
                    })
                } else {
                    lenovoContainer.hide();
                }
            });
            baseTool.unbind("keyup").bind("keyup", function() {
                authentication.loginBtnActive();
                var isStr = $(this).val();
                isStr=encodeURI(isStr)
                var postData = {
                    "baseName": isStr,
                    isValid:'1',
                    firstResult:'0',
                    maxResult:'10'
                };
                postData = {
                    paramJson: $.toJSON(postData)
                };
                baseContainer.show();
                if(isStr.length > 0) {
                    var url="//www.yi-ding.net.cn/call/comm/data/baseinfo/getBaseList/";
                    authentication.ajaxRequest(url,postData,'GET',function (req) {
                        if(req.responseObject.responseStatus) {
                            var data = req.responseObject.responseData.data_list;
                            if(req.responseObject.responseMessage==''){
                                var lenStr = "";
                                for(var num = 0; num < data.length; num++) {
                                    var name = data[num].baseName;
                                    lenStr += "<li tagId='"+data[num].id+"'>" + name + "</li>";
                                }
                                baseContainer.html(lenStr);
                                authentication.clickInput("base");
                                baseContainer.show();
                            }else {
                                baseContainer.hide();
                            }

                        }
                    })
                } else {
                    baseContainer.hide();
                }
            });
        },
        nextSubmit: function(data, text) {
            if(data.responseStatus) {
                if(data.responseData.registType==1&&data.responseData.state==1){
                    authentication.exit();
                    loginAbout.changeHead();
                    authentication.callBack.success&&authentication.callBack.success();
                }else {
                    $('.authentication1 .loginBtn').addClass('activation');
                    $('.authentication').eq(0).hide();
                    $('.authentication').eq(1).show();
                    commLog.createBrowse(15,'医师认证-认证类型页（认证第二步)',window.location.href)
                }
            } else {
                $('.authentication3').show();
                $(".authentication1").hide();
            }
        },
        saveSucess:function (data,text) {
            if(data.responseStatus){
                if(localStorage.getItem("approveInfo")){
                    var state = authentication.keyState().state;
                    authentication.saveReqState(state);
                }
                authentication.exit();
                loginAbout.changeHead();
                authentication.callBack.success&&authentication.callBack.success();
            };
        },
        saveReqState:function (type) {
            switch(type){
                case "-1":
                    break;
                case "0":
                    break;
                case "1":
                    break;
                case "2":
                    break;
                case "3":
                    comm.alertBox({
                        "mTitle":"",
                        "title":"我们已经收到您的认证资料，审核周期为3-5个工作日，请耐心等待!<br>谢谢您的配合",
                        "ensure":"好的",
                        "ensureCallback":function(){
                            // alert("success");
                        }
                    });




                    break;
                case "4":
                    break;
                default:
                    break;
            }
        },
        exit:function(exitFn){
            $(".yd-maskBackground").remove();
            var postData = {
                customerId:localStorage.getItem('userId'),
                "isValid": "1"
            };
            postData = {
                paramJson: $.toJSON(postData)
            };
            $.ajax({
                url: "//www.yi-ding.net.cn/call/yiding/customer/auth/getMapById/",
                type: 'GET',
                dataType: 'json',
                async: false,
                data: postData,
                success: function(req) {
                    if(req.responseObject.responseStatus){
                        localStorage.setItem("approveInfo",JSON.stringify(req.responseObject.responseData.data_list[0].customerAuth));
                        userApproveInfo=JSON.parse(localStorage.getItem("approveInfo"));/*.state*/
                    }else {
                        localStorage.setItem("approveInfo",JSON.stringify({"state":"-1"}));
                        userApproveInfo=JSON.parse(localStorage.getItem("approveInfo"));/*.state*/
                    }
                },
                error: function(xhr, type, error) {

                }
            });
            exitFn&&exitFn();
        }
    }
    authentication.init({type:''});
    authentication.keyState();
})