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

var SpringOscillation = (function () {
  return {
    LaunchActivity: function () {
      var graphWt = $(".graphContainer").width();
      var graphHt = $(".graphContainer").height();
      SpringOscillationChart.init([{ "x": 0, "y": 0 }], 380, 320);
      this.SetDivisionFactor();
    },
    SetDivisionFactor: function(){
      var scaleval = $(".springWeight").closest(".content-container").attr("scale");
      if(scaleval == undefined || scaleval == null || scaleval == ""){
        scaleval = 1;
      }
      else{
        scaleval = Number(scaleval)
      }
      weightInitialTop = $(".springWeight").position().top;
      springOrigHeight = $(".springWrapper").height();
      divisionfactor = (weightInitialTop / 2) / 60.0;
    }
  }
})();

$(".springWeight").draggable({
  axis: "y",
  cursor: "move",
  drag: function (event, ui) {
    ui.position.left = nm_initialLeft;
    springOscillationPaused = false;
    clearInterval(springAnnimInterval);
    springAnnimInterval = 0;
    var scaleval = $(".springWeight").closest(".content-container").attr("scale");
    if(scaleval == undefined || scaleval == null || scaleval == ""){
      scaleval = 1;
    }
    else{
      scaleval = Number(scaleval)
    }
    ui.position.top = ui.position.top / scaleval
    if (ui.position.top < Math.max((weightInitialTop / 2), ui.position.top)) {
      ui.position.top = Math.max((weightInitialTop / 2), ui.position.top);
    }
    if (ui.position.top > Math.min((weightInitialTop + (weightInitialTop / 2)), ui.position.top)) {
      ui.position.top = Math.min((weightInitialTop + (weightInitialTop / 2)), ui.position.top);
    }
    displacementMass = (ui.position.top - weightInitialTop)
    myAmplitude = displacementMass;
    var l_displacement = GetMaxValue(Math.abs(Number(toTrunc((displacementMass / divisionfactor), 3))))
    $(".weightDispText").text(l_displacement + "" + "cm").show();
    $(".springWrapper").css({ "height": springOrigHeight + (displacementMass) })
  },
  start: function (event, ui) {
    nm_initialLeft = ui.position.left;
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
  Xvalue = 0;
  Xvalue2 = 15;
  myAmplitude = (weightTopPos - weightInitialTop);
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

function OnResetButton() {
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
  myMass = Number($("#sliderMass").val());
  myElasticity = Number($("#sliderSpringConstant").val());
  $(".inputTimePeriod").text(toTrunc((2 * Math.PI) * Math.sqrt((myMass / myElasticity)), 1));
  myDamping = Number($("#sliderDamping").val());
  var weightTop = Number($(".springWeight").position().top)
  var position = weightTop - weightInitialTop
  myConstant = Math.sqrt(myElasticity / myMass);
  tmilli = (new Date().getTime() - myStartTime) - pausedMillSec;
  t = tmilli / 1000;
  var tPlot = tmilli - (timeMultiple * 15000);
  if (tPlot > 15000) {
    Xvalue = Xvalue + 15;
    Xvalue2 = Xvalue2 + 15;
    $(".x-axis-minlimit").text(Xvalue * 10);
    $(".x-axis-maxlimit").text(Xvalue2 * 10);
    timeMultiple++;
    fade = true;
    SpringOscillationChart.clearSeriesData();
    tPlot = tmilli - (timeMultiple * 15000);
  }
  var w = myConstant * t;
  var Dis = (myAmplitude * Math.cos(w)) * (Math.exp(-myDamping * t));
  $(".springWeight").css({ "top": weightInitialTop + Dis })
  $(".springWrapper").css({ "height": springOrigHeight + Dis })
  SpringOscillationChart.update({ x: (tPlot / 1000), y: (Number(Dis.toFixed(2)) / divisionfactor) * -1 })
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
  SpringOscillationChart.clearSeriesData();
  Xvalue = 0;
  Xvalue2 = 15;
  myStartTime = new Date().getTime();
  timeMultiple = 0;
  pausedMillSec = 0;

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
  
  if (springAnnimInterval > 0) {
    clearInterval(springAnnimInterval);
    springAnnimInterval = 0;
    springOscillationPaused = true
  }
  var scaleval = $(".springWeight").closest(".content-container").attr("scale");
    if(scaleval == undefined || scaleval == null || scaleval == ""){
      scaleval = 1;
    }
    else{
      scaleval = Number(scaleval)
    }
  var weightTop = Math.round(Number($(".springWeight").position().top)/scaleval);
  //var weightTop = Number(document.getElementById('springWeightDiv').style.top.replace("px", ""))
  var displacementMass = Number(weightTop - weightInitialTop);
  myAmplitude = displacementMass;
  var lval = Math.abs(Number(toTrunc((displacementMass / divisionfactor), 3)))
  $(".weightDispText").text(lval + "cm").show();
});
$(".springWeight").on('mouseup', function () {
  $(".weightDispText").hide();
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

$(document).on("click", "#btn_stop", function (event) {
  StopOscillation();
  RunningOscillation = false;
});
$(document).on("click", "#btn_reset", function (event) {
  OnResetButton();
});



