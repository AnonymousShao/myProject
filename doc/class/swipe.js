/**
 * Created by ALLIN on 2017/3/15.
 */
function swipe(container, containerImg, Imgwidth, containerLi, height) {
    var nn = containerLi.length - 3;
    var containerParent = container.parent();
    var slider = ' <figure class="slide">' +
        '                                <i class="slideLeft"></i>' +
        '                                <i class="slideRight"></i>' +
        '                            </figure>';
    containerParent.prepend(slider);
    container.css({
        position: "relative",
        height: height,
    })
    containerImg.css({
        position: "absolute",
    })
    if (containerLi.length > 3) {
        container.siblings('.slide').find('.slideLeft').on('mouseover', function () {
            $(this).addClass('activation');
        })
        container.siblings('.slide').find('.slideLeft').on('mouseout', function () {
            $(this).removeClass('activation');
        })
        container.siblings('.slide').find('.slideRight').on('mouseover', function () {
            $(this).addClass('activation');
        })
        container.siblings('.slide').find('.slideRight').on('mouseout', function () {
            $(this).removeClass('activation');
        })
        container.siblings('.slide').find('.slideRight').click(function () {
            var left_lenght = -(containerLi.length - 4) * parseInt(Imgwidth);
            if (nn > 0) {
                containerImg.animate({
                    left: "-=" + Imgwidth
                }, 1000);
                nn--;
            } else {
                nn = 0;
            }
        });
        container.siblings('.slide').find('.slideLeft').click(function () {
            nn++;
            if (nn <= containerLi.length - 3) {
                containerImg.animate({
                    left: "+=" + Imgwidth
                }, 1000);
            } else {
                nn = containerLi.length - 3;
            }
        });
    }
}