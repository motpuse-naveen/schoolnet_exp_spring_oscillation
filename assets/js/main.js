const POPUP_WIDTH = 280;

var zoom1 = null;
var zoom2 = null;
var zoom3 = null;
var zoom4 = null;
var zoomhtml = null;
var zoombody = null;

var ActivityShell = (function () {
  return {
    Init: function () {
      //this.CheckAndLaunchFullscreen();
      $(".wrapper").css({
        "height": window.innerHeight + "px"
      })
      var deviceType = ActivityShell.DeviceType();
      $(".wrapper").attr("device", deviceType);
      $("body").attr("device", deviceType);
      if (this.IsIOSDevice()) {
        $("body").attr("platform", "ios")
      }
      else {
        if (deviceType == "desktop") {
          $(".wrapper").addClass("center-screen");
        }
      }
      this.InitToolTip();
      this.AdjustSmallTablet();
    },
    CheckAndLaunchFullscreen: function(){
      var Android = /(android)/i.test(navigator.userAgent);
      if(Android) {
          ActivityShell.OpenFullScreen()
      }
    },
    OpenFullScreen: function(){
      var elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
          elem.msRequestFullscreen();
        }
    },
    LaunchActivity: function () {
      $(".wrapper").addClass("activity");
      $(".container-so.launch").fadeOut();
      $(".container-so.main").show();
      this.AdjustContainerHeight();
      ScreenSplitter.InitSplitter();
      GuidedTour.Init();
      SpringOscillation.LaunchActivity();
      /* Scale Spring to fit */
      //ScreenSplitter.ScaleToFit($("#split-0"))
      /* Scale Graph to fit */
      ScreenSplitter.ScaleToFit($("#split-1"))
      //new window.PinchZoom.default(document.querySelector('div.zoom1'), { });
      if (zoom1 == null) {
        hammerIt(document.querySelector(".zoom1"));
        zoom1 = "zoom1";
        //new window.PinchZoom.default(document.querySelector('div.zoom2'), { });
      }
      if (zoom2 == null) {
        hammerIt(document.querySelector(".zoom2"));
        zoom2 = "zoom2";
        //new window.PinchZoom.default(document.querySelector('div.zoom2'), { });
      }
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
        else {
          $(".wrapper").attr("device", "mobile");
          $(".cust-popup.settings").addClass("mobileview")
          $(".cust-popup.settings").hide();
          $(".btn-wrap.btn-wrap-settings").show();

          var calc_html = $(".popup.calculations .popupcontent .row").html()
          if ($(".cust-popup.settings .calculationsCol").length <= 0) {
            $(".cust-popup.settings .settingsCol").after(calc_html);
            $(".cust-popup.settings .settingsCol").hide();
            $(".cust-popup.settings .calculationsCol").hide();
          }
          $(".popup.calculations").remove();
          $(".popup.worksheet").addClass("cust-popup").removeClass("popup");
          $(".popup.procedure").addClass("cust-popup").removeClass("popup");
          $(".btn.btn_sheet").addClass("cust");
          $(".btn.btn_procedure").addClass("cust")
        }
        $(".exp_body_content").css({ "height": (mainHt - (headerHt + footerHt)) })
        $(".exp_body_content").css({ "padding-bottom": settingPanelHt })
      }
      

    },
    AdjustSmallTablet: function(){
      $(".wrapper").removeClass("small-height-landscape").removeClass("extra-small-height-landscape")
      var bodyHt = $("body").height()
      bodyHt = Number(bodyHt)
      if(bodyHt<440){
        $(".wrapper").addClass("small-height-landscape")
      }
    },
    DeviceType: function () {
      /* This function needs changes in device detection logic 
      below code is not working for ipad it returns desktop */
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        if (window.screen.availWidth < 530 || window.screen.availHeight < 530) {
          return "mobile";
        }
        else {
          return "tablet";
        }
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
          $popup.css({ "padding-bottom": settingPanelHt + 10 })
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
    AdjustSplitPanelsOnOpenCustomPopup: function () {
      var deviceType = ActivityShell.DeviceType();
      var settingPanelHt = 0;
      if (deviceType == "mobile") {
        if ($("#split-main").length > 0) {
          var spltHeight = $(".wrapper").height();
          settingPanelHt = $(".cust-popup.settings").outerHeight();
          var footerHt = 0;
          if ($(".gutter.gutter-vertical").length > 0) {
            footerHt = 46;
          }
          $("#split-main").css({ "height": spltHeight - (settingPanelHt + footerHt) })
        }
      }
    },
    AdjustSplitPanelsOnCloseCustomPopup: function () {
      var deviceType = ActivityShell.DeviceType();
      if (deviceType == "mobile") {
        $("#split-main").css({ "height": "100%" })
      }
    },
    AdjustSplitPanelsOnOpenLikeCustomPopup: function ($popup) {
      var deviceType = ActivityShell.DeviceType();
      var settingPanelHt = 0;
      if (deviceType == "mobile") {
        if ($("#split-main").length > 0) {
          var spltHeight = $(".wrapper").height();
          settingPanelHt = $popup.outerHeight();
          var footerHt = 0;
          if ($(".gutter.gutter-vertical").length > 0) {
            footerHt = 46;
          }
          $("#split-main").css({ "height": spltHeight - (settingPanelHt + footerHt) })
        }
      }
    },
    AdjustSplitPanelsOnCloseLikeCustomPopup: function ($popup) {
      var deviceType = ActivityShell.DeviceType();
      if (deviceType == "mobile") {
        $("#split-main").css({ "height": "100%" })
      }
    },
    TogglePopup: function ($popup, $button) {
      //debugger;
      if (!$popup.is(":visible")) {
        $(".popup").hide();
        $(".active").removeClass("active")
        var deviceType = ActivityShell.DeviceType();
        if (deviceType == "mobile") {
          if ($(".cust-popup").is(":visible")) {
            $(".cust-popup").hide();
            $(".calculationsCol").hide();
            $(".settingsCol").hide();
            ActivityShell.AdjustSplitPanelsOnCloseCustomPopup()
          }
        }
        $popup.fadeIn();
        $button.addClass("active")
        ActivityShell.AdjustSplitPanelsOnOpenPopup($popup)
      }
      else {
        $popup.hide();
        $button.removeClass("active")
        ActivityShell.AdjustSplitPanelsOnClosePopup($popup)
      }
      /* Scale Spring to fit */
      ScreenSplitter.ScaleToFit($("#split-0"))
      /* Scale Graph to fit */
      ScreenSplitter.ScaleToFit($("#split-1"))
    },
    ToggleCustomPopup: function ($popup, panel_identifier, $button) {
      //debugger;

      if (panel_identifier == "calculations") {
        if (!$(".calculationsCol").is(":visible")) {
          $(".popup").hide();
          $(".procedure.cust-popup").hide()
          $("#btn_info.active, #btn_sheet.active, #btn_procedure.active").removeClass("active");
          $(".calculationsCol").fadeIn();
          $button.addClass("active");
          if (!$popup.is(":visible")) {
            $popup.fadeIn();
          }
        }
        else {
          $(".calculationsCol").hide();
          $button.removeClass("active");
        }
      }
      if (panel_identifier == "settings") {
        if (!$(".settingsCol").is(":visible")) {
          $(".popup").hide();
          $(".procedure.cust-popup").hide()
          $("#btn_info.active, #btn_sheet.active, #btn_procedure.active").removeClass("active");
          $(".settingsCol").fadeIn();
          $button.addClass("active");
          if (!$popup.is(":visible")) {
            $popup.fadeIn();
          }
        }
        else {
          $(".settingsCol").hide();
          $button.removeClass("active");
        }
      }

      if ($popup.is(":visible") && (!$(".settingsCol").is(":visible") && (!$(".calculationsCol").is(":visible")))) {
        $popup.hide();
        $(".active").removeClass("active")
        ActivityShell.AdjustSplitPanelsOnCloseCustomPopup();
      }
      else {
        ActivityShell.AdjustSplitPanelsOnOpenCustomPopup();
      }
      /* Scale Spring to fit */
      ScreenSplitter.ScaleToFit($("#split-0"))
      /* Scale Graph to fit */
      ScreenSplitter.ScaleToFit($("#split-1"))
      if ($(".settingsCol").is(":visible")) {
        if (zoom4 == null) {
          //zoom4 = new window.PinchZoom.default(document.querySelector('.zoom4'), {});
          //$(".zoom4").closest(".pinch-zoom-container").css({ "height": "180px" });
          hammerIt(document.querySelector(".zoom4"))
          zoom4 = "zoom4"
        }
      }
      if ($(".calculationsCol").is(":visible")) {
        if (zoom3 == null) {
          //zoom3 = new window.PinchZoom.default(document.querySelector('.zoom3'), {});
          //$(".zoom3").closest(".pinch-zoom-container").css({ "height": "180px" });
          hammerIt(document.querySelector(".zoom3"))
          zoom3 = "zoom3"
        }
      }
    },
    ToggleLikeCustomPopup: function ($popup, $button) {
      debugger;
      $(".popup").hide();
      if (!$popup.is(":visible")) {
        $(".cust-popup").hide();
        $(".active").removeClass("active")
        $popup.fadeIn();
        $button.addClass("active")
        ActivityShell.AdjustSplitPanelsOnOpenLikeCustomPopup($popup)
      }
      else {
        $(".cust-popup").hide();
        $(".active").removeClass("active")
        $popup.hide();
        $button.removeClass("active")
        ActivityShell.AdjustSplitPanelsOnCloseLikeCustomPopup($popup)
      }
      /* Scale Spring to fit */
      ScreenSplitter.ScaleToFit($("#split-0"))
      /* Scale Graph to fit */
      ScreenSplitter.ScaleToFit($("#split-1"))
    },
    OnOrientationChange: function () {
      this.AdjustContainerHeight();
      ScreenSplitter.InitSplitter();
      if ($(".popup").is(":visible")) {
        this.AdjustSplitPanelsOnOpenPopup($(".popup:visible"))
      }
      /* Scale Spring to fit */
      //ScreenSplitter.ScaleToFit($("#split-0"))
      /* Scale Graph to fit */
      ScreenSplitter.ScaleToFit($("#split-1"))
      this.AdjustSmallTablet();
    },
    IsIOSDevice: function () {
      if (/iPad|iPhone|iPod/.test(navigator.platform)) {
        return true;
      } else {
        return navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 2 &&
          /MacIntel/.test(navigator.platform);
      }
    },
    OnWindowResize: function () {
      var deviceType = this.DeviceType();
      //if(deviceType == "desktop"){
      this.AdjustContainerHeight();
      ScreenSplitter.InitSplitter(true);
      if ($(".popup").is(":visible")) {
        this.AdjustSplitPanelsOnOpenPopup($(".popup:visible"))
      }
      /* Scale Spring to fit */
      //ScreenSplitter.ScaleToFit($("#split-0"))
      /* Scale Graph to fit */
      ScreenSplitter.ScaleToFit($("#split-1"))
      //}
      GuidedTour.OnResize();
    },
    InitToolTip: function () {
      var deviceType = ActivityShell.DeviceType();
      if (deviceType == "desktop") {
        if (!this.IsIOSDevice()) {
          $("button[data-toggle='tooltip']").tooltip({ boundary: 'window', container: $(".wrapper"), trigger: "hover", delay: { show: 500, hide: 100 } })
        }
      }
    }
  }
})();

