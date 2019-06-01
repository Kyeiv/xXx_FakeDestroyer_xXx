// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
  
  if(confirm(response)){
  	alert("ZOSTAJESZ TUTAJ NA WŁASNĄ ODPOWIEDZIALNOŚĆ!")
<<<<<<< HEAD
    document.location.reload(true);
=======
   document.location.reload(true);
>>>>>>> 34750d53409f5061e9434ae8038e892d6dabbf86
  }
  else{
    chrome.tabs.goBack();
  }
  	
});
