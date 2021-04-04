
//create each hour segment for the work day 
function createHourSegments(startTime, endTime){
    

    while(startTime <= endTime){
        var mom = moment(startTime, 'HH:SS');

        //create a div element with class row
        var row = $("<div>").addClass("row");

        var hourDiv = $("<div>").addClass("col-2 hour");
        //create the element to display the hour 
        var hourSegment = $("<span>").text(mom.format("HH:SS"));
        
        hourDiv.append(hourSegment);
        
        //create the discription area for the event
        var descriptionDiv = $("<div>").addClass("description col-8");
        var textArea = $("<textarea>").addClass("textarea");

        checkHourSegment(hourSegment, textArea);
        
        descriptionDiv.append(textArea);

        //create the button that saves the event 
        var saveButton = $("<button>").addClass("saveBtn col-2");

        row.append(hourDiv, descriptionDiv, saveButton);
        $(".container").append(row);
        startTime++;
    }
}


//check to see if the event is in the past, 
//current, or future and update the color of the textarea
function checkHourSegment(timeEl, textAreaEl){
    var currTime = moment().format("LT");
    var time = timeEl.text();
    console.log(moment(time, "hh").isAfter(currTime, "hour"));
    if (moment(currTime).isAfter(time)){
        console.log("is after");
        $(textAreaEl).addClass("past");
    } 

}



//when the save button is pressed the inputed 
//text by the user is saved in the textarea


createHourSegments(09, 17);