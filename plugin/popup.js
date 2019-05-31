// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// $.get(URL,data,function(data,status,xhr),dataType)//server,co wysyłamy podczas zapytania, funkcja przy odebraniu zapytania, przyjmowane dane od servera
//https://d21b7108-22c7-4a61-b951-09ae108d206b.mock.pstmn.io
'use strict';


var btnSend = document.getElementById('send');
var btnFake = document.getElementById('fake');
var btnNoFake = document.getElementById('nofake');
var togBckGr = document.getElementById('togBckGr')

btnSend.addEventListener("click", function(){
  alert("Hello! You clicked send button");
})

btnFake.addEventListener("click", function(){
  if(btnNoFake.disabled==true)
    {
      btnNoFake.disabled=false;
      btnNoFake.classList.remove("btnClicked");
    }
        btnFake.disabled=true;
  		btnFake.classList.add("btnClicked");
 // alert("Hello! You clicked fake button");
})

btnNoFake.addEventListener("click", function(){
  if(btnFake.disabled==true)
    {
      btnFake.disabled=false;
      btnFake.classList.remove("btnClicked");
    }
        btnNoFake.disabled=true;
  		btnNoFake.classList.add("btnClicked");
 // alert("Hello! You clicked nofake button");
})

togBckGr.addEventListener("click", function(){
    if(document.body.style.background=="gray")
      {	
        document.body.style.background="#FdFdFd";
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
        document.body.style.background="gray";
        var text = document.getElementsByClassName('ptag');
        for(var i=0; i<text.length; i++){
          text[i].style.color = "white";
        }
        document.getElementById('descr').style.backgroundColor='#A7A7A7';
        document.getElementById('descr').style.borderColor = "black";
       	window.colorTab[0]="yellow";
        window.colorTab[1]="orange";
        console.log(window.colorTab);
      }
})

