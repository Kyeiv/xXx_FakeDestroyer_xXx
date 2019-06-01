

'use strict';

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains:''},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
  
  chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
  
    if(response.name == "redirect")
      {
        if(confirm(response.message))
          {
             chrome.tabs.update(sender.tab.id, {url: "https://www.youtube.com/embed/noY-Sd0DZqM?autoplay=1"});
          }
       
      }
 
  	
});
