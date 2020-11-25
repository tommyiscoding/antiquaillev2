import { gsap, Power3, TweenMax } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollMagic from "scrollmagic";

let cookiesConsent = false;
let arrowScroll = false;

const video = document.querySelector("video");

window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

// Enregistrement des plugins GSAP
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const header = document.querySelector(".header");

/***********
Navigation
************/

let scrolling = 0;
let target = "";

function scrollingOff() {
  scrolling = 0;
}

const links = document.querySelectorAll(".menu-link");
let ctrl = new ScrollMagic.Controller({});

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (event) {
    scrolling = 1;
    event.preventDefault();
    const linkId = event.target.getAttribute("href");
    target = linkId;
    ctrl.scrollTo(function (newpos) {
      TweenMax.to(window, 1, {
        scrollTo: { y: newpos },
        onComplete: scrollingOff,
      });
    });

    ctrl.scrollTo(linkId);
  });
}

const mobilelinks = document.querySelectorAll(".nav-menu-link");

for (let i = 0; i < mobilelinks.length; i++) {
  mobilelinks[i].addEventListener("click", function (event) {
    scrolling = 1;
    event.preventDefault();
    const linkId = event.target.getAttribute("href");
    target = linkId;
    menuMobileClose();
    ctrl.scrollTo(function (newpos) {
      TweenMax.to(window, 1, {
        scrollTo: { y: newpos },
        onComplete: scrollingOff,
      });
    });

    ctrl.scrollTo(linkId);
  });
}

// Arrow
const arrowLink = document.querySelector(".arrow-scroll");

arrowLink.addEventListener("click", function (e) {
  scrolling = 1;

  arrowScroll = true;
  e.preventDefault();

  gsap.to(".menu-logo-img", { width: 100 });
  gsap.set("#logo-nav", {
    display: "none",
  });

  gsap.set("#logo-nav-contract", {
    display: "block",
  });
  gsap.set(".arrow-container", { display: "none" });
  //.to("#logo-nav", { opacity: 0 })
  gsap.to("#logo-nav-contract", { opacity: 1 });
  gsap.to("#logo-nav-contract", { marginTop: 25 });
  gsap.to(".header", { height: 75, duration: 0.3 });

  /* let video = document.querySelector("video");
  video.currentTime = 0;
  video.play();
 */

  video.currentTime = 0;
  video.play();

  let ctrl = new ScrollMagic.Controller({});
  scrolling = 1;
  ctrl.scrollTo(function (newpos) {
    TweenMax.to(window, 1, {
      scrollTo: { y: newpos },
      onComplete: scrollingOff,
    });
  });
  ctrl.scrollTo("#home");

  if (cookiesConsent == false) {
    gsap.to(".cookies-consent", {
      height: 75,
      duration: 0.3,
      delay: 1.5,
    });
    //.set(".box", { display: "block" });
  }

  initScrollTrig();
});

// Header
ScrollTrigger.matchMedia({
  "(min-width: 769px)": function () {
    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "header",
        start: "top -80",
        endTrigger: "home",
      },
    });

    if (arrowScroll == false) {
      console.log("arrow scroll est false mais");
      timeline
        .to(".menu-logo-img", { width: 100 })
        .set("#logo-nav", {
          display: "none",
        })
        .set("#logo-nav-contract", {
          display: "block",
        })
        .set(".arrow-container", { display: "none" })
        .to("#logo-nav-contract", { opacity: 1 })
        .to("#logo-nav-contract", { marginTop: 25 })
        .to(".header", { height: 75, duration: 0.3 })
        .add(function () {
          console.log("give me arrow " + (arrowScroll == false));
          if (arrowScroll) {
            console.log("do noting");
          } else {
            console.log("timeline");
            let ctrl = new ScrollMagic.Controller({});
            scrolling = 1;
            ctrl.scrollTo(function (newpos) {
              console.log("newpos : " + newpos);
              TweenMax.to(window, 1, {
                scrollTo: { y: newpos },
                onComplete: scrollingOff,
              });
            });

            console.log("target : " + target);

            if (target == "" || target == "#home") {
              ctrl.scrollTo(0);
            } else {
              ctrl.scrollTo(target);
            }
          }
        });

      timeline.then(function () {
        console.log("timeline then");
        console.log("arrow scroll " + arrowScroll);
        if (!arrowScroll) {
          initScrollTrig();
        }
        cookiesConsentDisplay();
      });
    }
  },

  "(max-width: 768px)": function () {
    initScrollTrig();
    cookiesConsentDisplay();
  },
});

function cookiesConsentDisplay() {
  if (cookiesConsent == false) {
    gsap.to(".cookies-consent", {
      height: 75,
      duration: 0.3,
      delay: 1.5,
    });
  }
}

function initScrollTrig() {
  console.log("passe ici");

  console.log("produit top " + document.getElementById("produit").offsetTop);
  console.log("produit top " + document.getElementById("equipe").offsetTop);

  let arrayOffsetTop = [];
  let panels = document.querySelectorAll(".panel");

  gsap.utils.toArray(".panel").forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: panel,
      onEnter: () => {
        console.log("scrolling : " + scrolling);
        console.log("panel : " + panels[i].offsetTop);

        if (scrolling === 0) {
          goToOffsetY(panels[i].offsetTop);
        }
      },
      invalidateOnRefresh: true,
    });
    ScrollTrigger.create({
      trigger: panel,
      start: "bottom bottom",
      onEnterBack: () => {
        if (scrolling === 0) {
          goToOffsetY(panels[i].offsetTop);
        }
      },
      invalidateOnRefresh: true,
    });
  });
}

