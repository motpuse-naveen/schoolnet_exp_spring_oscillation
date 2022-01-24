var RunningOscillation = false;
var springOscillationPaused = false;
var weightInitialTop = 0;
var springOrigHeight = 0;
var displacementMass = 0;
var divisionfactor = 0;

var myMass = 0.5;
var myElasticity = 3;
var myConstant = 3;
//var w;
var myDamping = 0;
var myStartTime = new Date().getTime();
var t = 0;
var k = 0;
var fade = true;
var fade2 = true;
var timeMultiple = 0;
var Xvalue = 0;
var Xvalue2 = 15;
var myAmplitude = 0;
var springAnnimInterval = 0;

var tabSwitched = false;
var pausedMillSec = 0;
var pausedStartDate;
var IsDesktop = false;
var split_instance;

var SpringOscillation = (function () {
  return {
    Init: function () {
      $(".wrapper").css({
        "height": window.innerHeight + "px"
      })
    },
    LaunchActivity: function () {
      $(".container-so.launch").fadeOut();
      $(".container-so.main").show();

      var headerHt = $(".container-so.main .exp_header").outerHeight();
      var footerHt = $(".container-so.main .exp_footer").outerHeight();
      $(".exp_body_header").css({ "height": headerHt + "px" });
      $(".exp_body_footer").css({ "height": footerHt + "px" });
      var mainHt = $(".container-so.main").height();
      $(".exp_body_content").css({ "height": (mainHt - (headerHt + footerHt)) })
      var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      //if (deviceWidth < 540) {
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
            //console.log(sp0perc + " : " + sp1perc)
            var sp0scale = (100 + sp0perc) / 100;
            var sp1scale = (100 + sp1perc) / 100;
            $(".springCanvas").css({ "zoom": (100 + sp0perc) + "%" });
            //$(".graphWrapper").css({ "zoom": zoomperc + "%" });
            //$(".spingContainer").css({"transform":"scale(" + sp0scale + ")", "transform-origin": "top"})
            $(".graphContainer").css({ "transform": "scale(" + sp1scale + ")", "transform-origin": "left top" })

          },
        })
        $("#split-0").attr("orig-ht", $("#split-0").height());
        $("#split-1").attr("orig-ht", $("#split-1").height());
      }
      else {
        IsDesktop = true;
      }
      var graphWt = $(".graphContainer").width();
      var graphHt = $(".graphContainer").height();
      SpringOscillationChart.init([{ "x": 0, "y": 0 }], 380, 320);
      weightInitialTop = $(".springWeight").position().top;
      springOrigHeight = $(".springWrapper").height();
      divisionfactor = (weightInitialTop / 2) / 60.0;
    },
    DownloadSheet: function () {
      var mylink = document.getElementById("linksheet");
      mylink.setAttribute("href", "assets/docs/oscillations_word.doc");
      mylink.click();
    }
  }
})();

$(".springWeight").draggable({
  axis: "y",
  cursor: "move",
  drag: function (event, ui) {
    //console.log(ui.position.top + ", " + Math.min(112, ui.position.top))
    //console.log(ui.position.top + ", " + Math.min(352, ui.position.top))
    springOscillationPaused = false;
    clearInterval(springAnnimInterval);
    springAnnimInterval = 0;
    //var scaleval = 1//Number($("#bk6ch15ss2").attr("data-scaley"))
    //ui.position.top = ui.position.top / scaleval
    if (ui.position.top < Math.max((weightInitialTop / 2), ui.position.top)) {
      ui.position.top = Math.max((weightInitialTop / 2), ui.position.top);
      //$(".springWeight").css({"top":ui.position.top})
    }
    if (ui.position.top > Math.min((weightInitialTop + (weightInitialTop / 2)), ui.position.top)) {
      ui.position.top = Math.min((weightInitialTop + (weightInitialTop / 2)), ui.position.top);
    }

    //displacementMass = ui.position.top;
    //var weightTop = Number(document.getElementById('springWeightDiv').style.top.replace("px",""))
    displacementMass = (ui.position.top - weightInitialTop)
    myAmplitude = displacementMass;
    var l_displacement = GetMaxValue(Math.abs(Number(toTrunc((displacementMass / divisionfactor), 3))))
    //
    $(".weightDispText").text(l_displacement + "" + "cm").show();
    //
    //Display_mc.Amp_txt.text = (displacementMass/2);
    //
    //trace("displacementMass = "+displacementMass);
    $(".springWrapper").css({ "height": springOrigHeight + (displacementMass) })
  },
  start: function (event, ui) {
    //$(this).addClass('my_class');
    //setTimeout(function(){ $(".springWeight").css({"top": "232px"})},0)
    //$(".weightDispText").text("0cm").show();
    //StopOscillation();
    //ResetOscillation();
  },
  stop: function (event, ui) {
    SpringOscillationChart.clearSeriesData();
    RunningOscillation = true;
    DisplayValuesInCalcPopup();
    StartOscillation(ui.position.top)
  }
});

