const POPUP_WIDTH = 280;
var ActivityShell = (function () {
  return {
    Init: function () {
      $(".wrapper").css({
        "height": window.innerHeight + "px"
      })
      var deviceType = ActivityShell.DeviceType();
      $(".wrapper").attr("device",deviceType);
      if(this.IsIOSDevice()){
        $("body").attr("platform","ios")
      }
      else{
        if(deviceType == "desktop"){
          $(".wrapper").addClass("center-screen");
        }
      }
      //alert("height:" + window.innerHeight + "width:" + window.innerWidth);
      if(deviceType=="mobile"){
        if (window.matchMedia("(orientation: landscape)").matches) {
          $("#bestviewed_popup_msg").show();
        }
        else{
          $("#bestviewed_popup_msg").hide();
        }
      }
      this.InitToolTip();
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
          $(".wrapper").attr("device","mobile");
          $(".cust-popup.settings").addClass("mobileview")
          $(".cust-popup.settings").hide();
          $(".btn-wrap.btn-wrap-settings").show();

          var calc_html = $(".popup.calculations .popupcontent .row").html()
          if($(".cust-popup.settings .calculationsCol").length<=0){
            $(".cust-popup.settings .settingsCol").after(calc_html);
            $(".cust-popup.settings .settingsCol").hide();
            $(".cust-popup.settings .calculationsCol").hide();
          }
          $(".popup.calculations").remove();
        }
        $(".exp_body_content").css({ "height": (mainHt - (headerHt + footerHt))})
        $(".exp_body_content").css({"padding-bottom": settingPanelHt})
      }
    },
    DeviceType: function () {
      /* This function needs changes in device detection logic 
      below code is not working for ipad it returns desktop */
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        if(window.screen.availWidth<530 || window.screen.availHeight<530){
          return "mobile";
        }
        else{
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
    AdjustSplitPanelsOnOpenCustomPopup: function () {
      var deviceType = ActivityShell.DeviceType();
      var settingPanelHt = 0;
      if (deviceType == "mobile") {
        if ($("#split-main").length > 0) {
          var spltHeight = $(".wrapper").height();
          settingPanelHt = $(".cust-popup.settings").outerHeight();
          var footerHt = 0;
          if($(".gutter.gutter-vertical").length>0){
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
    TogglePopup: function($popup, $button){
      if (!$popup.is(":visible")) {
        $(".popup").hide();
        $(".active").removeClass("active")
        var deviceType = ActivityShell.DeviceType();
        if (deviceType == "mobile") {
          $(".cust-popup").hide();
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
    ToggleCustomPopup: function($popup, panel_identifier,$button){
      //debugger;
      if(panel_identifier == "calculations"){
        if (!$(".calculationsCol").is(":visible")) {
          $(".popup").hide();
          $(".calculationsCol").fadeIn();
          if (!$popup.is(":visible")) {
            $popup.fadeIn();
            $button.addClass("active");
          }
        }
        else{
          $(".calculationsCol").hide();
          $button.removeClass("active");
        }
      }
      if(panel_identifier == "settings"){
        if (!$(".settingsCol").is(":visible")) {
          $(".popup").hide();
          $(".settingsCol").fadeIn();
          if (!$popup.is(":visible")) {
            $popup.fadeIn();
            $button.addClass("active");
          }
        }
        else{
          $(".settingsCol").hide();
          $button.removeClass("active");
        }
      }

      if ($popup.is(":visible") && (!$(".settingsCol").is(":visible") && (!$(".calculationsCol").is(":visible")))) {
        $popup.hide();
        $(".active").removeClass("active")
        ActivityShell.AdjustSplitPanelsOnCloseCustomPopup();
      }
      else{
        ActivityShell.AdjustSplitPanelsOnOpenCustomPopup();
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
      var deviceType = ActivityShell.DeviceType();
      if(deviceType=="mobile"){
        if (window.matchMedia("(orientation: landscape)").matches) {
          $("#bestviewed_popup_msg").show();
        }
        else{
          $("#bestviewed_popup_msg").hide();
        }
      }
    },
    IsIOSDevice: function(){
      if (/iPad|iPhone|iPod/.test(navigator.platform)) {
        return true;
      } else {
        return navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 2 &&
          /MacIntel/.test(navigator.platform);
      }
    },
    OnWindowResize: function(){
      var deviceType = this.DeviceType();
      if(deviceType == "desktop"){
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
    },
    InitToolTip: function(){
      $("button[data-toggle='tooltip']").tooltip({ boundary: 'window', container: $(".wrapper") })
    }
  }
})();

$(document).ready(function () {
  ActivityShell.Init();
});
document.ontouchmove = function(event){
  event.preventDefault();
}

$(window).bind('orientationchange', function () {
  this.setTimeout(function () {
    ActivityShell.OnOrientationChange();
  }, 200);
});

$(window).resize(function() {
  ActivityShell.OnWindowResize();
});

$(document).on("click", "#btn_launch", function (event) {
  ActivityShell.LaunchActivity();
});
/*Common Popup*/
$(document).on("click", "#btn_sheet", function (event) {
  ActivityShell.TogglePopup($(".popup.worksheet"),$(this));
});
$(document).on("click", "#btn_info", function (event) {
  ActivityShell.TogglePopup($(".popup.info"), $(this));
});
$(document).on("click", "#btn_procedure", function (event) {
  ActivityShell.TogglePopup($(".popup.procedure"),$(this));
});

$(document).on("click", ".btn-close-popup", function (event) {
  $(this).closest(".popup").hide();
  $(".active").removeClass("active")
  ActivityShell.AdjustSplitPanelsOnClosePopup($(this).closest(".popup"))
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
  else{
    //NM: $(".cust-popup.settings") is parent popup as for mobile 
    //Calculations popup is moved into settings popup.
    ActivityShell.ToggleCustomPopup($(".cust-popup.settings"), "calculations", $(this));
  }
});

$(document).on("click", "#btn_settings", function (event) {
  var deviceType = ActivityShell.DeviceType();
  if (deviceType != "mobile") {
  }
  else{
    ActivityShell.ToggleCustomPopup($(".cust-popup.settings"), "settings", $(this));
  }
});
/*
$(document).on("click", ".btn-close-cust-popup", function (event) {
  $(this).closest(".cust-popup").hide();
});
*/
/*End Common Popup Script */