/* Mapping array from integer value to text */
const c_ledModeStringArray = ["One Color", "Rainbow Pixel", "Rainbow Word"];
const c_functionModeStringArray = ["Word Clock", "Fill Color", "Rain"];
const c_alarmTypeStringArray = ["Beer", "Whisky", "Bed", "Sex", "Schnaps", "Wine"];


const MsgId = {
    eBrightness: 0,
    eBrightnessAutoOffset: 1,
    eColor: 2,
    eTransitionColor: 3,
    eLedMode: 4,
    eFunction: 5,
    eVersionFw: 6,
    eVersionCfg: 7,
    eVersionBuild: 8,
    eActualHostname: 9,
    eCfgStored: 10,
    eIcsReceived: 11,
    eIcsThreshold: 12,
    eAlarmEnabled: 13,
    eAlarmColor: 14,
    eAlarmCount: 15,
    eAlarmListStart: 16
}

const ResponseId =
{
    eResponseNotRequested: 0,
    eResponseOk: 1,
    eResponseError: 2
}

var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
window.addEventListener('load', onload);

function onload(event) {
    initWebSocket();
    configurationCard.style.display = "none";

}

function getValues() {
    websocket.send("getValues");
}

function initWebSocket() {
    console.log('Trying to open a WebSocket connection…');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {
    console.log('Connection opened');
    getValues();
}

function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}

function retnum(str) {
    var num = str.replace(/[^0-9]/g, '');
    return parseInt(num, 10);
}

var fileCount = 0;
var fileCountMax = 0;

function readFile(element) {

    const c_files = element.files;
    fileCountMax = c_files.length;
    var array = [];
    var idx = 0;

    Object.keys(c_files).forEach(i => {
        if (i == 0) {
            websocket.send("sm");
        }
        const c_file = c_files[i];
        const c_reader = new FileReader();

        c_reader.onload = (element) => {
            array = element.target.result.split("\n");
        }
        c_reader.onloadend = (element) => {
            fileCount = fileCount + 1;
            var dayRead;
            var monthRead;
            var yearRead;
            var actualData = new Date();
            const c_yearActual = actualData.getFullYear() - 2000;
            const c_monthActual = actualData.getMonth() + 1;

            var icsOrderStructure = "";
            var summary = "";

            for (var i = 0; i < array.length; i++) {
                if (idx < 100) {
                    /* Extract ics order */
                    if ((array[i].includes("DTSTART") || array[i].includes("SUMMARY")) && (icsOrderStructure == "")) {
                        if (array[i].includes("DTSTART")) {
                            icsOrderStructure = "normal";
                        }
                        else {
                            icsOrderStructure = "inverse";
                        }
                    }

                    if (icsOrderStructure == "normal") {
                        /* Extranct date */
                        if (array[i].includes("DTSTART")) {
                            yearRead = retnum(array[i]).toString().substring(2, 4);
                            monthRead = retnum(array[i]).toString().substring(4, 6);
                            dayRead = retnum(array[i]).toString().substring(6, 8);
                        }
                        else if (c_yearActual == yearRead) {
                            if (c_monthActual <= monthRead) {
                                if (array[i].includes("SUMMARY")) {
                                    if (array[i].includes("Papier")) {
                                        websocket.send("1m" + yearRead + monthRead + dayRead + "|p");
                                        idx++;
                                    }
                                    if (array[i].includes("Bio")) {
                                        websocket.send("1m" + yearRead + monthRead + dayRead + "|b");
                                        idx++;
                                    }
                                    if (array[i].includes("Rest")) {
                                        websocket.send("1m" + yearRead + monthRead + dayRead + "|r");
                                        idx++;
                                    }
                                    if (array[i].includes("Gelb")) {
                                        websocket.send("1m" + yearRead + monthRead + dayRead + "|g");
                                        idx++;
                                    }
                                }
                            }
                        }
                        else if (c_yearActual < yearRead) {
                            /* Future year entries */
                            if (array[i].includes("SUMMARY")) {
                                if (array[i].includes("Papier")) {
                                    websocket.send("1m" + yearRead + monthRead + dayRead + "|p");
                                    idx++;
                                }
                                if (array[i].includes("Bio")) {
                                    websocket.send("1m" + yearRead + monthRead + dayRead + "|b");
                                    idx++;
                                }
                                if (array[i].includes("Rest")) {
                                    websocket.send("1m" + yearRead + monthRead + dayRead + "|r");
                                    idx++;
                                }
                                if (array[i].includes("Gelb")) {
                                    websocket.send("1m" + yearRead + monthRead + dayRead + "|g");
                                    idx++;
                                }
                            }
                        }
                    }
                    else {
                        if (array[i].includes("SUMMARY")) {
                            if (array[i].includes("Papier")) {
                                summary = "|p";
                            }
                            if (array[i].includes("Bio")) {
                                summary = "|b";
                            }
                            if (array[i].includes("Rest")) {
                                summary = "|r";
                            }
                            if (array[i].includes("Gelb")) {
                                summary = "|g";
                            }
                        }
                        else if ((array[i].includes("DTSTART")) && (summary != "")) {
                            yearRead = retnum(array[i]).toString().substring(2, 4);
                            monthRead = retnum(array[i]).toString().substring(4, 6);
                            dayRead = retnum(array[i]).toString().substring(6, 8);
                            if (c_yearActual == yearRead) {
                                /* Actual year */
                                if (c_monthActual <= monthRead) {
                                    websocket.send("1m" + yearRead + monthRead + dayRead + summary);
                                    idx++;
                                }
                            }
                            else if (c_yearActual < yearRead) {
                                /* Future year */
                                websocket.send("1m" + yearRead + monthRead + dayRead + summary);
                                idx++;
                            }
                            summary = "";
                        }
                    }
                }
            }

            if (fileCountMax == fileCount) {
                fileCount = 0;
                element.value = null;
                if (idx == 0) {
                    alert("No valid information found in given file.");
                }
                else if (idx >= 100) {
                    websocket.send("em" + idx);
                    alert("More than 100 entries in given file, only first 100 entries will be transmitted.Transmission and storing will take some time, wait for confirmation.");
                }
                else {
                    websocket.send("em" + idx);
                    if (idx == 1) {
                        alert(idx + " entry is transmitted.Transmission and storing will take some time, wait for confirmation.");
                    }
                    else {
                        alert(idx + " entries will be transmitted.Transmission and storing will take some time, wait for confirmation.");
                    }
                }
            }

        }
        c_reader.readAsText(c_file);
    })

};


