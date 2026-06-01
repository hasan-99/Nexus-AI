$(document).ready(function() {
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        // ############################### nav #####################################
        if (scroll < 280) {
            $("#home-a").css({
                borderBottom: "solid #ffa011 5px "
            });
        } else {
            $("#home-a").css({
                borderBottom: "none"
            });
        }

        if (scroll > 280 && scroll < 2700) {
            $("#about-a").css({
                borderBottom: "solid #ffa011 5px "
            });
        } else {
            $("#about-a").css({
                borderBottom: "none"
            });
        }

        if (scroll > 2700 && scroll < 3500) {
            $("#servesies-a").css({
                borderBottom: "solid #ffa011 5px "
            });
        } else {
            $("#servesies-a").css({
                borderBottom: "none"
            });
        }

        if (scroll > 3500 && scroll < 4200) {
            $("#daily-a").css({
                borderBottom: "solid #ffa011 5px "
            });
        } else {
            $("#daily-a").css({
                borderBottom: "none"
            });
        }

        if (scroll > 4200) {
            $("#contact-a").css({
                borderBottom: "solid #ffa011 5px "
            });
        } else {
            $("#contact-a").css({
                borderBottom: "none"
            });
        }

        // ################################ moving about ##############################

        if (scroll > 280) {
            $(".about h2").css({
                transform: "translate(0%)",
                opacity: "1"
            });
            $(".about > p").css({
                transform: "translate(0%)",
                opacity: "1"
            });
            $(".about #con-1 img").css({
                transform: "translate(0%)",
                opacity: "1"
            });
            $(".about #con-1 p").css({
                transform: "translate(0%)",
                opacity: "1"
            });
        }
        if (scroll > 855) {
            $(".about #con-2 img").css({
                transform: "translate(0%)",
                opacity: "1"
            });
            $(".about #con-2 p").css({
                transform: "translate(0%)",
                opacity: "1"
            });
        }
        if (scroll > 1310) {
            $(".about #con-3 img").css({
                transform: "translate(0%)",
                opacity: "1"
            });
            $(".about #con-3 p").css({
                transform: "translate(0%)",
                opacity: "1"
            });
        }
        if (scroll > 1870) {
            $(".about #con-4 img").css({
                transform: "translate(0%)",
                opacity: "1"
            });
            $(".about #con-4 p").css({
                transform: "translate(0%)",
                opacity: "1"
            });
        }
        console.log(scroll);
    });

    // ################################ moving bar ##############################
    var daily = 150;
    var suc = 1900;
    var online = 200;
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll > 2300) {
            setInterval(function() {
                daily++;
                suc++;
                online++;

                if (daily < 320) {
                    $("#d-span").html(daily);
                }

                if (suc < 2220) {
                    $("#suc-span").html(suc);
                }

                if (online < 520) {
                    $("#on-span").html(online);
                }

                if (daily == 321 && suc == 2221 && online == 521) {
                    clearInterval();
                }
            }, 50);
        }
    });
});