$(document).ready(function () {
  ActivityShell.Init();
  
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });
  document.addEventListener('touchmove', function (e) {
    e.preventDefault();
  });
  
  if (zoomhtml == null) {
    hammerIt(document.querySelector("html"),1);
    zoomhtml = "zoomhtml";
  }
  if (zoombody == null) {
    hammerIt(document.querySelector("body"),1);
    zoombody = "zoombody";
  }
  
});

$(window).bind('orientationchange', function () {
  this.setTimeout(function () {
    ActivityShell.OnOrientationChange();
  }, 200);
});

$(window).resize(function () {
  ActivityShell.OnWindowResize();
});

$(document).on("click", "#btn_launch", function (event) {
  ActivityShell.LaunchActivity();
});
/*Common Popup*/
$(document).on("click", "#btn_sheet", function (event) {
  if ($(this).hasClass("cust")) {
    ActivityShell.ToggleLikeCustomPopup($(".cust-popup.worksheet"), $(this));
  }
  else {
    ActivityShell.TogglePopup($(".popup.worksheet"), $(this));
  }

});
$(document).on("click", "#btn_info", function (event) {
  ActivityShell.TogglePopup($(".popup.info"), $(this));
});
$(document).on("click", "#btn_procedure", function (event) {
  //ActivityShell.TogglePopup($(".popup.procedure"),$(this));
  if ($(this).hasClass("cust")) {
    ActivityShell.ToggleLikeCustomPopup($(".cust-popup.procedure"), $(this));
  }
  else {
    ActivityShell.TogglePopup($(".popup.procedure"), $(this));
  }
});

