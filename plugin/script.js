var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 150;
myCanvas.height = 150;
 
var _ctx = myCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY){
    ctx.beginPath();	
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
}
function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();
}
function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}
// drawLine(_ctx,100,100,200,200);
// drawArc(_ctx, 150,150,150, 0, Math.PI/3);
// drawPieSlice(_ctx, 150,150,150, Math.PI/2, Math.PI/2 + Math.PI/4, '#ff0000');

var myVinyls = {
    "nofake": 4,
    "fake": 9,
};  

var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
 
    this.draw = function(){
        var total_value = 0;
        var color_index = 0;
        for (var categ in this.options.data){
            var val = this.options.data[categ];
            total_value += val;
        }
 
        var start_angle = 0;
        for (categ in this.options.data){
            val = this.options.data[categ];
            var slice_angle = 2 * Math.PI * val / total_value / 2;
 
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length]
            );
 
            start_angle += slice_angle ;
            color_index++;
        }
 
    }
}

window.colorTab=["green","red"];

window.myPiechart = new Piechart(
    {
        canvas:myCanvas,
        data:myVinyls,
        colors:colorTab
    }
);
myPiechart.draw();