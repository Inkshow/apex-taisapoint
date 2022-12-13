//侧边操作栏收起展开
let btn = document.getElementById("cslbtn");
let asdcsl = document.getElementById("console");

function changeCslDisplay() {
  if (asdcsl.offsetLeft == 0) {
    asdcsl.style["margin-left"] = -15 + "rem";
    btn.style.left = "1rem";
  } else {
    asdcsl.style["margin-left"] = 0 + "rem";
    btn.style.left = "15.5rem";
  }
}

btn.addEventListener("click", changeCslDisplay);

//隐藏显示mapselector
let mapbtn = document.getElementsByClassName("mapselectbtn")[0];
let mapslt = document.getElementsByClassName("mapselect-content")[0];
let mslctt = document.getElementsByClassName("mapselect-content")[0];

function changeMapsltDisplay() {
  if (!mapslt.style.display) {
    mapslt.style.display = "block";
    setTimeout(() => {
      mslctt.style.transform = "translateY(0rem)";
    }, 10);
  } else {
    mslctt.style.transform = "translateY(-1.5rem)";
    setTimeout(() => {
      mapslt.style.display = "";
    }, 102);
  }
}
mapbtn.addEventListener("click", changeMapsltDisplay);
//div区域点击
let csl = document.getElementsByClassName("csl")[0];
function changeDisplay() {
  if (mapslt.style.display) {
    mslctt.style.transform = "translateY(-1.5rem)";
    setTimeout(() => {
      mapslt.style.display = "";
    }, 302);
  }
}
csl.addEventListener("click", changeDisplay);

//筛选部分
const iptnl = document.getElementById("null");
const iptvk = document.getElementById("Valkyrie");
const iptod = document.getElementById("OthersDisplacement");
iptnl.onclick = function () {
  if (iptnl.checked) {
    if (iptvk.checked) {
      if (iptod.checked) {
        //1 2 3
        cleansle();
      } else {
        //1 2
        sle([1, 2]);
      }
    } else if (iptod.checked) {
      //1 3
      sle([1, 3]);
    } else {
      //1
      sle([1]);
    }
  } else {
    if (iptvk.checked) {
      if (iptod.checked) {
        //2 3
        sle([2, 3]);
      } else {
        //2
        sle([2]);
      }
    } else if (iptod.checked) {
      //3
      sle([3]);
    } else {
      cleansle();
    }
  }
};

iptvk.onclick = function () {
  if (iptvk.checked) {
    if (iptnl.checked) {
      if (iptod.checked) {
        // 2 1 3
        cleansle();
      } else {
        // 2 1
        sle([2, 1]);
      }
    } else if (iptod.checked) {
      // 2 3
      sle([2, 3]);
    } else {
      // 2
      sle([2]);
    }
  } else if (iptnl.checked) {
    if (iptod.checked) {
      // 1 3
      sle([1, 3]);
    } else {
      //1
      sle([1]);
    }
  } else if (iptod.checked) {
    //3
    sle([3]);
  } else {
    cleansle();
  }
};

iptod.onclick = function () {
  if (iptod.checked) {
    if (iptnl.checked) {
      if (iptvk.checked) {
        // 312
        cleansle();
      } else {
        //31
        sle([3, 1]);
      }
    } else if (iptvk.checked) {
      //32
      sle([3, 2]);
    } else {
      //3
      sle([3]);
    }
  } else if (iptnl.checked) {
    if (iptvk) {
      //12
      sle([1, 2]);
    } else {
      //1
      sle([1]);
    }
  } else if (iptvk.checked) {
    //2
    sle([2]);
  } else {
    cleansle();
  }
};

function cleansle() {
  svgpt = document.getElementsByClassName("svgpoint");
  for (var i = 0; i < svgpt.length; i++) {
    svgpt[i].style = "";
  }
}

function sle(a) {
  if (a.indexOf(1) != -1) {
    if (a.indexOf(2) != -1) {
      if (a.indexOf(3) != -1) {
        svgpt = document.getElementsByClassName("svgpoint");
        for (var i = 0; i < svgpt.length; i++) {
          if (
            svgpt[i].dataset.speciallegend.includes("Valkyrie") ||
            svgpt[i].dataset.speciallegend.includes("null") ||
            svgpt[i].dataset.speciallegend.includes("OthersDisplacement")
          ) {
            svgpt[i].style = "";
          } else {
            svgpt[i].style = "display: none;";
          }
        }
      } else {
        svgpt = document.getElementsByClassName("svgpoint");
        for (var i = 0; i < svgpt.length; i++) {
          if (
            svgpt[i].dataset.speciallegend.includes("null") ||
            svgpt[i].dataset.speciallegend.includes("Valkyrie")
          ) {
            svgpt[i].style = "";
          } else {
            svgpt[i].style = "display: none;";
          }
        }
      }
    } else if (a.indexOf(3) != -1) {
      svgpt = document.getElementsByClassName("svgpoint");
      for (var i = 0; i < svgpt.length; i++) {
        if (
          svgpt[i].dataset.speciallegend.includes("null") ||
          svgpt[i].dataset.speciallegend.includes("OtherDisplacement")
        ) {
          svgpt[i].style = "";
        } else {
          svgpt[i].style = "display: none;";
        }
      }
    } else {
      svgpt = document.getElementsByClassName("svgpoint");
      for (var i = 0; i < svgpt.length; i++) {
        if (svgpt[i].dataset.speciallegend.includes("null")) {
          svgpt[i].style = "";
        } else {
          svgpt[i].style = "display: none;";
        }
      }
    }
  } else if (a.indexOf(2) != -1) {
    if (a.indexOf(3) != -1) {
      svgpt = document.getElementsByClassName("svgpoint");
      for (var i = 0; i < svgpt.length; i++) {
        if (
          svgpt[i].dataset.speciallegend.includes("OthersDisplacement") ||
          svgpt[i].dataset.speciallegend.includes("Valkyrie")
        ) {
          svgpt[i].style = "";
        } else {
          svgpt[i].style = "display: none;";
        }
      }
    } else {
      svgpt = document.getElementsByClassName("svgpoint");
      for (var i = 0; i < svgpt.length; i++) {
        if (svgpt[i].dataset.speciallegend.includes("Valkyrie")) {
          svgpt[i].style = "";
        } else {
          svgpt[i].style = "display: none;";
        }
      }
    }
  } else {
    svgpt = document.getElementsByClassName("svgpoint");
    for (var i = 0; i < svgpt.length; i++) {
      if (svgpt[i].dataset.speciallegend.includes("OthersDisplacement")) {
        svgpt[i].style = "";
      } else {
        svgpt[i].style = "display: none;";
      }
    }
  }
}
