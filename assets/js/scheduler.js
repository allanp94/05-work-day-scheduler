// //hello 
// <div class="row" >
//         <div class=" col-2 hour "><span > 10am</span></div>
//         <div class="col-8 description past"></div>
//         <button class="saveBtn col-2"></button>
//       </div>

//create each hour segment for the work day 
function createHourSegments(startTime, endTime){

    while(startTime <= endTime){

        //create a div element with class row
        var row = $("<div>").addClass("row");

        var hourDiv = $("<div>").addClass("col-2 hour");
        //create the element to display the hour 
        var hourSegment = $("<span>").text(startTime);

        hourDiv.append(hourSegment);

        //create the discription area for the event
        var descriptionDiv = $("<div>").addClass("description col-8 ");
        var textArea = $("<textarea>").addClass("textarea");

        descriptionDiv.append(textArea);

        //create the button that saves the event 
        var saveButton = $("<button>").addClass("saveBtn col-2");

        row.append(hourDiv, descriptionDiv, saveButton);
        $(".container").append(row);
        startTime++;
    }
}

createHourSegments(09, 17);