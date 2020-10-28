import { gsap, Power3, TweenMax } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollMagic from "scrollmagic";

// Enregistrement des plugins GSAP
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const header = document.querySelector(".header");

/***********
Navigation
************/

let scrolling = 0;

function scrollingOff() {
  scrolling = 0;
}

let target = "";

window.addEventListener("load", function () {
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
});

// Header

let timeline = gsap.timeline({
  scrollTrigger: {
    trigger: "header",
    start: "top -80",
    endTrigger: "video-section",
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
    if (target == "" || target == "#video-section") {
      ctrl.scrollTo(0);
    } else {
      ctrl.scrollTo(target);
    }
  });

timeline.then(initScrollTrig);

function initScrollTrig() {
  console.log("passe ici");

  gsap.utils.toArray(".panel").forEach((panel, i) => {
    //if (i != 0) {
    ScrollTrigger.create({
      trigger: panel,
      onEnter: () => {
        console.log("scrolling : " + scrolling);
        if (scrolling === 0) {
          goToSection(i);
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
          goToSection(i);
        }
      },
      invalidateOnRefresh: true,
    });
  });
}

// Scroll to sections
function goToSection(i, anim) {
  gsap.to(window, {
    scrollTo: { y: i * innerHeight, autoKill: false },
    duration: 1,
    ease: Power3.easeOut,
  });

  if (anim) {
    anim.restart();
  }
}