function StartOscillation(weightTopPos) {
  springOscillationPaused = false;
  //$(this).removeClass('my_class');
  Xvalue = 0;
  Xvalue2 = 15;
  myAmplitude = (weightTopPos - weightInitialTop);
  //myStartTime = getTimer();
  myStartTime = new Date().getTime();
  timeMultiple = 0;
  pausedMillSec = 0;
  if (Xvalue * 10 == 0) {
    $(".x-axis-minlimit").text("00")
  }
  else {
    $(".x-axis-minlimit").text(Xvalue * 10)
  }
  $(".x-axis-maxlimit").text(Xvalue2 * 10)
  //NM: hide drag label
  $(".weightDispText").text("0cm").hide()
  //$(this).draggable('disable')
  $(".stopDiv").show();
  //console.log(myAmplitude);
  SpringOscillationChart.update({ x: 0, y: myAmplitude / divisionfactor * -1 })
  springAnnimInterval = setInterval(OnSpringAnnimation, 100)
}
function ResetOscillation() {
  StopOscillation();
  myStartTime = new Date().getTime();
  t = 0;
  k = 0;
  fade = true;
  fade2 = true;
  timeMultiple = 0;
  Xvalue = 0;
  Xvalue2 = 15;
  myAmplitude = 0;
  pausedMillSec = 0;
  SpringOscillationChart.clearSeriesData();
  if (Xvalue * 10 == 0) {
    $(".x-axis-minlimit").text("00")
  }
  else {
    $(".x-axis-minlimit").text(Xvalue * 10)
  }

  $(".x-axis-maxlimit").text(Xvalue2 * 10)
}

function OnResetButton(){
  myMass = 0.5;
  myElasticity = 3;
  myConstant = 3;
  myDamping = 0;
  ResetOscillation();
  $("#sliderMass").val(0.5).css({ "background-size": "44.44% 100%" })
  $(".inputMass").text(0.5);

  $("#sliderSpringConstant").val(3).css({ "background-size": "50% 100%" })
  $(".inputSpringConstant").text(3)

  $("#sliderDamping").val(0).css({ "background-size": "0 100%" });
  $(".inputDamping").text(0);

  $(".inputTimePeriod").text("")
  $(".springWeight").draggable('enable')

  $(".resetDiv").hide();
  $(".stopDiv").hide();

  ResetPopupValues();
  RunningOscillation = false;
  $("text.highcharts-axis-title").attr("x", 35);
}

function DisplayValuesInCalcPopup() {
  $(".txtamplitude").text(Math.abs(Number(toTrunc(myAmplitude / divisionfactor, 3))))
  $(".txtmass").text(myMass)
  $(".txtspringconst").text($("#sliderSpringConstant").val())
  var tplocal = toTrunc((2 * Math.PI) * Math.sqrt((myMass / myElasticity)), 2);
  $(".txttimeperiod").text(tplocal)
}
function ResetPopupValues() {
  $(".txtamplitude").text(Math.abs(Number(toTrunc(myAmplitude / divisionfactor, 3))))
  $(".txtmass").text(myMass)
  $(".txtspringconst").text($("#sliderSpringConstant").val())
  $(".txttimeperiod").text("")
}

