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
    }, 102);
  }
}
csl.addEventListener("click", changeDisplay);

//地图切换

document
  .getElementById("olympus")
  .addEventListener("pointerdown", function (e) {
    changeMap("olympus");
  });
function changeMap(mn) {
  mapimage.src = "images/maps/" + mn + ".png";
  //获取选择中的地图
  selectedmap = mn;
  var request = new XMLHttpRequest();
  request.open(
    "get",
    "data/json/" + selectedmap + ".json"
  ); /*设置请求方法与路径*/
  console.log("data/json/" + selectedmap + ".json");
  request.send(null); /*不发送数据到服务器*/
  request.onload = function () {
    /*XHR对象获取到返回信息后执行*/
    if (request.status == 200) {
      /*数据获取成功*/
      var json = JSON.parse(request.responseText);
      //解析
      analyze(json);
    } else {
      console.error(
        "初始化失败，无法获取 data/json/" +
          selectedmap +
          ".json 状态码:" +
          request.status
      );
    }
  };
  function analyze(a) {
    let imagenaturalWidth = mapimage.naturalWidth;
    let imagenaturalHeight = mapimage.naturalHeight;
    let mapclientWidth = mapimage.clientWidth;
    let mapclientHeight = mapimage.clientHeight;
    //解析大佐点
    //取svg父元素
    let svgg = document.getElementById("svgg");
    //创建html文本
    let htmlcontent = "";
    //遍历
    for (var i = 0; i < a.taisapoints.length; i++) {
      let jsonctt = a.taisapoints[i];
      //计算xy
      let x = (jsonctt.coordinates[0] / imagenaturalWidth) * mapclientWidth;
      let y = (jsonctt.coordinates[1] / imagenaturalHeight) * mapclientHeight;
      if (jsonctt.videop === undefined) {
        if (jsonctt.fromvideo === undefined) {
          htmlcontent +=
            '<circle class="svgpoint"cx="' +
            x +
            '"cy="' +
            y +
            '"data-id="' +
            jsonctt.id +
            '"data-grade="' +
            jsonctt.grade +
            '"data-speciallegend="' +
            jsonctt.speciallegend +
            '"data-img="' +
            jsonctt.img +
            '"data-time="' +
            jsonctt.time +
            '"r="4"stroke="black"stroke-width="2"fill="#' +
            getColor(jsonctt.grade) +
            '"/>';
        } else {
          if (jsonctt.img === undefined) {
            htmlcontent +=
              '<circle class="svgpoint"cx="' +
              x +
              '"cy="' +
              y +
              '"data-id="' +
              jsonctt.id +
              '"data-grade="' +
              jsonctt.grade +
              '"data-speciallegend="' +
              jsonctt.speciallegend +
              '"data-fromvideo="' +
              jsonctt.fromvideo +
              '"data-time="' +
              jsonctt.time +
              '"r="4"stroke="black"stroke-width="2"fill="#' +
              getColor(jsonctt.grade) +
              '"/>';
          } else {
            console.log(jsonctt.id, jsonctt.img);
            htmlcontent +=
              '<circle class="svgpoint"cx="' +
              x +
              '"cy="' +
              y +
              '"data-id="' +
              jsonctt.id +
              '"data-grade="' +
              jsonctt.grade +
              '"data-speciallegend="' +
              jsonctt.speciallegend +
              '"data-img="' +
              jsonctt.img +
              '"data-fromvideo="' +
              jsonctt.fromvideo +
              '"data-time="' +
              jsonctt.time +
              '"r="4"stroke="black"stroke-width="2"fill="#' +
              getColor(jsonctt.grade) +
              '"/>';
          }
        }
      } else {
        htmlcontent +=
          '<circle class="svgpoint"cx="' +
          x +
          '"cy="' +
          y +
          '"data-id="' +
          jsonctt.id +
          '"data-grade="' +
          jsonctt.grade +
          '"data-speciallegend="' +
          jsonctt.speciallegend +
          '"data-img="' +
          jsonctt.img +
          '"data-fromvideo="' +
          jsonctt.fromvideo +
          '"data-videop="' +
          jsonctt.videop +
          '"data-time="' +
          jsonctt.time +
          '"r="4"stroke="black"stroke-width="2"fill="#' +
          getColor(jsonctt.grade) +
          '"/>';
      }
    }
    svgg.innerHTML = htmlcontent;
    //解析滋崩点
    let zbsvgg = document.getElementById("zbsvgg");
    //创建html文本
    htmlcontent = "";
    //遍历
    for (var i = 0; i < a.chargeriflepoints.length; i++) {
      let jsonctt = a.chargeriflepoints[i];
      //计算xy
      let x = (jsonctt.coordinates[0] / imagenaturalWidth) * mapclientWidth;
      let y = (jsonctt.coordinates[1] / imagenaturalHeight) * mapclientHeight;
      htmlcontent +=
        '<circle class="zbsvgpoint"cx="' +
        x +
        '"cy="' +
        y +
        '"data-id="' +
        jsonctt.id +
        '"r="7"stroke="black"stroke-width="0.5px"fill="#C8D0CF"fill-opacity="0.3"/>' +
        '<path id="' +
        jsonctt.id +
        '"d="m8.13655,6.06009c0.08,-0.01 0.258,-0.106 0.373,-0.047c0.046,0.024 0.038,0.058 0.128,0.07c0.071,-0.133 0.151,-0.261 0.269,-0.373c1.34,-0.007 2.668,0.089 3.804,0.338c0.049,0.068 0.076,0.127 0.081,0.245c0.187,0.02 0.374,0.039 0.56,0.059c0.115,0.159 0.07,0.313 0.105,0.583c0.019,0.14 -0.057,0.278 -0.081,0.431c-0.063,0.399 0.091,0.986 -0.082,1.283c-0.195,0.038 -0.365,-0.001 -0.537,-0.023c-0.003,0.066 -0.007,0.132 -0.011,0.198c-0.122,0.148 -0.438,0.182 -0.63,0.257c-0.23,0.081 -0.459,0.163 -0.689,0.245c-0.56,0.015 -1.12,0.031 -1.68,0.046c-0.234,0.057 -0.395,0.129 -0.747,0.129c-0.443,-0.004 -0.887,-0.008 -1.33,-0.012c-0.226,-0.253 -0.451,-0.506 -0.677,-0.758c-0.109,-0.004 -0.218,-0.008 -0.326,-0.012c-0.055,-0.031 -0.109,-0.062 -0.164,-0.093c-0.015,0.08 -0.411,0.054 -0.548,0.047c-0.07,0.011 -0.14,0.023 -0.21,0.035c-0.257,0.318 -0.514,0.637 -0.77,0.956c-0.227,0.001 -0.553,0.014 -0.747,-0.047c0,-0.043 0,-0.085 0,-0.128c-0.14,-0.136 -0.28,-0.272 -0.42,-0.408c-0.084,-0.038 -0.141,-0.009 -0.199,-0.047c0.003,-0.082 -0.008,-0.118 -0.035,-0.163c-0.233,0.004 -0.466,0.008 -0.7,0.011c-0.015,0.032 -0.031,0.063 -0.046,0.094c-0.024,0 -0.047,0 -0.07,0c-0.029,-0.13 -0.329,-0.152 -0.42,-0.059c-0.095,0.067 -0.08,0.277 -0.14,0.374c-0.028,0.007 -0.055,0.015 -0.082,0.023c-0.097,-0.2 -0.05,-0.842 0.093,-0.91c0.153,-0.034 0.756,0.089 0.875,-0.023c0,-0.004 0,-0.008 0,-0.012c-0.171,0 -0.342,0 -0.513,0c-0.051,-0.103 -0.343,-0.058 -0.49,-0.058c-0.506,0 -1.011,0 -1.517,0c-0.008,-0.004 -0.016,-0.008 -0.023,-0.012c-0.002,-0.104 0.02,-0.144 0.046,-0.21c0.106,-0.032 0.981,-0.073 1.004,-0.093c0.062,-0.101 0.124,-0.202 0.187,-0.303c0.101,-0.006 0.079,-0.036 0.128,-0.058c0.163,0 0.327,0 0.49,0c0.321,0 1.299,-0.072 1.517,0.023c0.252,0.11 0.216,0.231 0.315,0.49c0,-0.008 0,-0.016 0,-0.024c0.078,-0.137 0.045,-0.318 0.047,-0.501c-0.078,0.004 -0.145,0.01 -0.175,-0.035c-0.012,-0.066 -0.024,-0.132 -0.036,-0.198c-0.175,0 -0.35,0 -0.525,0c0.002,0.054 0.003,0.079 -0.023,0.105c-0.583,0 -1.167,0 -1.75,0c-0.013,-0.309 -0.069,-0.506 -0.07,-0.805c0.085,-0.04 0.064,-0.193 0.058,-0.315c0.012,-0.058 0.024,-0.117 0.035,-0.175c0.584,0.004 1.167,0.008 1.75,0.012c0,0.031 0,0.062 0,0.093c0.179,0.004 0.358,0.008 0.537,0.012c0.008,-0.07 0.016,-0.14 0.024,-0.21c0.058,-0.004 0.116,-0.008 0.175,-0.012c-0.005,-0.207 -0.007,-0.309 -0.035,-0.501c-0.008,0 -0.016,0 -0.024,0c0.001,0.218 -0.16,0.442 -0.327,0.489c-0.661,0.004 -1.322,0.008 -1.983,0.012c-0.038,-0.083 -0.091,-0.048 -0.14,-0.105c-0.055,-0.097 -0.109,-0.194 -0.164,-0.291c-0.343,0.002 -0.732,-0.01 -0.991,-0.059c-0.027,-0.075 -0.055,-0.123 -0.059,-0.233c0.502,0.003 1.785,0.094 2.124,-0.058c-0.111,0.004 -0.165,-0.007 -0.222,-0.047c-0.004,-0.019 -0.008,-0.039 -0.011,-0.058c0.079,-0.088 0.181,-0.207 0.186,-0.362c0.121,-0.024 0.224,-0.06 0.42,-0.058c0.069,-0.001 0.08,0.043 0.199,0.046c0.02,-0.062 0.071,-0.054 0.151,-0.046c0.008,0.042 0.005,0.035 0.024,0.058c0.023,0 0.046,0 0.07,0c0.079,-0.082 0.279,-0.063 0.443,-0.058c0.008,0.042 0.005,0.035 0.023,0.058c0.032,0 0.063,0 0.094,0c0,-0.019 0,-0.039 0,-0.058c0.054,0 0.109,0 0.163,0c0,0.019 0,0.039 0,0.058c0.102,-0.005 0.079,-0.036 0.129,-0.058c0.14,0 0.28,0 0.42,0c0,0.023 0,0.046 0,0.07c0.035,-0.004 0.07,-0.008 0.105,-0.012c0.003,-0.019 0.007,-0.039 0.011,-0.058c0.051,0.004 0.101,0.008 0.152,0.011c0,0.02 0,0.039 0,0.059c0.095,-0.007 0.068,-0.038 0.117,-0.059c0.144,0 0.287,0 0.431,0c0,0.02 0,0.039 0,0.059c0.105,-0.015 0.122,-0.058 0.269,-0.059c0.02,0.047 0.003,0.042 0.058,0.059c0.143,-0.106 0.405,-0.041 0.549,0c0.042,-0.086 0.149,-0.023 0.198,-0.093c-0.027,-0.012 -0.055,-0.024 -0.082,-0.035c-0.004,-0.157 0.008,-0.289 0.047,-0.385c0.039,0.01 0.015,0.01 0.047,0.011c0.012,-0.058 -0.005,-0.039 0.046,-0.058c0.008,0.101 0.016,0.202 0.024,0.303c0.214,-0.006 0.533,-0.069 0.688,0.024c0.004,0.103 0.04,0.142 0.058,0.233c0.351,0.076 0.202,0.276 0.339,0.525c0.072,-0.004 0.112,-0.008 0.14,0.035c0.132,0.201 0.176,0.385 0.175,0.606zm-3.641,-0.63c0,0.008 0,0.016 0,0.024c0,-0.008 0,-0.016 0,-0.024zm0,0.047c0.006,0.185 0.106,0.275 0.129,0.396c0.012,0.068 -0.028,0.143 -0.024,0.234c0.047,-0.003 0.032,-0.007 0.07,0.011c-0.028,-0.111 0.02,-0.332 -0.105,-0.361c-0.002,-0.086 -0.019,-0.237 -0.07,-0.28zm5.671,1.481c-0.052,0.028 -0.087,-0.87 -0.117,0.082c-0.035,0.038 -0.035,0.07 -0.023,0.128c0.092,0.123 0.515,0.474 0.688,0.49c0.102,-0.043 0.203,-0.086 0.304,-0.128c-0.004,-0.171 -0.008,-0.343 -0.012,-0.514c-0.019,-0.019 -0.039,-0.038 -0.058,-0.058c-0.261,0 -0.521,0 -0.782,0zm-1.225,0.49c-0.035,0.008 -0.07,0.015 -0.105,0.023c-0.164,0.119 -0.27,0.782 -0.117,1.038c0.175,0.129 0.35,0.257 0.525,0.385c0.188,-0.044 1.015,-0.284 1.085,-0.396c0.106,-0.2 -0.379,-0.515 -0.478,-0.642c-0.148,0.086 -0.254,0.257 -0.455,0.28c-0.125,-0.074 -0.249,-0.148 -0.373,-0.222c0.005,-0.131 0.01,-0.424 -0.082,-0.466zm0.28,0c-0.02,0.012 -0.039,0.023 -0.058,0.035c-0.005,0.119 -0.026,0.345 0.035,0.408c0.073,0.051 0.147,0.101 0.221,0.152c0.117,-0.086 0.234,-0.171 0.35,-0.257c-0.062,-0.058 -0.124,-0.116 -0.186,-0.175c0.015,0.1 0.001,0.179 -0.024,0.257c-0.019,-0.008 -0.039,-0.016 -0.058,-0.024c-0.013,-0.188 -0.106,-0.371 -0.28,-0.396zm-4.621,0.175c0.006,0.223 -0.053,0.6 -0.151,0.758c0.07,0 0.14,0 0.21,0c0,-0.253 0,-0.505 0,-0.758c-0.02,0 -0.039,0 -0.059,0zm-0.151,1.131c-0.066,0.024 -0.195,-0.002 -0.245,0.035c0.079,0.103 0.483,0.443 0.618,0.467c0,-0.164 0,-0.327 0,-0.49c-0.008,0 -0.016,0 -0.023,0c-0.117,-0.004 -0.234,-0.008 -0.35,-0.012z"fill="rgb(238, 241, 241)"stroke-width="0.012px"stroke="rgb(0, 0, 0)"fill-rule="evenodd"style="transform: translate(' +
        (x - 6.8) +
        "px" +
        "," +
        (y - 7) +
        'px);"/>';
    }
    zbsvgg.innerHTML = htmlcontent;
    //遍历svg添加事件
    const info = document.getElementById("information");
    const cover = document.getElementById("cover");
    const svgpt = document.getElementsByClassName("svgpoint");
    for (var i = 0; i < svgpt.length; i++) {
      svgpt[i].addEventListener("pointerdown", function (e) {
        let svgp = e.target;
        //解析创建info元素文本
        let infocontent = "";
        selectedmap =
          document.getElementsByClassName("mapselectbtn")[0].dataset
            .selectedmap;
        if (svgp.dataset.fromvideo === undefined) {
          infocontent =
            '<svg xmlns="http://www.w3.org/2000/svg"width="20"height="20"fill="#f07b65"id="closeinfo"viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg><div id="imgs"><div>' +
            getimg(svgp.dataset.img, svgp.dataset.id) +
            '</div></div><div id="from"><div id="details">点位ID：' +
            svgp.dataset.id +
            "<br>上传日期：" +
            svgp.dataset.time +
            "</div></div>";
          var imgss = document.getElementById("imgs");
          imgss.style.width = "100%";
        } else if (svgp.dataset.img === undefined) {
          if (svgp.dataset.videop === undefined) {
            infocontent =
              '<svg xmlns="http://www.w3.org/2000/svg"width="20"height="20"fill="#f07b65"id="closeinfo"viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>' +
              '<div id="from" style="width: 100%;"><div id="video"><iframe id="videoif"src="https://player.bilibili.com/player.html?bvid=' +
              svgp.dataset.fromvideo.split(",")[0] +
              "&high_quality=1&danmaku=0&t=" +
              svgp.dataset.fromvideo.split(",")[1] +
              '"scrolling="no"border="0"frameborder="no"framespacing="0"allowfullscreen="true"></iframe><div id="details">点位ID：' +
              svgp.dataset.id +
              "<br>上传日期：" +
              svgp.dataset.time +
              "</div></div></div>";
          } else {
            infocontent =
              '<svg xmlns="http://www.w3.org/2000/svg"width="20"height="20"fill="#f07b65"id="closeinfo"viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>' +
              '<div id="from" style="width: 100%;"><div id="video"><iframe id="videoif"src="https://player.bilibili.com/player.html?bvid=' +
              svgp.dataset.fromvideo.split(",")[0] +
              "&high_quality=1&danmaku=0&t=" +
              svgp.dataset.fromvideo.split(",")[1] +
              "&p=" +
              svgp.dataset.videop;
            '"scrolling="no"border="0"frameborder="no"framespacing="0"allowfullscreen="true"></iframe><div id="details">点位ID：' +
              svgp.dataset.id +
              "<br>上传日期：" +
              svgp.dataset.time +
              "</div></div></div>";
          }
        } else {
          if (svgp.dataset.videop === undefined) {
            infocontent =
              '<svg xmlns="http://www.w3.org/2000/svg"width="20"height="20"fill="#f07b65"id="closeinfo"viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg><div id="imgs"><div>' +
              getimg(svgp.dataset.img, svgp.dataset.id) +
              '</div></div><div id="from"><div id="video"><iframe id="videoif"src="https://player.bilibili.com/player.html?bvid=' +
              svgp.dataset.fromvideo.split(",")[0] +
              "&high_quality=1&danmaku=0&t=" +
              svgp.dataset.fromvideo.split(",")[1] +
              '"scrolling="no"border="0"frameborder="no"framespacing="0"allowfullscreen="true"></iframe><div id="details">点位ID：' +
              svgp.dataset.id +
              "<br>上传日期：" +
              svgp.dataset.time +
              "</div></div></div>";
          } else {
            infocontent =
              '<svg xmlns="http://www.w3.org/2000/svg"width="20"height="20"fill="#f07b65"id="closeinfo"viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg><div id="imgs"><div>' +
              getimg(svgp.dataset.img, svgp.dataset.id) +
              '</div></div><div id="from"><div id="video"><iframe id="videoif"src="https://player.bilibili.com/player.html?bvid=' +
              svgp.dataset.fromvideo.split(",")[0] +
              "&high_quality=1&danmaku=0&t=" +
              svgp.dataset.fromvideo.split(",")[1] +
              "&p=" +
              svgp.dataset.videop +
              '"scrolling="no"border="0"frameborder="no"framespacing="0"allowfullscreen="true"></iframe><div id="details">点位ID：' +
              svgp.dataset.id +
              "<br>上传日期：" +
              svgp.dataset.time +
              "</div></div></div>";
          }
        }
        function getimg(a, c) {
          let b = "";
          for (let i = 1; i <= a; i++) {
            b +=
              '<img class="img"src="images/points/' +
              selectedmap +
              "/" +
              c +
              "/" +
              i +
              '.png"/>';
          }
          return b;
        }
        info.innerHTML = infocontent;
        //显示info
        info.style.display = "flex";
        cover.style.display = "block";
        setTimeout(() => {
          info.style.opacity = "1";
          cover.style.opacity = "0.5";
        }, 10);
        cover.style.width = window.screen.availWidth + "px";
        cover.style.height = window.screen.availHeight + "px";

        //绑定事件
        //图片展开收起
        var imgs = document.getElementsByClassName("img");
        var imgss = document.getElementById("imgs");
        var vdo = document.getElementById("from");
        function foldvideo() {
          if (vdo.style.width === "0px") {
            vdo.style = "";
            imgss.style.width = "";
          } else {
            vdo.style.width = 0;
            vdo.style["margin-top"] = 0;
            vdo.style["margin-left"] = 0;
            imgss.style.width = "100%";
          }
        }
        for (i in imgs) {
          imgs[i].onclick = foldvideo;
        }
        //关闭info
        const closesvg = document.getElementById("closeinfo");
        function closeif() {
          info.style.opacity = "0";
          cover.style.opacity = "0";
          setTimeout(() => {
            info.style.display = "";
            cover.style.display = "";
          }, 202);
        }
        closesvg.addEventListener("click", closeif);
        cover.addEventListener("click", closeif);
        info.addEventListener("click", function (e) {
          e.stopPropagation();
          e.preventDefault();
        });
      });
    }
  }
  function getColor(g) {
    if (g == "A") {
      return "860909";
    } else if (g == "B") {
      return "a6367f";
    } else if (g == "C") {
      return "325599";
    } else if (g == "D") {
      return "728e1f";
    } else {
      return "ffde47";
    }
  }
}
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
