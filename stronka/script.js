
  console.log("script.js")
  $.get("http://185.24.216.103:25070/webpage/number/100/type/1",function(data, status){

        $("#myTable").mirandajs(data);
    });
    $.get("http://185.24.216.103:25070/webpage/number/100/type/0",function(data, status){

        $("#myTableWorst").mirandajs(data);
    });


