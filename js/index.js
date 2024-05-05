var time;
var date;

init();

function init(){
  let date = document.getElementById("dateInput");
  let time = document.getElementById("timeInput");

  let dateStr = dateString();
  let timeStr = timeString();

  date.value = dateStr;
  time.value = timeStr;

  date.setAttribute("min", dateStr)
  
}

function start(){
  document.getElementById("setup").style.display = "none";
  document.getElementById("countdownSuper").style.display = "block";
  document.getElementById("backgroundTime").style.display = "flex";

  let superLoc = document.getElementById("superLoc").style;
  superLoc.width = "30vw";
  superLoc.height = "20vh";

  let htmlStyle = document.getElementById("htm").style;
  htmlStyle.width = "97%";
  htmlStyle.height = "95%";

  let countdown = document.getElementById("time");
  countdown.innerHTML = "yyyy:mm:dd:hh:mm:ss. mmm";

  scaleFontSize();

  date = new Date(date + 'T' + time);

  counter = 0;

  var intervalID = setInterval(count ,1);
}


// events
function setup(){

  let timeInput = document.getElementById("timeInput").value;
  date = document.getElementById("dateInput").value;
  if (isValidTime(timeInput, date)){
    time = timeInput;
  } else {
    alert("Please enter a valid time!");
    return;
  }
  start();
}



// helper
function count(){
  let now = new Date();
  let difference = getTimeDifference(now, date);;
  if (isEmpty(difference) || overshot(now,date)){
    document.getElementById("time").innerHTML = "00:00:00.000";
    clearInterval(intervalID);
  }
  let text = "";
  if (difference["years"] != 0){
    text += difference["years"] + ":";
  }

  if (difference["months"] != 0){
    text += difference["months"] + ":";
  }

  if (difference["days"] != 0){
    text += difference["days"] + ":";
  }

  if (difference["hours"] < 10){
    text += "0";
    if (difference["hours"] == 0){
      text += "0:";
    } else {
      text += difference["hours"] + ":";
    }
  } else {
    text += difference["hours"] + ":";
  }

  if (difference["minutes"] < 10){
    text += "0";
    if (difference["minutes"] == 0){
      text += "0:";
    } else {
      text += difference["minutes"] + ":";
    }
  } else {
    text += difference["minutes"] + ":";
  }

  if (difference["seconds"] < 10){
    text += "0";
    if (difference["seconds"] == 0){
      text += "0:";
    } else {
      text += difference["seconds"] + ".";
    }
  } else {
    text += difference["seconds"] + ".";
  }

  if (difference["milliseconds"] < 100){
    text += "0";
    if (difference["milliseconds"] < 10){
      text += "0";
      if (difference["milliseconds"] == 0){
        text += "0";
      } else {
        text += difference["milliseconds"];
      }
    } else {
      text += difference["milliseconds"];
    }
  } else {
    text += difference["milliseconds"];
  }

  document.getElementById("time").innerHTML = text;
  
}


function timeString(){
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10){
    minutes = "0" + minutes;
  }
  return hours+":"+minutes;
}

function dateString(){
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isValidTime(t, d){
  if (d == dateString()){
    let hours = t.substring(0,2);
    let minutes = t.substring(3,5);
    hours = +hours;
    minutes = +minutes;
    
    let currDate = new Date();

    let currHours = currDate.getHours();
    let currMinutes = currDate.getMinutes();

    if (hours > currHours || (hours == currHours && minutes > currMinutes)){
      return true;
    }
    return false;
  }
  return true;
}

function scaleFontSize() {
  let containerWidth = document.getElementById('backgroundTime').offsetWidth;
  let text = document.getElementById('time');
  
  let ratio = (containerWidth / text.offsetWidth) * 2;
  //let ratio = 1.3;
  
  let newSize = Math.floor(parseFloat(window.getComputedStyle(text, null).getPropertyValue('font-size')) * ratio);
  text.style.fontSize = newSize + 'px';
}

function getTimeDifference(start, end) {
  // Calculate the time difference in milliseconds
  var timeDiff = Math.abs(end.getTime() - start.getTime());

  // Calculate years
  var years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
  // Calculate days
  var days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
  // Calculate months
  var months = Math.floor(days / 30.44); // Approximate months per year
  // Calculate hours
  var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  // Calculate minutes
  var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  // Calculate seconds
  var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  // Remaining milliseconds
  var milliseconds = timeDiff % 1000;

  return {
      years: years,
      months: months,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds
  };
}

function isEmpty(dic){
  return dic["years"] == 0 
  && dic["months"] == 0 
  && dic["days"] == 0 
  && dic["hours"] == 0 
  && dic["minutes"] == 0 
  && dic["seconds"] == 0
  && dic["milliseconds"] == 0;
}
function overshot(now, date) {
  let nowTime = now.getTime();
  let dateTime = date.getTime();

  return nowTime > dateTime;
}