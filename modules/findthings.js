function cancelFullScreen(el) {
    var requestMethod =
      el.cancelFullScreen ||
      el.webkitCancelFullScreen ||
      el.mozCancelFullScreen ||
      el.exitFullscreen;
    if (requestMethod) {
      // cancel full screen.
      requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
      // Older IE.
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
        wscript.SendKeys("{F11}");
      }
    }
  }
  
  function requestFullScreen(el) { 
    var requestMethod =
      el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;
  
    if (requestMethod) {
      // Native full screen.
      requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
      // Older IE.
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
        wscript.SendKeys("{F11}");
      }
    }
    return false;
  }
  
  function toggleFull() {
    var elem = document.body; // Make the body go full screen.
    var isInFullScreen =
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (document.mozFullScreen || document.webkitIsFullScreen);
  
    if (isInFullScreen) {
      cancelFullScreen(document);
    } else {
      requestFullScreen(elem);
    }
    return false;
  }
  // cout what collect things
  
  let count = 0;
  
  // brihter thing
  function howcollect() {
    if (count == 5) {
      document.querySelector(`#${collect[0]}`).classList.add("light");
    }
  }
  
  const intervalFunc = setInterval(function() {
    count++;
    howcollect();
  }, 1000);
  
  let collect = ["one", "two", "three", "for"];
  
  // create array
  let arrMod = collect.map((el, i) => {
    let p = document.createElement("p");
    p.id = el + 1;
    p.className = "set__variant";
    p.innerHTML = el;
    document.querySelector("#set").appendChild(p);
  });
  let resultdescr = 0;
  // disapier thing
  function setInvisible(e) {
    collect.forEach(el => {
      if (e.target.id == el) {
        resultdescr++;
        e.target.classList.add("hidden");
        document.querySelector(`#${el}1`).classList.add("hidden");
        let indexForDelete = collect.indexOf(el);
        collect.splice(indexForDelete, 1);
      }
    });
    count = 0;
  }
  
  function checkEndGame() {
    if (collect.length == 0) {
      clearInterval(intervalFunc);
      document.querySelector(`#overlay`).style.display = "initial";
    }
  }
  
  document.querySelector("#background").addEventListener("click", e => {
    setInvisible(e);
    checkEndGame();
  });
  
  document.querySelector("#my-cuts").addEventListener("click", e => {
    document.querySelector("#my-cuts").style.display = "none";
    let inner = document.elementFromPoint(e.clientX, e.clientY);
    inner.click();
    document.querySelector("#my-cuts").style.display = "initial";
  });
  function finishGame() {
    //display result
    document.getElementById('details').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('gamearea').style.backgroundImage = 'url(img/start.jpg)';
    document.getElementById("resultdescr").innerHTML = resultdescr;
    if(resultdescr==4){
      document.getElementById("winn").innerHTML = "You Winn!";
    }
    else{
      document.getElementById("winn").innerHTML = "You loose";
    }
  }
