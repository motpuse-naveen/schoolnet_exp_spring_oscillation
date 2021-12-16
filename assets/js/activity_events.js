
$(document).ready(function () {
    SpringOscillation.Init();
});

$(document).on("click", "#btn_launch", function (event) {
    SpringOscillation.LaunchActivity();
});

$(document).on("click", "#btn_stop", function (event) {
    $(".popup").hide();
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
