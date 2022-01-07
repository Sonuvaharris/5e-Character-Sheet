//global for tracking current page (used only by openPage
function openPage(page) {
    document.getElementsByClassName("page-active")[0].classList.remove("page-active");
    document.getElementsByClassName("page-link-active")[0].classList.remove("page-link-active");

    document.getElementById(page).classList.add("page-active");
    document.getElementById(page + "-link").classList.add("page-link-active");
}

function w3_open() {
    document.getElementById("sidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("sidebar").style.display = "none";
}

/*function show_menu_options() {
    document.getElementById("menu-options").style.display = "block";
}

function hide_menu_options() {
    document.getElementById("menu-options").style.display = "none";
}*/

$(document).ready(function() {
    $(".expando").click(function() {
        $(this).next().slideToggle();
    });
});

$(document).ready(function() {
    $("#scroll-to-top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });
});

document.addEventListener("visibilitychange", onchange => {
    console.log("hey you looked away")
});