$(document).on("click", ".btn-close-popup", function (event) {
  if ($(this).closest(".cust-popup").length > 0) {
    $(this).closest(".cust-popup").hide();
    $(".active").removeClass("active")
    ActivityShell.AdjustSplitPanelsOnCloseLikeCustomPopup($(this).closest(".cust-popup"))
  }
  else {
    $(this).closest(".popup").hide();
    $(".active").removeClass("active")
    ActivityShell.AdjustSplitPanelsOnClosePopup($(this).closest(".popup"))
  }
  /* Scale Spring to fit */
  ScreenSplitter.ScaleToFit($("#split-0"))
  /* Scale Graph to fit */
  ScreenSplitter.ScaleToFit($("#split-1"))

});

$(document).on("click", "#btn_calculations", function (event) {
  var deviceType = ActivityShell.DeviceType();
  if (deviceType != "mobile") {
    ActivityShell.TogglePopup($(".popup.calculations"), $(this));
  }
  else {
    //NM: $(".cust-popup.settings") is parent popup as for mobile 
    //Calculations popup is moved into settings popup.
    ActivityShell.ToggleCustomPopup($(".cust-popup.settings"), "calculations", $(this));
  }
});

$(document).on("click", "#btn_settings", function (event) {
  var deviceType = ActivityShell.DeviceType();
  if (deviceType != "mobile") {
  }
  else {
    ActivityShell.ToggleCustomPopup($(".cust-popup.settings"), "settings", $(this));
  }
});
/*
$(document).on("click", ".btn-close-cust-popup", function (event) {
  $(this).closest(".cust-popup").hide();
});
*/
/*End Common Popup Script */

$(document).on('shown.bs.tooltip', function (e) {
  setTimeout(function () {
    $(e.target).tooltip('hide');
  }, 1500);
});