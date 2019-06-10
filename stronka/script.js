
  console.log("script.js")
  $.get("http://77.55.217.170:25070/webpage/number/100/type/1",function(data, status){

        $("#myTable").mirandajs(data);
    });
    $.get("http://77.55.217.170:25070/webpage/number/100/type/0",function(data, status){

        $("#myTableWorst").mirandajs(data);
    });


