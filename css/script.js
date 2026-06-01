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

  var hwid = 0;
  setInterval(function () {
    if (hwid < 81) {
      hwid++;
      $(".front-skill > .son > .word .html .lower .bar .run .level span").html(
        hwid
      );
    } else {
      clearInterval();
    }
  }, 10);

  var cwid = 0;
  setInterval(function () {
    if (cwid < 80) {
      cwid++;
      $(".front-skill > .son > .word .css .lower .bar .run .level span").html(
        cwid
      );
    } else {
      clearInterval();
    }
  }, 10);

  var jwid = 0;
  setInterval(function () {
    if (jwid < 68) {
      jwid++;
      $(".front-skill > .son > .word .js .lower .bar .run .level span").html(
        jwid
      );
    } else {
      clearInterval();
    }
  }, 15);

  var qwid = 0;
  setInterval(function () {
    if (qwid < 75) {
      qwid++;
      $(
        ".front-skill > .son > .word .jquery .lower .bar .run .level span"
      ).html(qwid);
    } else {
      clearInterval();
    }
  }, 15);
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

  var pwid = 0;
  setInterval(function () {
    if (pwid < 65) {
      pwid++;
      $(".back-skill > .son > .word .php .lower .bar .run .level span").html(
        pwid
      );
    } else {
      clearInterval();
    }
  }, 15);

  var swid = 0;
  setInterval(function () {
    if (swid < 55) {
      swid++;
      $(".back-skill > .son > .word .sql .lower .bar .run .level span").html(
        swid
      );
    } else {
      clearInterval();
    }
  }, 15);
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
