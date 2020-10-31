import { gsap, Power3, TweenMax, TimelineMax, Power0 } from "gsap";
import { Timeline } from "gsap/gsap-core";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollMagic from "scrollmagic";

// Enregistrement des plugins GSAP
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const header = document.querySelector(".header");

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

/***********
Navigation
************/

let scrolling = 0;
let target = "";

function scrollingOff() {
  scrolling = 0;
}

window.addEventListener("load", function () {
  const links = document.querySelectorAll(".menu-link");
  let ctrl = new ScrollMagic.Controller({});

  console.log("Link 0 : " + links[0]);
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

  // Arrow
  const arrowLink = document.querySelector(".arrow-scroll");
  console.log("Arrow : " + arrowLink);

  arrowLink.addEventListener("click", function (e) {
    scrolling = 1;
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

    let video = document.querySelector("video");
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

    initScrollTrig();

    /*const linkId = e.target.getAttribute("href");

    console.log("target : " + linkId);
    ctrl.scrollTo(function (newpos) {
      TweenMax.to(window, 1, {
        scrollTo: { y: newpos },
        onComplete: scrollingOff,
      });
    });

    ctrl.scrollTo(linkId);*/
  });
});

// Header

let timeline = gsap.timeline({
  scrollTrigger: {
    trigger: "header",
    start: "top -80",
    endTrigger: "home",
  },
});

timeline
  .to(".menu-logo-img", { width: 100 })
  .set("#logo-nav", {
    display: "none",
  })
  .set("#logo-nav-contract", {
    display: "block",
  })
  .set(".arrow-container", { display: "none" })
  //.to("#logo-nav", { opacity: 0 })
  .to("#logo-nav-contract", { opacity: 1 })
  .to("#logo-nav-contract", { marginTop: 25 })
  .to(".header", { height: 75, duration: 0.3 })
  .add(function () {
    let ctrl = new ScrollMagic.Controller({});
    scrolling = 1;
    ctrl.scrollTo(function (newpos) {
      TweenMax.to(window, 1, {
        scrollTo: { y: newpos },
        onComplete: scrollingOff,
      });
    });
    if (target == "" || target == "#home") {
      ctrl.scrollTo(0);
    } else {
      ctrl.scrollTo(target);
    }
  });

timeline.then(initScrollTrig);

function initScrollTrig() {
  console.log("passe ici");

  console.log("produit top " + document.getElementById("produit").offsetTop);
  console.log("produit top " + document.getElementById("equipe").offsetTop);

  let arrayOffsetTop = [];
  let panels = document.querySelectorAll(".panel");

  gsap.utils.toArray(".panel").forEach((panel, i) => {
    //if (i != 0) {
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
    //}
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
    let video = document.querySelector("video");
    video.currentTime = 0;
    video.play();
  },
});

/* ScrollTrigger.create({
  trigger: ".projet-section",
  start: "top top",
  horizontal: true,
  onEnter: () => {},
}); */
let intervalProjet;
let intervalEquipe;

// Redémarrage du slide projet quand on arrive sur la section
ScrollTrigger.create({
  trigger: ".projet-section",
  onEnterBack: () => {
    console.log("démarrage slide projet");
    clearInterval(intervalProjet);
    intervalProjet = setInterval(slideProjet, 15000);
  },
  onEnter: () => {
    console.log("démarrage slide projet");
    clearInterval(intervalProjet);
    intervalProjet = setInterval(slideProjet, 15000);
  },
});

// Redémarrage du slide équipe quand on arrive sur la section
ScrollTrigger.create({
  trigger: ".equipe-section",
  onEnterBack: () => {
    console.log("démarrage slide equipe");
    clearInterval(intervalEquipe);
    intervalEquipe = setInterval(slideEquipe, 15000);
  },
  onEnter: () => {
    console.log("démarrage slide equipe");
    clearInterval(intervalEquipe);
    intervalEquipe = setInterval(slideEquipe, 15000);
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

/*
let ctrl = new ScrollMagic.Controller();

let horizontalSlide = new Timeline().to(".container-projet", 1, {
  left: 2 * -80 + "%",
  ease: Power0.easeNone,
});

new ScrollMagic.Scene({
  triggerElement: ".projet-section",
  triggerHook: "onLeave",
  duration: "600%",
})
  .setPin(".projet-section")
  .setTween(horizontalSlide)
  .addTo(ctrl);*/

/* ScrollTrigger.create({
  trigger: ".projet-section",
  start: "top top",
  pin: true,
  horizontal: true,
}); */
