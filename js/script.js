function keBagian(x) {
  location.href = x;
}
window.onscroll = function () {
  if (
    document.body.scrollTop > 180 ||
    document.documentElement.scrollTop > 180
  ) {
    navbar.classList.remove("diatas");
    tblMenu.classList.remove("diatas");
  } else {
    navbar.classList.add("diatas");
    tblMenu.classList.add("diatas");
  }
};

// Transisi Halaman
let transisi = document.getElementById("transisi-tutup");
let halaman = document.querySelectorAll("a");
for (let i = 0; i < halaman.length; i++) {
  if (
    !halaman[i].classList.contains("aktif") &&
    !halaman[i].classList.contains("redirect")
  ) {
    let x = i;
    halaman[x].addEventListener("click", () => {
      transisi.style.transform = "translateX(0)";
    });
  }
}

// Loading
let progressBar = document.querySelector(".progress-bar");
let cek = 0;
document.body.onload = () => {
  return (cek = 1);
};
progressBar.addEventListener("animationend", () => {
  if (cek == 1) {
    progressBar.classList.replace("loading", "loaded");
  } else {
    progressBar.classList.remove("loading");
    setTimeout(() => {
      progressBar.classList.add("loading");
    }, 50);
  }
});

// Penilaian
let rateBtn = document.querySelectorAll("#rate-btn");
let stars = document.querySelectorAll(".stars > input");
let rateLayer = document.querySelector("#rate-layer");
let rateBatal = document.querySelector("#cancle");
let rateKirim = document.querySelector("#send");
let rateKomentar = document.querySelector("#komentar");
let rateModal = document.querySelector(".rate-modal");
let tutupRate = document.querySelector(".tutup-penilaian");
for (let i = 0; i < rateBtn.length; i++) {
  rateBtn[i].addEventListener("click", bukaPenilaian);
}

rateKirim.disabled = true;
for (let i = 0; i < stars.length; i++) {
  stars[i].addEventListener("click", () => {
    rateKirim.disabled = false;
  });
}
rateBatal.addEventListener("click", tutupPenilaian);
tutupRate.addEventListener("click", tutupPenilaian);

rateKirim.addEventListener("click", () => {
  let bintang;
  for (let i = 0; i < stars.length; i++) {
    if (stars[i].checked) {
      bintang = stars[i].value;
    }
  }
  let revisi = rateKomentar.value.replace(/\s/g, "%20");
  let pesan = "Bintang:%20" + bintang + ",%20Komentar:%20" + revisi;
  let link = "https://wa.me/628551855122?text=" + pesan;
  window.open(link, "_blank").focus();
  tutupPenilaian();
});

window.addEventListener("click", (event) => {
  if (event.target == rateLayer) {
    tutupPenilaian();
  }
});

function bukaPenilaian() {
  rateLayer.style.display = "block";
  setTimeout(() => {
    rateLayer.classList.add("muncul");
  }, 50);
}
function tutupPenilaian() {
  rateLayer.classList.remove("muncul");
  rateModal.addEventListener(
    "transitionend",
    () => {
      rateLayer.style.display = "none";
    },
    {
      capture: false,
      once: true,
      passive: false,
    }
  );
}

// Menu New
let tblMenu = document.querySelector(".tbl-menu");
let menuMaterial = document.querySelector(".menu-material");
tblMenu.addEventListener("click", () => {
  menuMaterial.style.display = "block";
  setTimeout(() => {
    menuMaterial.classList.add("muncul");
  }, 50);
});
window.onclick = (event) => {
  if (event.target.parentElement == menuMaterial) {
    tutupMenu();
  } else {
    tutupMenu();
  }
};
function tutupMenu() {
  if (menuMaterial.classList.contains("muncul")) {
    menuMaterial.classList.remove("muncul");
    menuMaterial.addEventListener(
      "transitionend",
      () => {
        menuMaterial.style.display = "none";
      },
      {
        capture: false,
        once: true,
        passive: false,
      }
    );
  }
}

// Snackbar
let snackbar = document.querySelector(".snackbar");
let snackbarClose = document.getElementById("confirm");
let menghilang;
function showWarning() {
  snackbar.style.display = "flex";
  setTimeout(() => {
    snackbar.classList.add("muncul");
  }, 50);
  menghilang = setTimeout(() => {
    hideWarning();
  }, 6000);
  setCookie("alert", "1", 7);
}
function hideWarning() {
  clearTimeout(menghilang);
  snackbar.classList.remove("muncul");
  snackbar.addEventListener(
    "transitionend",
    () => {
      snackbar.style.display = "none";
    },
    {
      capture: false,
      once: true,
      passive: false,
    }
  );
}
snackbarClose.onclick = hideWarning;
// Cookie
// Atur Cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// Ambil Cookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// Check Cookie
function cekSnackbar() {
  let namaCookie = getCookie("alert");
  if (namaCookie != "1") {
    showWarning();
  }
}
cekSnackbar();

// Menu Old
// let tblTutup = document.querySelector(".tbl-tutup");
// let menu = document.querySelector(".menu");
// let navbar = document.getElementById("navbar");
// function bukaMenu() {
//   if (menu.classList.contains("menu-aktif")) {
//     menu.classList.remove("menu-aktif");
//   } else {
//     menu.classList.add("menu-aktif");
//   }
// }
// tblMenu.addEventListener("click", bukaMenu);
// tblTutup.addEventListener("click", bukaMenu);
