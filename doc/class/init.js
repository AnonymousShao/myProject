/**
 * Created by ALLIN on 2017/3/15.
 */
function init() {
    this.eventDefault();//默认执行事件
    this.browserVerinfo();//获取浏览器版本，用来区分IE8
    this.removeHead();//初始化加载视频的时候将头部置空
    //在最初加载的时候初始化视频
    var myP = videojs("example_video_1", {
            "defaultVolume": 1,
        },
        function () {
            var thisVideo = this;
        });
    commLog.createBrowse(38, "课程终端页-课程页", window.location.href + "?/" + course.courseId + "/" + "3");//页面埋点
    this.video = myP;//将这个视频保存为一个全局变量
    var recommendData = {
        "resourceId": course.courseId,
        "resourceType": "1",
        "isValid": "1",
        "attUseFlag": "3",
        "firstResult": "0",
        "maxResult": "20"
    };
    var classThink = {
        "courseId": course.courseId,
        "isValid": "1",
        "firstResult": "0",
        "maxResult": "20"
    };
    this.talkInit();
    this.onPlay();
    this.onEnded();
    this.smallScreen();
    this.share();//开启分享功能
    this.videoFn.videoFaceInit();//初始化高清标清界面
    this.baseInfo();
    this.applyData("recommend", recommendData);//加载视频的相关推荐\
    this.applyData("classThink", classThink);//加载课后思考题
    this.courseTap();//实现切换功能
    this.courseAbstract();//打开页面的展开收起功能
    this.collect();//启动页面的所有收藏功能
    this.postVideoTime();//视频播放的时候上传视频播放时间
    this.courseware();//新页打开课件
    this.eventClick();
}