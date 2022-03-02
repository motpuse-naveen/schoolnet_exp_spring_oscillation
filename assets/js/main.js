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
        var footerHt = $(".container-so.main .exp_footer").outerHeight();
        $(".exp_body_header").css({ "height": headerHt + "px" });
        $(".exp_body_footer").css({ "height": footerHt + "px" });
        var mainHt = $(".container-so.main").height();
        /*Settings Pannel Height adjustment */

        var settingPanelHt = 0;
        var deviceType = ActivityShell.DeviceType();
        if (deviceType != "mobile") {
          settingPanelHt = $(".cust-popup.settings").outerHeight();
        }
        else{
          $(".cust-popup.settings").hide();
          $(".btn-wrap.btn-wrap-settings").show();
        }
        $(".exp_body_content").css({ "height": (mainHt - (headerHt + footerHt))})
        $(".exp_body_content").css({"padding-bottom": settingPanelHt})
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
      var settingPanelHt = 0;
      if (deviceType != "mobile") {
        if ($("#split-main").length > 0) {
          var spltWdt = $(".wrapper").width();
          $("#split-main").css({ "width": spltWdt - POPUP_WIDTH })
          settingPanelHt = $(".cust-popup.settings").outerHeight();
          $popup.css({"padding-bottom":settingPanelHt + 10})
        }
        $popup.addClass("right_align_popup")
      }
    },
    AdjustSplitPanelsOnClosePopup: function ($popup) {
      var deviceType = ActivityShell.DeviceType();
      if (deviceType != "mobile") {
        $("#split-main").css({ "width": $(".wrapper").width() })
      }
    }, 
    TogglePopup: function($popup){
      if (!$popup.is(":visible")) {
        $(".popup").hide();
        $popup.fadeIn();
        ActivityShell.AdjustSplitPanelsOnOpenPopup($popup)
      }
      else {
        $popup.hide();
        ActivityShell.AdjustSplitPanelsOnClosePopup($popup)
      }
      /* Scale Spring to fit */
      ScreenSplitter.ScaleToFit($("#split-0"))
      /* Scale Graph to fit */
      ScreenSplitter.ScaleToFit($("#split-1"))
    },
    ToggleCustomPopup: function($popup){
      if (!$popup.is(":visible")) {
        $(".cust-popup").hide();
        $popup.fadeIn();
        
      }
      else {
        $popup.hide();
        
      }
      /* Scale Spring to fit */
      ScreenSplitter.ScaleToFit($("#split-0"))
      /* Scale Graph to fit */
      ScreenSplitter.ScaleToFit($("#split-1"))
    },
    OnOrientationChange: function(){
      this.AdjustContainerHeight();
      ScreenSplitter.InitSplitter();
      if ($(".popup").is(":visible")) {
        this.AdjustSplitPanelsOnOpenPopup($(".popup:visible"))
      }
      /* Scale Spring to fit */
      ScreenSplitter.ScaleToFit($("#split-0"))
      /* Scale Graph to fit */
      ScreenSplitter.ScaleToFit($("#split-1"))
    }
  }
})();

$(document).ready(function () {
  ActivityShell.Init();
});

$(window).bind('orientationchange', function () {
  this.setTimeout(function () {
    ActivityShell.OnOrientationChange();
  }, 200);
});

$(document).on("click", "#btn_launch", function (event) {
  ActivityShell.LaunchActivity();
});
/*Common Popup*/
$(document).on("click", "#btn_sheet", function (event) {
  ActivityShell.TogglePopup($(".popup.worksheet"));
});
$(document).on("click", "#btn_info", function (event) {
  ActivityShell.TogglePopup($(".popup.info"));
});
$(document).on("click", "#btn_procedure", function (event) {
  ActivityShell.TogglePopup($(".popup.procedure"));
});

$(document).on("click", "#btn_calculations", function (event) {
  ActivityShell.TogglePopup($(".popup.calculations"));
});

$(document).on("click", ".btn-close-popup", function (event) {
  $(this).closest(".popup").hide();
  ActivityShell.AdjustSplitPanelsOnClosePopup($(this).closest(".popup"))
  /* Scale Spring to fit */
  ScreenSplitter.ScaleToFit($("#split-0"))
  /* Scale Graph to fit */
  ScreenSplitter.ScaleToFit($("#split-1"))
});

$(document).on("click", "#btn_settings", function (event) {
  ActivityShell.ToggleCustomPopup($(".cust-popup.settings"));
});
$(document).on("click", ".btn-close-cust-popup", function (event) {
  $(this).closest(".cust-popup").hide();
});
/*End Common Popup Script */