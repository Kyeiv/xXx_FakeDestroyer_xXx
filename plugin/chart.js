var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");
var statText = document.getElementById("stat");
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

$(document).ready(function () {
    console.log("ready!");
    myCanvas.width = 225;
    myCanvas.height = 112;
    setInterval("fun();", 50);

    output.innerHTML = slider.value;
    slider.style.position = "absolute";
    slider.style.left = "25px";
    slider.style.width = "250px"
    slider.style.bottom = "5px"

    slider.oninput = function () {
      output.innerHTML = slider.value;
      chrome.storage.sync.set({sliderValue: slider.value}, function() {
     
      });
    }

    chrome.storage.sync.get(['sliderValue'], function (result) {
        if(result.sliderValue)
        {
            slider.value = result.sliderValue;
            output.innerHTML = result.sliderValue;
        }
    });
});
        
function fun() {
    var fake, noFake;
    chrome.storage.sync.get(['fake'], function (result) {
        fake = result.fake;

        chrome.storage.sync.get(['noFake'], function (result) {
            noFake = result.noFake;
            
            var pr;
            if(!fake){
                pr = 0;
               }
               else{
                pr = fake/(fake+noFake)*100;
               } 
            var x = document.getElementById("rejtio");
            x.innerHTML = pr.toFixed(0);  

            drawing = new Image();
            drawing.src = "images/polowka.png";
            drawing.onload = function() {
                ctx.drawImage(drawing,0,0,drawing.width, drawing.height, 0, 0, myCanvas.width, myCanvas.height);
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.lineCap = "round";
                ctx.strokeStyle = "#555555";
                ctx.moveTo(myCanvas.width / 2, myCanvas.height);
                ctx.lineTo(38, 38);
                ctx.stroke();

                   
        });
    });
}



