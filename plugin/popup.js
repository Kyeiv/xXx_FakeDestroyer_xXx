// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var btnSend = document.getElementById('send');
var btnFake = document.getElementById('fake');
var btnNoFake = document.getElementById('nofake');
var togBckGr = document.getElementById('togBckGr')

btnSend.addEventListener("click", function(){
  alert("Hello! You clicked send button");
})

btnFake.addEventListener("click", function(){
  alert("Hello! You clicked fake button");
})

btnNoFake.addEventListener("click", function(){
  alert("Hello! You clicked nofake button");
})

togBckGr.addEventListener("click", function(){
    if(document.body.style.background=="gray")
      {	
        document.body.style.background="white";
        var text = document.getElementsByClassName('ptag');
        for(var i=0; i<text.length; i++){
          text[i].style.color = "black";
        }
        document.getElementById('descr').style.backgroundColor='white';
        //window.colorTab=["green","red"]
        console.log(window.colorTab);
      }
    else
      {
        document.body.style.background="gray";
        var text = document.getElementsByClassName('ptag');
        for(var i=0; i<text.length; i++){
          text[i].style.color = "white";
        }
        document.getElementById('descr').style.backgroundColor='#A7A7A7';
       	window.colorTab[0]="yellow";
        window.colorTab[1]="orange";
        console.log(window.colorTab);
      }
})

