/**
 * 
 */
// @ts-ignore
var howFake = 5;

//chrome.browserAction.setTitle("good news");
if(howFake>3){
  chrome.runtime.sendMessage("Uwaga! \nStrona: \n"+ document.getElementsByTagName('title')[0].innerText+" \njest fake newsem! \nCzy chcesz kontynuować?");
}
else{
  
  //chrome.runtime.sendMessage("Strona: "+ document.getElementsByTagName('title')[0].innerText+" jest good newsem! Czy chcesz kontynuować?");
}


//<iframe src="toolbar.html"></iframe>//chrome-extension ...
//var url = chrome.extension.getURL('toolbar.html');
//var height = '35px';
//var iframe = "<iframe src='"+url+"' id='myOwnCustomToolbar666' style='height:"+height+"'></iframe>";