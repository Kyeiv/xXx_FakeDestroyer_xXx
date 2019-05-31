
$.get("http://185.24.216.103:25070/webpage/www.gowno.pl",function(data, status){
    //alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);

    chrome.runtime.sendMessage("Data: " + JSON.stringify(data) + "\nStatus: " 
                               + status+"\nUwaga! \nStrona: \n"+ document.getElementsByTagName('title')[0].innerText
                               +" \njest fake newsem! \nCzy chcesz kontynuować?");
  
});


//var howFake = 2;

//chrome.browserAction.setTitle("good news");
/*if(howFake>3){
  chrome.runtime.sendMessage("Uwaga! \nStrona: \n"+ document.getElementsByTagName('title')[0].innerText+" \njest fake newsem! \nCzy chcesz kontynuować?");
}
else{
  
  //chrome.runtime.sendMessage("Strona: "+ document.getElementsByTagName('title')[0].innerText+" jest good newsem! Czy chcesz kontynuować?");
}*/


//<iframe src="toolbar.html"></iframe>//chrome-extension ...
//var url = chrome.extension.getURL('toolbar.html');
//var height = '35px';
//var iframe = "<iframe src='"+url+"' id='myOwnCustomToolbar666' style='height:"+height+"'></iframe>";