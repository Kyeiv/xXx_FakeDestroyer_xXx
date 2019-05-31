// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// $.get(URL,data,function(data,status,xhr),dataType)//server,co wysyłamy podczas zapytania, funkcja przy odebraniu zapytania, przyjmowane dane od servera
//https://d21b7108-22c7-4a61-b951-09ae108d206b.mock.pstmn.io
'use strict';


var btnSend = document.getElementById('send');
var btnFake = document.getElementById('fake');
var btnNoFake = document.getElementById('nofake');

btnSend.addEventListener("click", function(){
  alert("Hello! You clicked send button");
})

btnFake.addEventListener("click", function(){
  alert("Hello! You clicked fake button");
})

btnNoFake.addEventListener("click", function(){
  alert("Hello! You clicked nofake button");
})
