
  console.log("script.js")
  $.get("https://sarchacode.pl:25070/webpage/number/100/type/1",function(data, status){

        $("#myTable").mirandajs(data);
    });
    $.get("https://sarchacode.pl:25070/webpage/number/100/type/0",function(data, status){

        $("#myTableWorst").mirandajs(data);
    });


