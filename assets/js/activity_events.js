


$(document).on("click", "#btn_stop", function (event) {
    //$(".popup").hide();
    StopOscillation();
    RunningOscillation = false;
});
$(document).on("click", "#btn_reset", function (event) {
    OnResetButton();
});
$(document).on("click", "#btn_settings", function (event) {
    $(".popup").hide();
    $(".forceSplit").removeClass("forceSplit");
    $(".forceSplit0").removeClass("forceSplit0");
    $(".forceSplit1").removeClass("forceSplit1");
    $(".forcePopup").removeClass("forcePopup");
    $(".popup.settings").fadeIn();
});
$(document).on("click", "#btn_sheet", function (event) {
    $(".popup").hide();
    $(".forceSplit").removeClass("forceSplit");
    $(".forceSplit0").removeClass("forceSplit0");
    $(".forceSplit1").removeClass("forceSplit1");
    $(".forcePopup").removeClass("forcePopup");
    $(".popup.worksheet").fadeIn();

});
$(document).on("click", "#btn_calculations", function (event) {
    $(".popup").hide();
    $(".popup.calculations").fadeIn();
    if (IsDesktop) {
        $("#split-main").addClass("forceSplit")
        $("#split-0").addClass("forceSplit0")
        $("#split-1").addClass("forceSplit1")
        $(".popup.calculations").addClass("forcePopup")
    }
});
$(document).on("click", "#btn_info", function (event) {
    $(".popup").hide();
    $(".popup.info").fadeIn();
    if (IsDesktop) {
        $("#split-main").addClass("forceSplit")
        $("#split-0").addClass("forceSplit0")
        $("#split-1").addClass("forceSplit1")
        $(".popup.info").addClass("forcePopup")
    }
});
$(document).on("click", "#btn_procedure", function (event) {
    $(".popup").hide();
    $(".popup.procedure").fadeIn();
    if (IsDesktop) {
        $("#split-main").addClass("forceSplit");
        $("#split-0").addClass("forceSplit0");
        $("#split-1").addClass("forceSplit1");
        $(".popup.procedure").addClass("forcePopup");
    }
});
$(document).on("click", ".btn-close-popup", function (event) {
    $(this).closest(".popup").fadeOut();
    $(".forceSplit").removeClass("forceSplit");
    $(".forceSplit0").removeClass("forceSplit0");
    $(".forceSplit1").removeClass("forceSplit1");
    $(".forcePopup").removeClass("forcePopup");
});

//window.addEventListener("orientationchange", function(event) {
$(window).bind('orientationchange', function () {
    
    this.setTimeout(function () {
        $(".wrapper").css({
            "height": screen.availHeight + "px"
        })
        var headerHt = $(".container-so.main .exp_header").outerHeight();
        var footerHt = $(".container-so.main .exp_footer").outerHeight();
        $(".exp_body_header").css({ "height": headerHt + "px" });
        $(".exp_body_footer").css({ "height": footerHt + "px" });
        var mainHt = $(".container-so.main").height();
        $(".exp_body_content").css({ "height": (mainHt - (headerHt + footerHt)) })
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (deviceWidth < 990) {
            $(".gutter.gutter-vertical").remove();
            split_instance = Split(['#split-0', '#split-1'], {
                sizes: [47, 53],
                direction: 'vertical',
                gutterSize: 1,
                onDrag: function (sizes) {
                    //console.log($("#split-0").height() + " : " + $("#split-1").height())
                    var split0_ht = Number($("#split-0").height());
                    var split0_orig_ht = Number($("#split-0").attr("orig-ht"));
                    var split1_ht = Number($("#split-1").height());
                    var split1_orig_ht = Number($("#split-1").attr("orig-ht"));
                    var sp0perc = (split0_ht - split0_orig_ht) / split0_orig_ht * 100;
                    var sp1perc = (split1_ht - split1_orig_ht) / split1_orig_ht * 100;
                    console.log(sp0perc + " : " + sp1perc)
                    $(".springCanvas").css({ "zoom": (100 + sp0perc) + "%" });
                    //$(".graphWrapper").css({ "zoom": (100 + sp1perc) + "%" });
                    var sp0scale = (100 + sp0perc) / 100;
                    var sp1scale = (100 + sp1perc) / 100;
                    //$(".springCanvas").css({ "zoom": zoomperc + "%" });
                    //$(".graphWrapper").css({ "zoom": zoomperc + "%" });
                    //$(".spingContainer").css({"transform":"scale(" + sp0scale + ")", "transform-origin": "top"})
                    $(".graphContainer").css({ "transform": "scale(" + sp1scale + ")", "transform-origin": "left top" })
                },
            })
        }
        //$("#split-0").attr("orig-ht", $("#split-0").height());
        //$("#split-1").attr("orig-ht", $("#split-1").height());
        //weightInitialTop = $(".springWeight").position().top;
        //springOrigHeight = $(".springWrapper").height();
        //divisionfactor = (weightInitialTop / 2) / 60.0;

    }, 200);
    
});

