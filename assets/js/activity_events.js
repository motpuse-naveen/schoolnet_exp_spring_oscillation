
$(document).ready(function () {
    SpringOscillation.Init();
});

$(document).on("click", "#btn_launch", function (event) {
    SpringOscillation.LaunchActivity();
});

$(document).on("click", "#btn_stop", function (event) {
    //$(".popup").hide();
    StopOscillation();
    RunningOscillation = false;
});
$(document).on("click", "#btn_reset", function (event) {
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
});
$(document).on("click", "#btn_settings", function (event) {
    $(".popup").hide();
    $(".popup.settings").fadeIn();
});
$(document).on("click", "#btn_sheet", function (event) {
    $(".popup").hide();
    $(".popup.worksheet").fadeIn();
});
$(document).on("click", "#btn_calculations", function (event) {
    $(".popup").hide();
    $(".popup.calculations").fadeIn();
});
$(document).on("click", "#btn_info", function (event) {
    $(".popup").hide();
    $(".popup.info").fadeIn();
});
$(document).on("click", "#btn_procedure", function (event) {
    $(".popup").hide();
    $(".popup.procedure").fadeIn();
});
$(document).on("click", ".btn-close-popup", function (event) {
    $(this).closest(".popup").fadeOut();
});
