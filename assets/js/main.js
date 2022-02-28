var Activity = (function(){
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
      AdjustContainerHeight: function(){
        $(".wrapper").css({
          "height": window.innerHeight + "px"
        })
        if($(".container-so.main").is(":visible")){
          var headerHt = $(".container-so.main .exp_header").outerHeight();
          var footerHt = $(".container-so.main .exp_footer").outerHeight();
          $(".exp_body_header").css({ "height": headerHt + "px" });
          $(".exp_body_footer").css({ "height": footerHt + "px" });
          var mainHt = $(".container-so.main").height();
          $(".exp_body_content").css({ "height": (mainHt - (headerHt + footerHt)) })
        }
      }
    }
  })();

$(document).ready(function () {
    Activity.Init();
});

$(document).on("click", "#btn_launch", function (event) {
    Activity.LaunchActivity();
});
$(window).bind('orientationchange', function () {
  Activity.AdjustContainerHeight();
  ScreenSplitter.InitSplitter();
});