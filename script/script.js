// Animate a percentage number from 0 up to target inside the given selector
function countUp(selector, target) {
  var n = 0;
  var iv = setInterval(function () {
    if (n < target) {
      n++;
      $(selector).html(n);
    } else {
      clearInterval(iv);
    }
  }, 14);
}

$(document).ready(function () {
  var win_scroll_top = $(window).scrollTop();
  console.log(win_scroll_top);
  if (win_scroll_top > 100) {
    $("nav").css({
      "background-image": "url(img/bg.png)",
    });
  } else {
    $("nav").css({ "background-image": "none" });
  }
  // #############################

  if (win_scroll_top > 170) {
    $(".about .son .child .canvas-con > .son").css({
      display: "flex",
    });
  }

  if (win_scroll_top > 730) {
    $(".skills ").css({ transform: "translateY(0%)", opacity: "1" });
  }
  if (win_scroll_top > 730) {
    $(".skills ").css({ transform: "translateY(0%)", opacity: "1" });
  }
  if (win_scroll_top > 770) {
    $(".skills .son .child .canvas-con").css({
      display: "block",
    });
  }
  // ###################### nav
  $(window).scroll(function () {
    var win_scroll_top = $(window).scrollTop();
    console.log(win_scroll_top);
    if (win_scroll_top > 100) {
      $("nav").css({
        "background-image": "url(img/bg.png)",
      });
    } else {
      $("nav").css({ "background-image": "none" });
    }
    // #############################
    $(".about ").css({ transform: "translateY(0%)", opacity: "1" });

    if (win_scroll_top > 170) {
      $(".about .son .child .canvas-con > .son").css({
        display: "flex",
      });
    }

    if (win_scroll_top > 730) {
      $(".skills ").css({ transform: "translateY(0%)", opacity: "1" });
    }
    if (win_scroll_top > 730) {
      $(".skills ").css({ transform: "translateY(0%)", opacity: "1" });
    }
    if (win_scroll_top > 800) {
      $(".skills .son .child .canvas-con").css({
        display: "block",
      });
    }
  });
  // ############################ mobile mood
  setInterval(function () {
    var win_wid = $(window).width();
    if (win_wid < 750) {
      $("main .img .msg-father > .son").css({ display: "block" });
    } else {
      $("main .img .msg-father > .son").css({ display: "none" });
    }
  });

  // ######################### heading running
  $("main .word .son").css({ display: "block" });

  setTimeout(function () {
    $("main .word .son .hi").css({ animation: "none" });
    $("main .word .son .me").css({ display: "inline-block" });
  }, 1000);

  setTimeout(function () {
    $("main .word .son .me").css({ animation: "none" });
    $("main .word .son .myskill").css({ display: "inline-block" });
  }, 3000);
});
// ############################## be friends
setTimeout(function () {
  $("main .word .btns").css({
    opacity: 1,
    transform: "none",
  });
}, 4500);

$("main .word .btns .friends").click(function () {
  var frnds = $("main .word .btns .friends>i").attr("class");
  console.log(frnds);
  if (frnds == "fa-solid fa-arrow-right") {
    $("main .word .btns .friends .contacts").css({
      width: "12vw",
    });
    $("main .word .btns .friends>i")
      .removeClass("fa-solid fa-arrow-right ")
      .addClass("fa-solid fa-arrow-left");
  } else {
    $("main .word .btns .friends .contacts").css({
      width: "0px",
    });
    $("main .word .btns .friends>i")
      .removeClass("fa-solid fa-arrow-left ")
      .addClass("fa-solid fa-arrow-right");
  }
});
// ########################## skill front
$(".skills .son .child .canvas-con > .son .front").click(function () {
  $(".front-skill").css({ display: "flex" });

  document.querySelector("#frontdiv").scrollIntoView({ behavior: "smooth" });
  $(".front-skill").css({ transform: "translateX(0%)" });
  $(".skills .son .child .canvas-con > .son .skill span .cur").css({
    display: "none",
  });

  countUp(".front-skill .react .level span", 85);
  countUp(".front-skill .angular .level span", 85);
  countUp(".front-skill .typescript .level span", 90);
  countUp(".front-skill .js .level span", 85);
  countUp(".front-skill .bootstrap .level span", 90);
});

$(".front-skill .close").click(function () {
  $(".front-skill")
    .animate({}, 50, function () {
      $(".front-skill");
    })
    .css({ transform: "translateX(-100%)" })
    .animate({ transform: "translateX(-100%)" }, 500, function () {
      $(".front-skill").css({ display: "none" });
    });
});

// ########################## skill back
$(".skills .son .child .canvas-con > .son .back").click(function () {
  $(".back-skill").css({ display: "flex" });

  document.querySelector("#backdiv").scrollIntoView({ behavior: "smooth" });
  $(".back-skill").css({ transform: "translateX(0%)" });
  $(".skills .son .child .canvas-con > .son .skill span .cur").css({
    display: "none",
  });

  countUp(".back-skill .csharp .level span", 90);
  countUp(".back-skill .dotnet .level span", 90);
  countUp(".back-skill .sqlserver .level span", 85);
  countUp(".back-skill .rabbitmq .level span", 85);
  countUp(".back-skill .docker .level span", 80);
});

$(".back-skill .close").click(function () {
  $(".back-skill")
    .animate({}, 50, function () {
      $(".back-skill");
    })
    .css({ transform: "translateX(-100%)" })
    .animate({ transform: "translateX(-100%)" }, 500, function () {
      $(".back-skill").css({ display: "none" });
    });
});
