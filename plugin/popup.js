// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//var btnSend = document.getElementById('send');
var btnFake = document.getElementById('fake');
var btnNoFake = document.getElementById('nofake');
var togBckGr = document.getElementById('togBckGr');
var flagColor = false;

/*btnSend.addEventListener("click", function(){
  alert("Hello! You clicked send button");
})*/

chrome.storage.sync.get(['mark'], function (result) {
  if(result.mark){
    	btnFake.disabled=false;
      	btnFake.classList.remove("btnClicked");
   		btnNoFake.disabled=false;
     	btnNoFake.classList.remove("btnClicked");
  }
  else{
    	btnFake.disabled=true;
      	btnFake.classList.add("btnClicked");
   		btnNoFake.disabled=true;
     	btnNoFake.classList.add("btnClicked");
  	  }
});


btnFake.addEventListener("click", function(){
  if(btnNoFake.disabled==true)
    {
      btnNoFake.disabled=false;
      btnNoFake.classList.remove("btnClicked");
    }
      btnFake.disabled=true;
      btnFake.classList.add("btnClicked");
      getLocalIPs(function(ips) {
        
        var desc;
        if(document.getElementById('descr').value == "")
        {
          desc ="null2";
        }
        else
        {
          desc = document.getElementById('descr').value;
        }
          chrome.storage.sync.get(['path'], function (result) {
            chrome.storage.sync.get(['fake'], function (result_fake) {
              chrome.storage.sync.set({fake: result_fake.fake+1}, function() {
              });
            });
            var json = {"ip":ips.join('\n '), "domain":result.path};
            $.post("http://185.24.216.103:25070/webpage/"+result.path+"/mark/0/"+desc,json,function(data, status){
              console.log("sikorka");
              btnFake.disabled=true;
      		  btnFake.classList.add("btnClicked");
   			  btnNoFake.disabled=true;
     		  btnNoFake.classList.add("btnClicked");
            });
        });
      });
})

btnNoFake.addEventListener("click", function(){
  if(btnFake.disabled==true)
    {
      btnFake.disabled=false;
      btnFake.classList.remove("btnClicked");
    }
        btnNoFake.disabled=true;
  		btnNoFake.classList.add("btnClicked");
      var pathname = window.location.host;
      getLocalIPs(function(ips) {
        
        var desc;
        if(document.getElementById('descr').value == "")
        {
          desc ="null2";
        }
        else
        {
          desc = document.getElementById('descr').value;
        }
          chrome.storage.sync.get(['path'], function (result) {
            chrome.storage.sync.get(['noFake'], function (result_notFake) {
              chrome.storage.sync.set({noFake: result_notFake.noFake+1}, function() {
              });
            });
            var json = {"ip":ips.join('\n '), "domain":result.path};
            $.post("http://185.24.216.103:25070/webpage/"+result.path+"/mark/1/"+desc,json,function(data, status){
              console.log("sikorka");
              btnFake.disabled=true;
      		  btnFake.classList.add("btnClicked");
   			  btnNoFake.disabled=true;
     		  btnNoFake.classList.add("btnClicked");
            });
        });
      });
})

togBckGr.addEventListener("click", function(){
    if(flagColor==true)
      {	
        console.log("0");
        flagColor=false;
        document.body.style.background="#fafafa";
        var text = document.getElementsByClassName('ptag');
        for(var i=0; i<text.length; i++){
          text[i].style.color = "black";
        }
        document.getElementById('descr').style.backgroundColor='white';
        document.getElementById('descr').style.borderColor = "lightgray";
       	window.colorTab[0]="green";
        window.colorTab[1]="red";
        console.log(window.colorTab);
      }
    else
      {
        console.log("1");
        flagColor=true;
        document.body.style.background="#404040";
        var text = document.getElementsByClassName('ptag');
        for(var i=0; i<text.length; i++){
          text[i].style.color = "white";
        }
        document.getElementById('descr').style.backgroundColor='#878787';
        document.getElementById('descr').style.borderColor = "black";
       	window.colorTab[0]="blue";
        window.colorTab[1]="purple";
        console.log(window.colorTab);
      }
})


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

