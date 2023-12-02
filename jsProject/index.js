document.addEventListener("DOMContentLoaded", startApp);

var intervals = [];

function startApp() {
  let activeTarget;

  //mark first child as active on page load

  let firstDiv = document.getElementById("image-container").firstElementChild;
  firstDiv.classList.add("active");
  activeTarget = firstDiv;

  document
    .getElementById("image-container")
    .addEventListener("click", (event) => {
      let targetDiv = event.target.parentElement;

      //remove active class from activeTarget
      activeTarget.classList.remove("active");

      //mark new target as active
      targetDiv.classList.add("active");
      activeTarget = targetDiv;
    });

  //bind clocks to the divs
  let clockTimeZones = [
    "Asia/Kolkata",
    "Australia/Sydney",
    "Europe/London",
    "America/Los_Angeles",
  ];

  const clocksDivs = document.querySelector("#image-container").children;
  let intervals = clockTimeZones.map((timeZone, index) => {
    return bindClocks(clocksDivs[index], timeZone);
  });

  //remove interval on page unload
  window.addEventListener("unload", () => {
    if (intervals && intervals.length > 0) {
      intervals.forEach((interval) => {
        clearInterval(interval);
      });
    }
  });
}

function bindClocks(htmlElement, timeZone) {
  function timer() {
    let date_str = getLocaleDateString(timeZone);
    let time_str = getAMPMTime(date_str);
    htmlElement.getElementsByClassName("halftime")[0].innerHTML = time_str;
    htmlElement.getElementsByClassName("fulltime")[0].innerHTML = date_str;
  }
  timer();
  return setInterval(timer, 1000);
}

function getLocaleDateString(timeZone) {
  return new Date().toLocaleString("en-US", { timeZone });
}
/*
Get time for a given time-zone
*/
function getAMPMTime(datestring) {
  // create new Date object
  let datetime = new Date(datestring);

  let hours = datetime.getHours();
  let minutes = datetime.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
