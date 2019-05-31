// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
