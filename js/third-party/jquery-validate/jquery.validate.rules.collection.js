/**
 * 功能描述：
 * 使用方法:
 * 注意事件：
 * 引入来源：  作用：
 *
 * Created by LiuYuTao on 2015/3/23.
 */


// 姓名，中英文较验
jQuery.validator.addMethod("isChinese", function(value, element) {

    return this.optional(element) || /^[\u4e00-\u9fa5\d\s\.-]{1,25}$|^[\dA-Za-z_\s\.-]{1,50}$/.test(value);
}, "请输入中文或英文");

// 身份证较验
jQuery.validator.addMethod("zhengjian", function(value, element) {
    /*var zhengjianType = $("#certificatesId").val();
     if(zhengjianType == "1"){	//若为身份证*/
    return this.optional(element) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
    /*  }else{
     return this.optional(element) || /^[A-Za-z0-9\u4e00-\u9fa5]{1,50}$/.test(value);
     }*/
}, "你还没填写证件号码。");

jQuery.validator.addMethod("chrnum", function(value, element) {
    var chrnum = /^([\@A-Za-z0-9\!\#\$\%\^\&\*\.\~\,\.\/\?\>\<\:\;\+\-\_\|\'\"\\\=\`\(\)\{\}\[\]]+)$/;
    return this.optional(element) || (chrnum.test(value));
}, "6-20位，字母、数字或符号的组合。");

jQuery.validator.addMethod("allinEmail", function(value, element) {
    var allinEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return this.optional(element) || (allinEmail.test(value));
}, "不像是有效的电子邮箱");
//手机验证
jQuery.validator.addMethod("mobile", function(value, element) {
    var mobile = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return this.optional(element) || (mobile.test(value));
}, "手机号输入不正确");
// 邮政编码
jQuery.validator.addMethod("zip", function(value, element) {
    var zip = /^[0-9]{6}$/;
    return this.optional(element) || (zip.test(value));
}, "输入正确的邮政编码");



jQuery.validator.addMethod("emailOrPhone", function(value, element) {
    var phone = /^(127|13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/;
    var email = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return this.optional(element) || (phone.test(value)) || (email.test(value));
}, "手机或者邮箱");

jQuery.validator.addMethod("requiredcertificate", function(value, element) {

    return $("input[name=certificate]").val()=="选择证件类型";
}, "请选择证件类型");

jQuery.validator.addMethod("weixin", function(value, element) {
    var weixin = /^[a-zA-Z\d_]{5,}$/;
    return this.optional(element) || (weixin.test(value));
}, "输入正确的微信");

jQuery.validator.addMethod("validCode", function(value, element) {
    var mobile = /^[0-9,a-z,A-Z]{3,8}$/;
    return this.optional(element) || (mobile.test(value));
}, "验证码不正确");