function updateSlider(element) {
    var sliderNumber = element.id.charAt(element.id.length - 1);

    var sliderValue = document.getElementById(element.id).value;
    websocket.send(sliderNumber + "s" + sliderValue.toString());
}

function updateButton(element) {
    var buttonNumber = element.id.charAt(element.id.length - 1);

    if (buttonNumber == 1) {
        alert("Default configuration loaded.");
    }
    else {
        alert("Request send to store as default configuration.");
    }
    websocket.send(buttonNumber + "b" + buttonNumber.toString());
}

function deleteICS(element) {
    websocket.send("cm");
    alert("ICS data deleted.")
}

function updateColor(element) {
    var colorNumber = element.id.charAt(element.id.length - 1);
    var colorValue = document.getElementById(element.id).value;
    console.log(colorValue);
    websocket.send(colorNumber + "c" + colorValue.toString());
}

function updateColorMode(element) {
    var menuValue = document.getElementById(element.id).value;

    var menuValueNum = 0;

    for (var i = 0; i < c_ledModeStringArray.length; i++) {
        if (menuValue == c_ledModeStringArray[i]) {
            menuValueNum = i;
            break;
        }
    }

    if (menuValueNum == 0) {
        colorCard.style.display = "block"
    }
    else {
        colorCard.style.display = "none"
    }

    console.log(menuValue);
    websocket.send("1d" + menuValueNum.toString());
    closeOpenDropdownMenu();
}

function updateFunction(element) {
    var functionValue = document.getElementById(element.id).value;

    var functionValueNum = 0;

    for (var i = 0; i < c_functionModeStringArray.length; i++) {
        if (functionValue == c_functionModeStringArray[i]) {
            functionValueNum = i;
            break;
        }
    }

    console.log(functionValue);
    websocket.send("1f" + functionValueNum.toString());
    closeOpenDropdownMenu();
}

function updateToggleAlarm(element) {
    if (element.checked) {
        alarmCard.style.display = "block"
        websocket.send("1t1");
    }
    else {
        alarmCard.style.display = "none"
        websocket.send("1t0");
    }
}

function updateToggleAdvancedConfiguration(element) {
    if (element.checked) {
        configurationCard.style.display = "block"
    }
    else {
        configurationCard.style.display = "none"
    }
}

function sendAlarmList() {

    /* Get listbox item */
    var listbox = document.getElementById("alarmListbox");
    /* Send new list signal */
    websocket.send("nl");
    /* Send all list items */
    for (var i = 0; i < listbox.options.length; i++) {
        websocket.send("1l" + "|" + listbox.options[i].text.substring(0, 2) + listbox.options[i].text.substring(3, 5) + "|" + listbox.options[i].value);
    }
    /* Send finish list signal */
    websocket.send("fl" + listbox.options.length);
}

