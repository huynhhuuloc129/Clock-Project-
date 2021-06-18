//-----------------------------STOP WATCH---------------------------------------------//
window.onload = activebutton_onclick;
currenttime();
var clock, cd;
var kiemtra = false; // Kiem tra clock dang start hay dang stop
function activebutton_onclick() {
    var button = document.getElementsByTagName("button");
    button[0].onclick = start;
    button[1].onclick = stop;
    button[2].onclick = reset;
    button[3].onclick = Countdown;
    button[4].onclick = currenttime1;
    button[5].onclick = contact;
}
//  Reset button after every click
function resetbutton(stt) {
    const arr = ["start", "stop"];
    var button;
    for (let i = 0; i < arr.length; i++) {
        button = document.getElementById(arr[i]);
        if (i == stt) {
            button.disabled = true;
            button.style.border = "5px solid rgb(73, 1, 0)";
        } else {
            button.disabled = false;
            button.style.border = "3px solid rgb(192, 17, 17)";
        }

    }
}
//  Convert Number to <p> tag
function passNumbertoP(hours, minutes, seconds) {

    var chours, cminutes, cseconds;
    const clockid = document.getElementById("clock");
    //
    chours = String(hours).padStart(2, '0');
    cminutes = String(minutes).padStart(2, '0');
    cseconds = String(seconds).padStart(2, '0');

    clockid.innerHTML = chours + ":" + cminutes + ":" + cseconds;
}
//  Button start
function start() {
    kiemtra = true;
    const clockid = document.getElementById("clock");
    var time = clockid.innerHTML;
    var hours = parseInt(time.slice(0, time.indexOf(":")));
    var minutes = parseInt(time.slice(time.indexOf(":") + 1, time.indexOf(":") + 3));
    var seconds = parseInt(time.slice(time.indexOf(":") + 4, time.indexOf(":") + 6));

    clock = setInterval(function () {
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }

        passNumbertoP(hours, minutes, seconds);
    }, 1000, seconds, hours, minutes);

    resetbutton(0);
}
//  Button stop
function stop() {
    kiemtra = false;
    clearInterval(clock);
    clearInterval(cd);
    resetbutton(1);
}
//---------------------------------Countdown button------------------------
changeOpacity(document.getElementById("currenttime"));
function changeOpacity(obj) {
    if (obj.style.opacity == 0) {
        obj.style.opacity = 1;
    } else if (obj.style.opacity == 1) obj.style.opacity = 0;
}
function Countdown() {
    var countdownbutton = document.getElementById("countdownbutton");
    changeOpacity(countdownbutton);

    stop();
    reset();
    for (let i = 0; i < 3; i++) {
        resetbutton(i);
    }

    //trigger the Enter key
    countdownbutton.addEventListener("keyup", keycd);
}
//               Enter key
function keycd(e) {

    if (e.key === "Enter") {
        e.preventDefault();
        countdownhandle();

        document.getElementById("countdownbutton").onkeyup = null;
    }
}
//  Lay gio phut giay tu the <input>
function countdownhandle() {
    const countdownbutton = document.getElementById("countdownbutton");
    var minutes = countdownbutton.value;

    countdownbutton.value = "";
    countdownbutton.style.opacity = "0";

    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    passNumbertoP(hours, minutes, 0);
    demnguoc();
}
//Kiem tra countdown da het chua
function checkOvercountdown(hours, minutes, seconds) {
    if (hours != 0 || minutes != 0 || seconds != 0) return false;
    else return true;
}
function demnguoc() {

    const clockid = document.getElementById("clock");
    var time = clockid.innerHTML;
    //lay gio, phut, giay, mili giay
    var hours = parseInt(time.slice(0, time.indexOf(":")));
    var minutes = parseInt(time.slice(time.indexOf(":") + 1, time.indexOf(":") + 3));
    var seconds = parseInt(time.slice(time.indexOf(":") + 4, time.indexOf(":") + 6));
    var kt;

    cd = setInterval(function () {
        kt = true;
        kt = checkOvercountdown(hours, minutes, seconds);

        if (seconds != 0 && kt == false) {
            seconds--;
        }
        else {
            kt = checkOvercountdown(hours, minutes, seconds);
            seconds = 59;
            if (minutes != 0 && kt == false) {

                minutes--;
            }
            else {
                kt = checkOvercountdown(hours, minutes, seconds);
                minutes = 59;
                if (hours != 0 && kt == false) {
                    hours--;

                }

            }
        }
        passNumbertoP(hours, minutes, seconds);
        if (kt) clearInterval(cd);
    }, 1000, seconds, hours, minutes);

}
//-----------------------------------------------------------------
//  Button reset
function reset() {
    clearInterval(cd);
    const clockid = document.getElementById("clock");
    if (kiemtra == true) {
        stop();
        document.getElementById("start").disabled = true;
        document.getElementById("start").style.border = "5px solid rgb(73, 1, 0)";

        clockid.innerHTML = "00:00:00";
        start();
    } else {
        clockid.innerHTML = "00:00:00";
    }
}
//===================================Digital Clock=========================================================
var time;

function currenttime() {
    time = setInterval(function () {
        var today = new Date();
        var n = today.toLocaleTimeString();
        document.getElementById("currenttime").innerHTML = n;
    }, 1000);
}
// change the opacity of the time on click
function currenttime1() {
    var id = document.getElementById("currenttime");
    changeOpacity(id);
}
//------------------CONTACT BUTTON-----------------------------
var contactcheck = true;
function contact() {
    let contactshow = document.getElementById("contactshow");
    let contactgmail = document.getElementById("gmail");
    if (contactcheck) {
        contactcheck = false;

        contactshow.innerHTML = "Facebook: https://www.facebook.com/100008060109767";
        contactgmail.innerHTML = "Gmail: huynhhuuloc129@gmail.com";

    } else {
        contactcheck = true;
        contactshow.innerHTML = "";
        contactgmail.innerHTML = "";
    }

}