// Scroll to sections
function goToOffsetY(offsetY, anim) {
  console.log(offsetY);
  gsap.to(window, {
    scrollTo: { y: offsetY, autoKill: false },
    duration: 1,
    ease: Power3.easeOut,
  });

  if (anim) {
    anim.restart();
  }
}

function goToSection(i, anim) {
  console.log(i);
  gsap.to(window, {
    scrollTo: { y: i * innerHeight, autoKill: false },
    duration: 1,
    ease: Power3.easeOut,
  });

  if (anim) {
    anim.restart();
  }
}

// Redémarrage au début de la vidéo quand on arrive sur la section
ScrollTrigger.create({
  trigger: ".video-section",
  start: "top top",
  onEnter: () => {
    video.currentTime = 0;
    video.play();
  },
  onEnterBack: () => {
    video.currentTime = 0;
    video.play();
  },
});

let intervalProjet;
let intervalEquipe;

// Redémarrage du slide projet quand on arrive sur la section
ScrollTrigger.create({
  trigger: ".projet-section",
  onEnterBack: () => {
    intervalProjet = setInterval(slideProjet, 15000);
  },
  onEnter: () => {
    intervalProjet = setInterval(slideProjet, 15000);
  },
  onLeave: () => {
    clearInterval(intervalProjet);
    gsap.to(".container-projet", { marginLeft: 0 });
  },
  onLeaveBack: () => {
    clearInterval(intervalProjet);
    gsap.to(".container-projet", { marginLeft: 0 });
  },
});

// Redémarrage du slide équipe quand on arrive sur la section
ScrollTrigger.create({
  trigger: ".equipe-section",
  onEnterBack: () => {
    intervalEquipe = setInterval(slideEquipe, 15000);
  },
  onEnter: () => {
    intervalEquipe = setInterval(slideEquipe, 15000);
  },
  onLeave: () => {
    clearInterval(intervalEquipe);
    gsap.to(".container-equipe", { marginLeft: 0 });
  },
  onLeaveBack: () => {
    clearInterval(intervalEquipe);
    gsap.to(".container-equipe", { marginLeft: 0 });
  },
});

/* Slider projet */

let projetNumPage = 1;
let equipeNumPage = 1;

document
  .getElementById("projet-page2")
  .addEventListener("click", function (event) {
    projetNumPage = 2;
    gsap.to(".container-projet", { marginLeft: -100 + "%", duration: 0.8 });
    clearInterval(intervalProjet);
  });

document
  .getElementById("origine-page1")
  .addEventListener("click", function (event) {
    projetNumPage = 1;
    gsap.to(".container-projet", { marginLeft: 0, duration: 0.8 });
    clearInterval(intervalProjet);
  });

/* Slider equipe */
document
  .getElementById("equipe-page2")
  .addEventListener("click", function (event) {
    equipeNumPage = 2;
    gsap.to(".container-equipe", { marginLeft: -100 + "%", duration: 0.8 });
    clearInterval(intervalEquipe);
  });

document
  .getElementById("florent-page1")
  .addEventListener("click", function (event) {
    equipeNumPage = 1;
    gsap.to(".container-equipe", { marginLeft: 0, duration: 0.8 });
    clearInterval(intervalEquipe);
  });

function slideProjet() {
  if (projetNumPage === 1) {
    projetNumPage = 2;
    gsap.to(".container-projet", { marginLeft: -100 + "%", duration: 0.8 });
  } else {
    projetNumPage = 1;
    gsap.to(".container-projet", { marginLeft: 0, duration: 0.8 });
  }
}

function slideEquipe() {
  if (equipeNumPage === 1) {
    equipeNumPage = 2;
    gsap.to(".container-equipe", { marginLeft: -100 + "%", duration: 0.8 });
  } else {
    equipeNumPage = 1;
    gsap.to(".container-equipe", { marginLeft: 0, duration: 0.8 });
  }
}

document
  .getElementById("open-modal-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("body").style.overflowY = "hidden";
    document.querySelector(".bg-modal").style.display = "flex";

    document.addEventListener("click", function (e) {
      console.log("click");
      console.log(e.target.id);
      // If user clicks inside the element, do nothing
      if (
        e.target.closest(".modal-content") ||
        e.target.id == "open-modal-button"
      ) {
        console.log("detewt");
        return;
      }

      // If user clicks outside the element, hide it!
      document.querySelector(".bg-modal").style.display = "none";
      document.querySelector("body").style.overflowY = "visible";

      document.querySelector("#checkbox").checked = false;
      document
        .querySelector("#mc-embedded-subscribe")
        .classList.add("disabled");
    });
  });

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "none";
  document.querySelector("body").style.overflowY = "visible";

  document.querySelector("#checkbox").checked = false;
  document.querySelector("#mc-embedded-subscribe").classList.add("disabled");
});

// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  /* navLinks.classList.toggle("open");
  document.querySelector(".hamburger").style.display = "none"; */
  menuMobileOpen();
});

const hamburgerClose = document.querySelector(".close-hamburger");
hamburgerClose.addEventListener("click", () => {
  /*  navLinks.classList.toggle("open");
  document.querySelector(".hamburger").style.display = "block"; */
  menuMobileClose();
});

// Cookies consent
const consentOK = document.getElementById("consent-btn");
consentOK.addEventListener("click", function (event) {
  event.preventDefault();
  cookiesConsent = true;
  gsap.to(".cookies-consent", { height: 0, duration: 0.5 });
});

function menuMobileOpen() {
  navLinks.classList.toggle("open");
  document.querySelector(".hamburger").style.display = "none";
}

function menuMobileClose() {
  navLinks.classList.toggle("open");
  document.querySelector(".hamburger").style.display = "block";
}