function setAlarm(element) {
    /* Extract time value */
    var timeValue = document.getElementById("timePicker").value;
    /* Extract alarm id */
    var alarmId = document.getElementById("alarmList").value;

    /* Get listbox item */
    var listbox = document.getElementById("alarmListbox");

    /* Check maximum possible alarms */
    if (listbox.options.length >= listbox.size) {
        alert("Maximum alarms reached, please delete other alarms first.");
        return false;
    }

    /* Check if alarm already exists at given time */
    for (var i = 0; i < listbox.options.length; i++) {
        var text = listbox.options[i].text;
        if (text.substring(0, 5) == timeValue) {
            alert("Alarm at this time already exists. Delete the alarm before setting a new one.");
            return false;
        }
    }

    /* Create new alarm item */
    var opt = document.createElement("option");
    opt.text = timeValue;
    opt.value = alarmId;
    listbox.add(opt);

    /* Sort alarms */
    var array = [listbox.size];
    var arrayValue = [listbox.size];

    /* Copy values to temporary array */
    for (var i = 0; i < listbox.options.length; i++) {
        /* Extract only time information */
        array[i] = listbox.options[i].text.substring(0, 6);
        arrayValue[i] = listbox.options[i].value;

    }

    /* Sort values */
    var tempText;
    var tempValue;

    /* Insert sort algorithm */
    for (var i = 0; i < array.length; i++) {
        for (var j = array.length - 1; j > 0; j--) {
            if (array[j - 1] > array[j]) {
                tempText = array[j];
                array[j] = array[j - 1];
                array[j - 1] = tempText;

                tempValue = arrayValue[j];
                arrayValue[j] = arrayValue[j - 1];
                arrayValue[j - 1] = tempValue;
            }
        }
    }

    /* Write sorted values back to listbox */
    for (var i = 0; i < listbox.options.length; i++) {
        listbox.options[i].text = array[i] + " [" + c_alarmTypeStringArray[arrayValue[i]] + "]";
        listbox.options[i].value = arrayValue[i];
    }
    /* Send updated listbox items */
    sendAlarmList();

}

function deleteAlarm(element) {

    /* Get listbox item */
    var listbox = document.getElementById("alarmListbox");
    /* Check if alarm exists to remove */
    if (listbox.options.length == 0) {
        alert("No alarm to remove.");
        return false;
    }

    /* Remove selected items from the listbox */
    for (var i = listbox.options.length - 1; i >= 0; i--) {
        if (listbox.options[i].selected == true) {
            listbox.remove(i);
        }
    }
    /* Send updated listbox items */
    sendAlarmList();
}

