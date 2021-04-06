var timeEvents = JSON.parse(localStorage.getItem("timeEvents")) || [];
console.log(timeEvents);
$("#currentDay").text(moment().format("LL"));

//create each hour segment for the work day
function createHourSegments(startTime, endTime) {
  while (startTime <= endTime) {
    var mom = moment(startTime, "HH:SS");

    //create a div element with class row
    var row = $("<div>").addClass("row");

    var hourDiv = $("<div>").addClass("col-2 hour");
    //create the element to display the hour
    var hourSegment = $("<span>").text(mom.format("HH:SS"));

    hourDiv.append(hourSegment);

    //create the discription area for the event
    var descriptionDiv = $("<div>").addClass("description col-8");
    var textArea = $("<textarea>").addClass("textarea");
    textArea.attr("time", startTime);

    textArea.val(checkLocalStorage(startTime.toString()));

    descriptionDiv.append(textArea);

    //create the button that saves the event
    var saveButton = $("<button>").addClass("saveBtn col-2");
    saveButton.attr("time", startTime);

    var saveIcon = $("<i>").addClass("fas fa-save");

    saveButton.append(saveIcon);

    row.append(hourDiv, descriptionDiv, saveButton);
    checkHourSegment(row);
    $(".container").append(row);
    startTime++;
  }
}

function checkLocalStorage(attr) {
  for (var i = 0; i < timeEvents.length; i++) {
    if (timeEvents[i].time === attr) {
      console.log(timeEvents[i].text);
      return timeEvents[i].text;
    }
  }
}

//check to see if the event is in the past,
//current, or future and update the color of the textarea
function checkHourSegment(row) {
  // take the vale from the span
  var t = $(row).find("span").text().trim();
  var textAreaEl = $(row).find("textarea");

  //remove the previous class so the new class can take effect
  if (textAreaEl.hasClass("present")) {
    $(textAreaEl).removeClass("present");
  } else if (textAreaEl.hasClass("future")) {
    $(textAreaEl).removeClass("future");
  } else if (textAreaEl.hasClass("past")) {
    $(textAreaEl).removeClass("past");
  }

  //set it to a valid time according to the time in the span
  var time = moment(t, "LT").set("hour", t);

  //checks to see if the current time and time in the event segment are the same
  if (moment().isSame(time, "hour")) {
    //moment().isAfter(time)) {
    $(textAreaEl).addClass("present");
  } else if (moment().isBefore(time)) {
    //checks to see if the current time is before the event segment time
    $(textAreaEl).addClass("future");
  } else if (moment().isAfter(time)) {
    //checks to see if the current time is after the event segment time
    $(textAreaEl).addClass("past");
  }
}

//set a time interval to check and update the color of the textarea as time progresses
setInterval(function () {
  $(".container .row").each(function (index, el) {
    console.log(el);

    checkHourSegment(el);
  });
}, 1000 * 60 * 60);

//when the save button is pressed the input
//text by the user is saved in the textarea and in local storage
$(".container").on("click", "button", function () {
  var attr = $(this).attr("time");
  var textarea = $(".container .textarea[time=" + attr + " ]");
  var textCont = textarea.val().trim();
  var exists = false;
  var index;

  for (var i = 0; i < timeEvents.length; i++) {
    if (timeEvents[i].time === attr) {
      exists = true;
      index = i;
      break;
    }
  }

  if (exists) {
    timeEvents[index].text = textCont;
    exists = false;
  } else {
    timeEvents.push({ time: attr, text: textCont });
    console.log("it got pushed to the localstorage");
  }

  localStorage.setItem("timeEvents", JSON.stringify(timeEvents));
});

createHourSegments(09, 17);
