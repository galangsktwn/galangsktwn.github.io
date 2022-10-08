let videoUtama = document.querySelector(".video-player video"),
timer,
currentBar = document.querySelectorAll(".bar-durasi .current-bar"),
loadingBar = document.querySelectorAll(".loading-bar"),
durasi = document.querySelectorAll(".durasi"),
durasiSaatIni = document.querySelectorAll(".current-time"),
barDurasi = document.querySelectorAll(".bar-durasi .slide-bar"),
fullScreenBtn = document.querySelectorAll(".fullscreen"),
fullScreenBtnIcon = document.querySelectorAll(".fullscreen i"),
pemutarVideo = document.querySelector(".video-player"),
mundur = document.querySelectorAll(".mundur"),
maju = document.querySelectorAll(".maju");
putarJeda = document.querySelectorAll(".putar-jeda"),
putarJedaIcon = document.querySelectorAll(".putar-jeda i"),

// Desktop Only
kendaliDesktop = document.querySelector('.kendali-desktop'),
barVolume = document.querySelector(".volume-bar .slide-bar"),
volumeSaatIni = document.querySelector(".volume-bar .current-bar"),
suara = document.querySelector(".suara"),
suaraIcon = document.querySelector(".suara i"),
buttons = document.querySelectorAll(".buttons button"),
statusVideo = document.querySelector(".kendali-desktop .status"),
statusVideoIcon = document.querySelector(".kendali-desktop .status i"),

// Mobile only
kendaliMobile = document.querySelector('.kendali-mobile');

// Check devices
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)){
    pemutarVideo.classList.replace('desktop', 'mobile');
    return "tablet";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)){
    pemutarVideo.classList.replace('desktop', 'mobile');
    return 'mobile';
  }
  pemutarVideo.classList.replace('mobile', 'desktop');
  return 'desktop';
};
getDeviceType();

// Format durasi video
const formatTime = time => {
  let seconds = Math.floor(time % 60),
  minutes = Math.floor(time / 60) % 60,
  hours = Math.floor(time / 3600);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;

  if(hours == 0) {
      return `${minutes}:${seconds}`
  }
  return `${hours}:${minutes}:${seconds}`;
}

pemutarVideo.addEventListener('contextmenu', event => event.preventDefault());
kendaliDesktop.addEventListener('click', (event) => {
  if (event.target == kendaliDesktop) {
    videoUtama.paused ? videoUtama.play() : videoUtama.pause();
  }
});

function tampilkanStatus() {
  statusVideo.classList.add('showit');
  statusVideo.addEventListener('animationend', function(){
    statusVideo.classList.remove('showit');
  },{
    capture: false,
    once: true,
    passive: false,
  });
}

// Sembunyikan kendali
const hideControls = () => {
  if(videoUtama.paused) return;
  timer = setTimeout(() => {
      kendaliDesktop.classList.remove("tampilkan-kendali");
      kendaliMobile.classList.remove("tampilkan-kendali");
  }, 3000);
}
hideControls();

kendaliDesktop.addEventListener("mousemove", () => {
  kendaliDesktop.classList.add("tampilkan-kendali");
  clearTimeout(timer);
  hideControls();
});
kendaliMobile.addEventListener('click', () => {
  kendaliMobile.classList.add("tampilkan-kendali");
  clearTimeout(timer);
  hideControls();
});

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    clearTimeout(timer);
  });
}

// Kendali Suara
suara.addEventListener('click', () => {
  if (videoUtama.muted == false) {
    videoUtama.muted = true;
    suaraIcon.setAttribute('class', 'fa-solid fa-volume-xmark');
    videoUtama.volume = 0;
    volumeSaatIni.style.width = '0%';
    barVolume.value = '0';
  } else {
    videoUtama.muted = false;
    suaraIcon.setAttribute('class', 'fa-solid fa-volume-high');
    videoUtama.volume = 1;
    volumeSaatIni.style.width = '100%';
    barVolume.value = '100';
  }
});

barVolume.oninput = function() {
  videoUtama.muted = false;
  videoUtama.volume = this.value / 100;
  volumeSaatIni.style.width = this.value + '%';
  let levelSuara = videoUtama.volume * 100;
  if (levelSuara > 75) {
    suaraIcon.setAttribute('class', 'fa-solid fa-volume-high');
  }else if (levelSuara > 35) {
    suaraIcon.setAttribute('class', 'fa-solid fa-volume-low');
  }else if (levelSuara >= 0) {
    suaraIcon.setAttribute('class', 'fa-solid fa-volume-off');
  }
}
volumeSaatIni.style.width = '100%';

// Check Video jika sedang di muat atau tidak
videoUtama.addEventListener('canplay', () => {
  for (let i = 0; i < 2; i++) {
    loadingBar[i].classList.add('loaded');
  }
});
videoUtama.addEventListener('waiting', () => {
  for (let i = 0; i < 2; i++) {
    loadingBar[i].classList.remove('loaded');
  }
});

// Kontrol Desktop & Mobile
for (let i = 0; i < 2; i++) {
  putarJeda[i].addEventListener('click', () => videoUtama.paused ? videoUtama.play() : videoUtama.pause());
  maju[i].addEventListener('click', () => videoUtama.currentTime += 10);
  mundur[i].addEventListener('click', () => videoUtama.currentTime -= 10);

  videoUtama.addEventListener("play", () => {
    putarJedaIcon[i].classList.replace("fa-play", "fa-pause");
    statusVideoIcon.classList.replace("fa-pause", "fa-play");
    tampilkanStatus();
    hideControls();
  });

  videoUtama.addEventListener("pause", () => {
    putarJedaIcon[i].classList.replace("fa-pause", "fa-play");
    statusVideoIcon.classList.replace("fa-play", "fa-pause");
    tampilkanStatus();
    kendaliDesktop.classList.add('tampilkan-kendali');
    kendaliMobile.classList.add('tampilkan-kendali');
    clearTimeout(timer);
  });

  fullScreenBtn[i].addEventListener("click", () => {
    if(document.fullscreenElement) {
      fullScreenBtnIcon[i].classList.replace("fa-compress", "fa-expand");
      return document.exitFullscreen();
    }
    fullScreenBtnIcon[i].classList.replace("fa-expand", "fa-compress");
    pemutarVideo.requestFullscreen();
  });

  videoUtama.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    barDurasi[i].value = (videoUtama.currentTime / videoUtama.duration) * videoUtama.duration * 1000;
    currentBar[i].style.width = `${percent}%`;
    durasiSaatIni[i].innerText = formatTime(currentTime);
  });

  barDurasi[i].oninput = function() {
    videoUtama.currentTime = this.value / 1000;
  }
  
  videoUtama.addEventListener("loadeddata", () => {
    durasi[i].innerText = formatTime(videoUtama.duration);
    barDurasi[i].setAttribute('max', videoUtama.duration * 1000);
  });

  kendaliDesktop.addEventListener("dblclick", () => {
    if(document.fullscreenElement) {
      fullScreenBtnIcon[i].classList.replace("fa-compress", "fa-expand");
      return document.exitFullscreen();
    }
    fullScreenBtnIcon[i].classList.replace("fa-expand", "fa-compress");
    pemutarVideo.requestFullscreen();
  });
}
// Check if durasi error
setTimeout(() => {
  if (durasi[0].innerText == '00:00') {
    console.log('true');
    window.location.reload();
  }
}, 500);