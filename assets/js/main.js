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
      GuidedTour.Init();
      SpringOscillation.LaunchActivity();
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
    AdjustSplitPanelsOnOpenPopup: function($popup){
      var deviceType = ActivityShell.DeviceType();
      if(deviceType!="mobile"){
        if($("#split-main").length>0){
          var spltWdt = $(".wrapper").width();
          $("#split-main").css({"width": spltWdt- POPUP_WDT})
        }
        $popup.addClass("right_align_popup")
      }
    },
    AdjustSplitPanelsOnClosePopup: function($popup){
      $("#split-main").css({"width": $(".wrapper").width()})
    }
  }
})();

$(document).ready(function () {
  ActivityShell.Init();
  
});

$(window).bind('orientationchange', function () {
  ActivityShell.AdjustContainerHeight();
  ScreenSplitter.InitSplitter();
});

$(document).on("click", "#btn_launch", function (event) {
  ActivityShell.LaunchActivity();
});
/*Common Popup*/
$(document).on("click", "#btn_sheet", function (event) {
  $(".popup").hide();
  $(".popup.worksheet").fadeIn();
  ActivityShell.AdjustSplitPanelsOnOpenPopup($(".popup.worksheet"))
});
$(document).on("click", "#btn_info", function (event) {
  $(".popup").hide();
  $(".popup.info").fadeIn();
  ActivityShell.AdjustSplitPanelsOnOpenPopup($(".popup.info"))
});
$(document).on("click", "#btn_procedure", function (event) {
  $(".popup").hide();
  $(".popup.procedure").fadeIn();
  ActivityShell.AdjustSplitPanelsOnOpenPopup($(".popup.procedure"))
});
$(document).on("click", ".btn-close-popup", function (event) {
  $(this).closest(".popup").fadeOut();
  ActivityShell.AdjustSplitPanelsOnClosePopup($(this).closest(".popup"))
});
/*End Common Popup Script */