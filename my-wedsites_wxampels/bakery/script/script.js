$(document).ready(function() {
    $(window).scroll(function() {
        var scroll_top = $(window).scrollTop();
        if (scroll_top > 500) {
            $("header").css({
                position: "fixed",
                "background-color": "#151f27"
            });
        } else {
            $("header").css({
                position: "absolute",
                "background-color": "#151f2700",
            });
        }
    });

    //   ############# prod_card

    setInterval(function() {
        var prod_wid = $(".products .son .bread").css("width");
        $(".products .son .bread").css("height", prod_wid);
    });

    //   ##############
});