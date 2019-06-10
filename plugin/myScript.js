


var pathname = window.location.host;
getLocalIPs(function(ips) {
  json = {
    "ip":ips.join('\n '), "domain":pathname};
  $.get("https://sarchacode.pl:25070/webpage/"+pathname,json,function(data, status){
    var raw = data.webpage;
    window.fake_ = raw["fake"];
    window.noFake_ = raw["notFake"];
    
    var procent = window.fake_/(window.fake_+window.noFake_)*100;
    var betterProc = procent.toFixed(0)+"% fake news!";
   
    
     //var canMark = data.canMark;
    chrome.storage.sync.set({mark: data["canMark"]}, function() {
      console.log('mark is set to ' + data["canMark"]);
    });
    chrome.storage.sync.set({fake: raw["fake"]}, function() {
      console.log('fake is set to ' + raw["fake"]);
    });
    chrome.storage.sync.set({noFake: raw["notFake"]}, function() {
      console.log('noFake is set to ' + raw["notFake"]);
    });
    chrome.storage.sync.set({path: pathname}, function() {
      console.log('path is set to ' + pathname);
    });
    
    console.log(window.fake_);
    console.log(window.noFake_);
    chrome.storage.sync.get(['sliderValue'], function (result) {
   
      if(result.sliderValue<procent ){
      	chrome.runtime.sendMessage({name:"redirect", message: "Watch out! A lot of fake news! If you want to DESTROY them, click 'OK'"});
        chrome.storage.sync.set({sliderValue: 100}, function() {
     
    });
       
      }
      else{
        
      }
     
   /* chrome.runtime.sendMessage("Data: " + JSON.stringify(data) + "\nStatus: " 
                               + status+"\nUwaga! \nStrona: \n"+ document.getElementsByTagName('title')[0].innerText
                               +" \njest fake newsem! \nCzy chcesz kontynuować? " + ips.join('\n ') + " " + pathname);*/
            
        });
    
    
    });
    
    
   
  }
       );

function getLocalIPs(callback) {
  var ips = [];
  var RTCPeerConnection = window.RTCPeerConnection ||
      window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
  var pc = new RTCPeerConnection({
    // Don't specify any stun/turn servers, otherwise you will
    // also find your public IP addresses.
    iceServers: []
  }
                                );
  // Add a media line, this is needed to activate candidate gathering.
  pc.createDataChannel('');
  // onicecandidate is triggered whenever a candidate has been found.
  pc.onicecandidate = function(e) {
    if (!e.candidate) {
      // Candidate gathering completed.
      pc.close();
      callback(ips);
      return;
    }
    var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
    if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
      ips.push(ip);
  };
  pc.createOffer(function(sdp) {
    pc.setLocalDescription(sdp);
  }
                 , function onerror() {
                 }
                );
};