function onMessage(event) {

    console.log(event.data);
    var myObj = JSON.parse(event.data);
    var keys = Object.keys(myObj);

    /* Set brightness */
    document.getElementById("slider1").value = myObj[keys[MsgId.eBrightness]];
    if (myObj[keys[MsgId.eBrightness]] == 0) {
        document.getElementById("sliderValue1").innerHTML = "[auto]";
    }
    else {
        document.getElementById("sliderValue1").innerHTML = "[" + myObj[keys[MsgId.eBrightness]] + "%]";
    }

    /* Set brightnessAutoMin */
    document.getElementById("slider4").value = myObj[keys[MsgId.eBrightnessAutoOffset]];
    document.getElementById("sliderValue4").innerHTML = "[" + myObj[keys[MsgId.eBrightnessAutoOffset]] + "%]";

    /* Get mode */
    var mode = parseInt(myObj[keys[MsgId.eLedMode]]);

    /* Set led mode to button text */
    document.getElementById("ledMode").innerHTML = "Mode [" + c_ledModeStringArray[mode] + "]"

    /* Hide color picker if not needed in mode */
    if (mode == 0) {
        document.getElementById("colorCard").style.display = "block"
    }
    else {
        document.getElementById("colorCard").style.display = "none"
    }

    /* Convert color value and show in picker / overview */
    var test = "000000" + parseInt(myObj[keys[MsgId.eColor]]).toString(16).toUpperCase();
    var test2 = "#" + test.substring(test.length - 6);
    document.getElementById("color1").value = test2;
    document.getElementById("colorValue1").innerHTML = "[" + test2 + "]";


    /* Convert color value and show in picker / overview */
    var testT = "000000" + parseInt(myObj[keys[MsgId.eTransitionColor]]).toString(16).toUpperCase();
    var testT2 = "#" + testT.substring(testT.length - 6);
    document.getElementById("color3").value = testT2;
    document.getElementById("colorValue3").innerHTML = "[" + testT2 + "]";

    /* Set function to overview */
    document.getElementById("functionMode").innerHTML = "Function [" + c_functionModeStringArray[parseInt(myObj[keys[MsgId.eFunction]])] + "]";

    var configStored = parseInt(myObj[keys[MsgId.eCfgStored]]);

    if (configStored == ResponseId.eResponseOk) {
        var actualData = new Date();
        var yearStored = actualData.getFullYear();
        var monthStored = actualData.getMonth() + 1;
        var dayStored = actualData.getDate();
        var hourStored = actualData.getHours();
        var minuteStored = actualData.getMinutes();
        var secondStored = actualData.getSeconds();
        alert("Stored at timestamp: "
            + dayStored.toString() + "."
            + monthStored.toString() + "."
            + yearStored.toString() + " | "
            + hourStored.toString() + ":"
            + minuteStored.toString() + ":"
            + secondStored.toString() + ".");
    }
    else if (configStored == ResponseId.eResponseError) {
        alert("Store failed.");
    }
    else {
        /* do nothing */
    }


    var icsReceived = parseInt(myObj[keys[MsgId.eIcsReceived]]);
    if (icsReceived == ResponseId.eResponseOk) {
        alert("ICS received successfully.");
    }
    else if (icsReceived == ResponseId.eResponseError) {
        alert("ICS receive failed. Please try again, in case of multiple fail, reset clock by plug-out and plug in again.");
    }
    else {
        /* do nothing */
    }

    /* Set hour threshold */
    document.getElementById("slider3").value = myObj[keys[MsgId.eIcsThreshold]];
    if (myObj[keys[MsgId.eIcsThreshold]] == -1) {
        document.getElementById("sliderValue3").innerHTML = "[off]";
    }
    else {
        document.getElementById("sliderValue3").innerHTML = "[" + myObj[keys[MsgId.eIcsThreshold]] + "h]";
    }

    /* Set version information */
    document.getElementById("informationLabel").innerHTML =
        "[Build: " + myObj[keys[MsgId.eVersionBuild]].toString()
        + " || Firmware: " + myObj[keys[MsgId.eVersionFw]].toString()
        + " || Configuration: " + myObj[keys[MsgId.eVersionCfg]].toString()
        + " || Hostname: " + myObj[keys[MsgId.eActualHostname]].toString() + "]";

    /* Get listbox item */
    var listbox = document.getElementById("alarmListbox");

    /* Remove all entries from listbox */
    for (var i = listbox.options.length - 1; i >= 0; i--) {
        listbox.remove(i);
    }

    /* Extract alarm enabled */
    if (parseInt(myObj[keys[MsgId.eAlarmEnabled]]) == 1) {
        toggleAlarm.checked = true;
        alarmCard.style.display = "block"
    }
    else {
        toggleAlarm.checked = false;
        alarmCard.style.display = "none"
    }

    /* Convert alarm color value and show in picker / overview */
    var testA1 = "000000" + parseInt(myObj[keys[MsgId.eAlarmColor]]).toString(16).toUpperCase();
    var testA2 = "#" + testA1.substring(testA1.length - 6);
    document.getElementById("color2").value = testA2;
    document.getElementById("alarmColorValue").innerHTML = "[" + testA2 + "]";

    /* Extract alarm count */
    var alarmCount = myObj[keys[MsgId.eAlarmCount]];

    /* Set new alarm information to listbox */
    for (var i = 0; i < alarmCount; i++) {

        var opt = document.createElement("option");
        var type = myObj[keys[MsgId.eAlarmListStart + i]].substring(5, 6);
        opt.text = myObj[keys[MsgId.eAlarmListStart + i]].substring(0, 2) + ":" + myObj[keys[MsgId.eAlarmListStart + i]].substring(2, 4) + " [" + c_alarmTypeStringArray[type] + "]";
        opt.value = type;
        listbox.add(opt);
    }
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function colorModeDropdown() {
    closeOpenDropdownMenu();
    document.getElementById("colorDropdownMenu").classList.toggle("show");
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function functionDropdown() {
    closeOpenDropdownMenu();
    document.getElementById("functionDropdownMenu").classList.toggle("show");
}
// Close the dropdown if the user clicks outside of it
window.onClick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        closeOpenDropdownMenu();
    }
}

function closeOpenDropdownMenu() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}  
