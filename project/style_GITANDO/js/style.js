$(document).ready(function () {
    // search
    $("#search , #x").click(function () {
        $("#overlay").toggleClass("visibile")
        $(".nav-link").toggleClass("hide-link")
        $(".search-form").toggleClass("active")
        $("#search , #x").toggleClass("d-none")
        $("#sx").toggleClass("sx")
        $("#dx").toggleClass("dx")
    });
    // dropdown
    $(".navbar-toggler").click(function () {
        $("ul#vw > li").toggleClass("toggler-chapter-design")
        $("header").toggleClass("pb-5")
        $("#over").toggleClass("sx , over")
        $("#under").toggleClass("dx , under")
    });
    // slider to left
    $("#leftArrow").click(function () {
        $("#rightArrow").removeClass("d-none , slideout-r");
        $("#leftArrow").addClass("d-none , slideout-l");
        $("aside").stop().animate({
            scrollLeft: "+=400px"
        }, 1600);
        return false;
    });
    // slider to right
    $("#rightArrow").click(function () {
        $("#leftArrow").removeClass("d-none , slideout-l");
        $("#rightArrow").addClass("d-none , slideout-r");
        $("aside").stop().animate({
            scrollLeft: "-=400px"
        }, 1600);
        return false;
    });
    // scroll to hide/view element
    $(window).scroll(function () {
        if ($(this).scrollTop() > 171) {
            $("aside").fadeOut();
            $("#navigazione").removeClass("d-none");
            $("#navigazione").fadeIn();
        } else {
            $("aside").fadeIn();
            $("#navigazione").addClass("d-none");
            $("#navigazione").fadeOut();
        }
    });
    //filtri mediante tag/label
    $(".btn-tag").click(function (eventObject) {
        var tag = $(this).html();
        var totalPanel = document.getElementsByClassName("filtri-tag").length;
        eventObject.preventDefault();
        for (var x = 1; x <= totalPanel; x++) {
            console.log("json: " + JSON.stringify($("#gita" + x).html()));
            if (JSON.stringify($("#gita" + x).html()).indexOf(tag) >= 0) {
                $("#gita" + x).hide();
                $("#gita" + x).fadeIn();
            } else {
                $("#gita" + x).hide();
            };
        }
    });
    //slider
    var getActiveSlideIndex = function () {
        return $("#productSlider .active").index("#productSlider .carousel-item");
    };
    var slider = function (IndexNumber) {
        $(".slider .image")
            .removeClass("active")
            .eq(IndexNumber)
            .addClass("active");
    };
    slider(getActiveSlideIndex());
    $("#productSlider").on("slid.bs.carousel", function () {
        slider(getActiveSlideIndex());
    });
})