function OnSpringAnnimation() {
  //debugger;
  //trace("value="+cVolml_mc.m1);
  myMass = Number($("#sliderMass").val());
  myElasticity = Number($("#sliderSpringConstant").val());
  $(".inputTimePeriod").text(toTrunc((2 * Math.PI) * Math.sqrt((myMass / myElasticity)), 1));
  //
  //_root.TimePeriod_txt.text = Display_mc.timeperiod_txt.text;
  //
  //myDamping = T1_mc.T1;
  myDamping = Number($("#sliderDamping").val());
  //position = Mass_mc.block_mc._y;
  //var position = $(".springWeight").position().top - weightInitialTop
  //var weightTop = Number(document.getElementById('springWeightDiv').style.top.replace("px", ""))
  var weightTop = Number($(".springWeight").position().top)
  var position = weightTop - weightInitialTop
  myConstant = Math.sqrt(myElasticity / myMass);
  tmilli = (new Date().getTime() - myStartTime) - pausedMillSec;
  t = tmilli / 1000;
  var tPlot = tmilli - (timeMultiple * 15000);
  if (tPlot > 15000) {
    //graph_num.num1.text = graph_num.num1+30;
    //graph_num.num2.text = graph_num.num2+30;
    Xvalue = Xvalue + 15;
    Xvalue2 = Xvalue2 + 15;
    //NM: Note below line
    //graph_num.num1.text = "(" + Xvalue + "," + 0 + ")";
    //graph_num.num2.text = "(" + Xvalue2 + "," + 0 + ")";
    $(".x-axis-minlimit").text(Xvalue * 10)
    $(".x-axis-maxlimit").text(Xvalue2 * 10)
    timeMultiple++
    //k = 0;
    fade = true;
    //graph_mc.clear();
    SpringOscillationChart.clearSeriesData();
    tPlot = tmilli - (timeMultiple * 15000);
    //trace("kavlue="+k);
  }
  //trace("Time = " + t);

  var w = myConstant * t;
  var Dis = (myAmplitude * Math.cos(w)) * (Math.exp(-myDamping * t));
  //console.log("Dis" + Dis)
  //Mass_mc.block_mc._y = Dis;
  $(".springWeight").css({ "top": weightInitialTop + Dis })
  //displacementMass = Mass_mc.block_mc._y;
  //displacementMass = $(".springWeight").position().top;
  //displacementMass = ($(".springWeight").position().top - weightInitialTop)
  //trace("displacementMass = " + displacementMass);
  //spring_mc._height = (massAnchor + displacementMass) - offsetY;
  $(".springWrapper").css({ "height": springOrigHeight + Dis })
  //spring_mc._height = 200+Mass_mc.block_mc._y;
  //console.log((tPlot / 1000) + ", " + Number(Dis.toFixed(2)) / 2)
  SpringOscillationChart.update({ x: (tPlot / 1000), y: (Number(Dis.toFixed(2)) / divisionfactor) * -1 })

  //if (k < 300) {
  //DrawLine(position, tPlot / 50, Dis);
  //trace(tPlot);
  //k++;
  //trace("kavlue="+k);
  //}
}
function StopOscillation() {
  clearInterval(springAnnimInterval);
  springAnnimInterval = 0;
  $(".springWrapper").css({ "height": springOrigHeight })
  $(".springWeight").css({ "top": weightInitialTop })
}

function toTrunc(value, n) {
  x = (value.toString() + ".0").split(".");
  return parseFloat(x[0] + "." + x[1].substr(0, n));
}

function GetMaxValue(p_value) {
  if (Number(p_value.toFixed(2)) == 60 || p_value == 60) {
    p_value = 60;
  }
  return p_value;
}
const rangeInputs = document.querySelectorAll('input[type="range"]')
rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})
function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  }
  const min = target.min
  const max = target.max
  const val = target.value
  const name = target.name
  if (name == "mass") { myMass = val; $(".inputMass").text(val); }
  if (name == "springconstant") { myElasticity = val; $(".inputSpringConstant").text(val); }
  if (name == "damping") { myDamping = val; $(".inputDamping").text(val); }

  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
  if (RunningOscillation) {
    DisplayValuesInCalcPopup();
  }
}
$(".springWeight").on('mousedown', function () {
  //var displacementMass = $(".springWeight").position().top - weightInitialTop
  if (springAnnimInterval > 0) {
    clearInterval(springAnnimInterval);
    springAnnimInterval = 0;
    springOscillationPaused = true
  }
  //var weightTop = Number(document.getElementById('springWeightDiv').style.top.replace("px", ""))
  var weightTop = Number($(".springWeight").position().top)
  var displacementMass = weightTop - weightInitialTop
  myAmplitude = displacementMass;
  var lval = Math.abs(Number(toTrunc((displacementMass / divisionfactor), 3)))
  $(".weightDispText").text(lval + "cm").show();
});
$(".springWeight").on('mouseup', function () {
  $(".weightDispText").hide();
  //SpringOscillationChart.update({ x: 0, y: myAmplitude / divisionfactor * -1 })
  //springAnnimInterval = setInterval(OnSpringAnnimation, 100)
  if (springOscillationPaused) {
    SpringOscillationChart.clearSeriesData();
    RunningOscillation = true;
    DisplayValuesInCalcPopup();
    StartOscillation($(".springWeight").position().top)
  }
  springOscillationPaused = false;

});
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    if (!tabSwitched) {
      if (springAnnimInterval > 0) {
        clearInterval(springAnnimInterval)
        tabSwitched = true;
        pausedStartDate = new Date().getTime();
      }
    }
  }
  else {
    if (tabSwitched) {
      springAnnimInterval = setInterval(OnSpringAnnimation, 100);
      tabSwitched = false;
      pausedMillSec += (new Date().getTime() - pausedStartDate)
    }
  }
});

