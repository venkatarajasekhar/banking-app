const RED = "#d11c0c"
const GREEN = "#3aa812"

const LOGIN = 0;
const ACCOUNT = 1;
const DETAILS = 2;

var STATE = LOGIN;
generateAmounts();

$("#account-screen").hide(0);
$("#detail-screen").hide(0);
$("#login-screen").show(0);

$("#good-finger").draggable({
    revert: 'invalid'
});
$("#bad-finger").draggable({
    revert: function() {
        $("#fingerprint").css({
            "border": "5px solid red",
            "border-radius": "5px"
        });
        setTimeout(function() {
            $("#fingerprint").css({
                "border": "",
                "border-radius": "5px"
            });
        }, 3500);
        return true;
    }
});
$("#fingerprint-area").droppable({
    accept: '#good-finger',
    drop: function(event, ui) {
        var id = ui.draggable.attr("id");
        if ($("#good-finger").is($("#"+id))){
            $("#good-finger").hide(1000);
            setTimeout(gotoAccount, 1000);
        }
    }
});

$("#login-switch").click(gotoLogin);
$("#acc-switch").click(gotoAccount);
$("#details-switch").click(gotoDetail);
$("#logout").on('click', function() {
     window.location = "https://ca357.koltunm.com/";
});
$("#good-finger, #bad-finger").css('z-index','1000');
$("#login-button").click(function() {
    var regnum = $("#reg-input").val();
    var pac1 = $("#pac1").val();
    var pac3 = $("#pac3").val();
    var pac5 = $("#pac5").val();
    if (pac1 == 1 && pac3 == 2 && pac5 == 3 && regnum == 12345678) {
        gotoAccount();
    } else {
        $("input").css({
            "border": "2px solid red"
        });
        setTimeout(function() {
            $("input").css({
                "border": ""
            });
        }, 3500);
    }
});

var gotoLogin = function() {
    STATE = LOGIN;
    $("#login-screen").show(0);
}
var gotoAccount = function() {
    STATE = ACCOUNT;
    $("#account-screen").show(0);
    $("#fingers").hide(500);
}
var gotoDetail = function() {
    STATE = DETAILS;
    $("#detail-screen").show(0);
}

// Below function is absolutely horrible and should be fixed
function generateAmounts() {
    var current = $("#current-amount");
    var detBalance = $("#detail-balance");
    current.text(getRandomFloat(-50, 500).toFixed(2));
    detBalance.text(("\u20AC" + current.text()));
    if (Number(current.text()) < 0) {
        current.css("color", RED);
        detBalance.css("color", RED);
    } else {
        current.css("color", GREEN);
        detBalance.css("color", GREEN);
    }

    var saving = $("#saving-amount");
    saving.text(getRandomFloat(0, 2000).toFixed(2));
    if (Number(saving.text()) < 0) {
        saving.css("color", RED);
    } else {
        saving.css("color", GREEN);
    }

    var credit = $("#credit-amount");
    credit.text(getRandomFloat(-400, 0).toFixed(2));
    if (Number(credit.text()) < 0) {
        credit.css("color", RED);
    } else {
        console.log(credit.val());
        credit.css("color", GREEN);
    }

    var detOverDraft = $("#detail-overdraft");
    detOverDraft.text("\u20AC" + getRandomInt(3,10) * 100 + ".00");

    var trans1 = $("#trans1-amount");
    trans1.text(getRandomFloat(-100, 0).toFixed(2));
    if (Number(trans1.text()) < 0) {
        trans1.css("color", RED);
    } else {
        console.log(trans1.val());
        trans1.css("color", GREEN);
    }

    var trans2 = $("#trans2-amount");
    trans2.text(getRandomFloat(-50, 0).toFixed(2));
    if (Number(trans2.text()) < 0) {
        trans2.css("color", RED);
    } else {
        console.log(trans2.val());
        trans2.css("color", GREEN);
    }

    var trans3 = $("#trans3-amount");
    trans3.text(getRandomFloat(600, 1200).toFixed(2));
    if (Number(trans3.text()) < 0) {
        trans3.css("color", RED);
    } else {
        console.log(trans3.val());
        trans3.css("color", GREEN);
    }

    var trans4 = $("#trans4-amount");
    trans4.text(getRandomFloat(-100, 0).toFixed(2));
    if (Number(trans4.text()) < 0) {
        trans4.css("color", RED);
    } else {
        console.log(trans4.val());
        trans4.css("color", GREEN);
    }
}
function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min);
}
function getRandomInt(min, max) {
    return Math.floor(getRandomFloat(min,max));
}
