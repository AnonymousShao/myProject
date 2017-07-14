/**
 * Created by ALLIN on 2017/3/13.
 */
function browserVerinfo(){
    var browser=getBrowserInfo();
    var verinfoNum='';
    var verinfo=''
    if(browser){
        verinfoNum = (browser + "").replace(/[^0-9.]/ig, "");
        verinfo = (browser + "").replace(/[^a-zA-Z]/ig, "")+','+verinfoNum;
    }
     return verinfo;
}
function getBrowserInfo() {
    var agent = navigator.userAgent.toLowerCase();

    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ff = /firefox\/[\d.]+/gi
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;
    //IE
    if(agent.indexOf("msie") > 0) {
        return agent.match(regStr_ie);
    }

    //firefox
    if(agent.indexOf("firefox") > 0) {
        return agent.match(regStr_ff);
    }

    //Chrome
    if(agent.indexOf("chrome") > 0) {
        return agent.match(regStr_chrome);
    }

    //Safari
    if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
        return agent.match(regStr_saf);
    }
}