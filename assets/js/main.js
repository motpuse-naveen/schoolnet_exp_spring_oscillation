const POPUP_WIDTH = 280;
var ActivityShell = (function () {
  return {
    Init: function () {
      $(".wrapper").css({
        "height": window.innerHeight + "px"
      })
    },
    LaunchActivity: function () {
      $(".container-so.launch").fadeOut();
      $(".container-so.main").show();
      this.AdjustContainerHeight();
      ScreenSplitter.InitSplitter();
      //GuidedTour.Init();
      SpringOscillation.LaunchActivity();

      /* Scale Spring to fit */
      ScreenSplitter.ScaleToFit($("#split-0"))
      /* Scale Graph to fit */
      ScreenSplitter.ScaleToFit($("#split-1"))
    },
    AdjustContainerHeight: function () {
      $(".wrapper").css({
        "height": window.innerHeight + "px"
      })
      if ($(".container-so.main").is(":visible")) {
        var headerHt = $(".container-so.main .exp_header").outerHeight();
        var footerHt = $(".container-so.main .exp_footer").outerHeight();
        $(".exp_body_header").css({ "height": headerHt + "px" });
        $(".exp_body_footer").css({ "height": footerHt + "px" });
        var mainHt = $(".container-so.main").height();
        $(".exp_body_content").css({ "height": (mainHt - (headerHt + footerHt)) })
      }
    },
    DeviceType: function () {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
      }
      else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
      }
      return "desktop";
    },
    AdjustSplitPanelsOnOpenPopup: function ($popup) {
      var deviceType = ActivityShell.DeviceType();
      if (deviceType != "mobile") {
        if ($("#split-main").length > 0) {
          var spltWdt = $(".wrapper").width();
          $("#split-main").css({ "width": spltWdt - POPUP_WIDTH })
        }
        $popup.addClass("right_align_popup")
      }
    },
    AdjustSplitPanelsOnClosePopup: function ($popup) {
      $("#split-main").css({ "width": $(".wrapper").width() })
    }
  }
})();

$(document).ready(function () {
  ActivityShell.Init();
});

$(window).bind('orientationchange', function () {
  this.setTimeout(function () {
    ActivityShell.AdjustContainerHeight();
    ScreenSplitter.InitSplitter();
    if($(".popup").is(":visible")){
      ActivityShell.AdjustSplitPanelsOnOpenPopup($(".popup:visible"))
    }
    /* Scale Spring to fit */
    ScreenSplitter.ScaleToFit($("#split-0"))
    /* Scale Graph to fit */
    ScreenSplitter.ScaleToFit($("#split-1"))
  }, 200);
});

$(document).on("click", "#btn_launch", function (event) {
  ActivityShell.LaunchActivity();
});
/*Common Popup*/
$(document).on("click", "#btn_sheet", function (event) {
  if (!$(".popup.worksheet").is(":visible")) {
    $(".popup").hide();
    $(".popup.worksheet").fadeIn();
    ActivityShell.AdjustSplitPanelsOnOpenPopup($(".popup.worksheet"))
  }
  else {
    $(".popup.worksheet").hide();
    ActivityShell.AdjustSplitPanelsOnClosePopup($(".popup.worksheet"))
  }

  /* Scale Spring to fit */
  ScreenSplitter.ScaleToFit($("#split-0"))
  /* Scale Graph to fit */
  ScreenSplitter.ScaleToFit($("#split-1"))
});
$(document).on("click", "#btn_info", function (event) {
  if (!$(".popup.info").is(":visible")) {
    $(".popup").hide();
    $(".popup.info").fadeIn();
    ActivityShell.AdjustSplitPanelsOnOpenPopup($(".popup.info"))
  }
  else {
    $(".popup.info").hide();
    ActivityShell.AdjustSplitPanelsOnClosePopup($(".popup.info"))
  }

  /* Scale Spring to fit */
  ScreenSplitter.ScaleToFit($("#split-0"))
  /* Scale Graph to fit */
  ScreenSplitter.ScaleToFit($("#split-1"))
});
$(document).on("click", "#btn_procedure", function (event) {
  if (!$(".popup.procedure").is(":visible")) {
    $(".popup").hide();
    $(".popup.procedure").fadeIn();
    ActivityShell.AdjustSplitPanelsOnOpenPopup($(".popup.procedure"))
  }
  else {
    $(".popup.procedure").hide();
    ActivityShell.AdjustSplitPanelsOnClosePopup($(".popup.procedure"))
  }

  /* Scale Spring to fit */
  ScreenSplitter.ScaleToFit($("#split-0"))
  /* Scale Graph to fit */
  ScreenSplitter.ScaleToFit($("#split-1"))
});
$(document).on("click", ".btn-close-popup", function (event) {
  $(this).closest(".popup").hide();
  ActivityShell.AdjustSplitPanelsOnClosePopup($(this).closest(".popup"))
  /* Scale Spring to fit */
  ScreenSplitter.ScaleToFit($("#split-0"))
  /* Scale Graph to fit */
  ScreenSplitter.ScaleToFit($("#split-1"))
});
/*End Common Popup Script */