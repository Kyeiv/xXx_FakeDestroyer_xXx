var pathname = window.location.host;
getLocalIPs(function(ips) {
  // <!-- ips is an array of local IP addresses.
  json = {
    "ip":ips.join('\n '), "domain":pathname};
  $.get("http://185.24.216.103:25070/webpage/"+pathname,json,function(data, status){
    var raw = data
    window.fake_ = raw["fake"];
    window.noFake_ = raw["notFake"];
    console.log(window.fake_);
    console.log(window.noFake_);
    //document.location.reload(true);
    console.log(window.noFake_);
    chrome.runtime.sendMessage("Data: " + JSON.stringify(data) + "\nStatus: " 
                               + status+"\nUwaga! \nStrona: \n"+ document.getElementsByTagName('title')[0].innerText
                               +" \njest fake newsem! \nCzy chcesz kontynuować? " + ips.join('\n ') + " " + pathname);
  }
       );
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
}
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
//var iframe = "<iframe src='"+url+"' id='myOwnCustomToolbar666' style='height:"+height+"'></iframe>"
;