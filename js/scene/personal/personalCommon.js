$(function() {
    selectColorChange($(".yd-tableModuleSelect select"));
    $(".yd-tableModuleSelect select").on("change", function() {
        selectColorChange($(this));
    });

    function selectColorChange(ele) {
        if (ele.val().length !== 0) {
            ele.addClass('selected');
        } else {
            ele.removeClass('selected');
        }
    }
    $(".yd-tableSexSelector").on('click', function() {
        $(this).addClass('on').siblings().removeClass('on');
    });

});
