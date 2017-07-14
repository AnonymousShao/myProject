/**
 * Created by ALLIN on 2017/3/15.
 */
function videoFaceInit() {
    $videoPanelMenu = $(".vjs-fullscreen-control");
    $videoPanelVolume = $(".vjs-play-control");
    $videoSign = $(".vjs-progress-holder");
    $allPlayTime = $(".vjs-remaining-time");
    $(".vjs-current-time").show();
    $videoPanelMenu.after("<div class=\'vjs-subtitles-button vjs-menu-button vjs-menu-button-popup vjs-control vjs-button vjs-button-sharpness\' tabindex=\'0\' role=\'button\' type=\'button\' aria-live=\'polite\' style=\"display:block;\" aria-haspopup=\'true\' aria-label=\'sharpness\' aria-pressed=\'true\'>" + "<span class=\'vjs-control-text\'>清晰度</span>" + "<div class=\'vjs-menu\' style=\'z-index:2\'>" + "<ul class=\'vjs-menu-content\'>" + "<li class=\'vjs-menu-item vjs-selected vjs-menu-hd\' tabindex=\'0\' role=\'button\' type=\'button\' aria-live=\'polite\' aria-selected=\'true\'>高清" + "<span class=\'vjs-control-text\'></span>" + "</li>" + "<li class=\'vjs-menu-item vjs-menu-hd\' tabindex=\'0\' role=\'button\' type=\'button\' aria-live=\'polite\' aria-selected=\'false\'>标清" + "<span class=\'vjs-control-text\'></span>" + "</li></ul>" + "</div>" + "</div>");
    if ($videoSign.find(".videoSign").length == 0) {
        $videoSign.append("<section class=\'videoSign\'>答题马上开始</section>");
    }

}