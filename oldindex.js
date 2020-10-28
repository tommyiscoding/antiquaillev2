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

  console.log("links : " + links.length);
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      scrolling = 1;
      event.preventDefault();
      const linkId = event.target.getAttribute("href");
      target = linkId;
      console.log("link : " + linkId);
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

// Bouton projet
/*
document.querySelector("#projet_link").addEventListener("click", () => {
  //ScrollTrigger.getAll().forEach(disable);
  gsap.to(window, { duration: 1, scrollTo: { y: "#projet" } });
  //.then(() => ScrollTrigger.getAll().forEach(enable));
});

// Bouton produit
document.querySelector("#produit_link").addEventListener("click", () => {
  //ScrollTrigger.getAll().forEach(disable);
  gsap.to(window, { duration: 1, scrollTo: { y: "#produit" } });
});

// Bouton equipe
document.querySelector("#equipe_link").addEventListener("click", () => {
  //ScrollTrigger.getAll().forEach(disable);
  gsap.to(window, { duration: 1, scrollTo: { y: "#equipe" } });
});

// Bouton timing
document.querySelector("#timing_link").addEventListener("click", () => {
  //ScrollTrigger.getAll().forEach(disable);
  gsap.to(window, { duration: 1, scrollTo: { y: "#timing" } });

  //gsap.then(ScrollTrigger.getAll().forEach(enable));

  //gsap.then(initScrollTrig);
});*/
/*
function disable(item) {
  item.disable(true);
}

function enable(item) {
  console.log("item:" + item);
  // item.disable(false);
  item.enable();
}*/

/*document.querySelectorAll("nav a").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    gsap.to(window, {duration: 1, scrollTo:{y:"#section" + (index + 1), offsetY:70}});
  });
});*/

// Header
/*
ScrollTrigger.create({
  trigger: "header",
  start: "top -80",
  end: 99999,
  toggleClass: {
    className: "header--scrolled",
    targets: ".header",
  },
});*/
/*
const html = document.querySelector("html");

ScrollTrigger.create({
  start: "top -80",
  end: 99999,
  onEnter: () => {
    html.style.setProperty("--header-height", "100px");
  },
  toggleClass: {
    className: "header--scrolled",
    targets: ".header",
  },
});*/

let timeline = gsap.timeline({
  scrollTrigger: {
    trigger: "header",
    start: "top -80",
    endTrigger: "video-section",
  },
});

// let logo_contract = "../assets/images/logos_ldla/LDLA_couleur_contracté.png";

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
    console.log("is scolling");
    ctrl.scrollTo(function (newpos) {
      TweenMax.to(window, 1, {
        scrollTo: { y: newpos },
        onComplete: scrollingOff,
      });
    });
    console.log("target : " + target);
    if (target == "" || target == "#video-section") {
      ctrl.scrollTo(0);
    } else {
      ctrl.scrollTo(target);
    }
  });
/*.to(window, {
    scrollTo: { y: target, duration: 0 },
    onComplete: scrollingOff,
  });*/

/* .set("#logo-nav", {
    attr: {
      src: logo_contract,
    },
  }); */
/* .then(function () {
    document.getElementById("logo-nav").src =
      "../assets/images/logos_ldla/LDLA_couleur_contracté.png";
  }); */

/*.set("#logo-nav", {
    attr: {
      src: { function() {

      }},
    },
  });*/

/*
  document.getElementById("hero").style.height = "75px";
          document.getElementById("hero").style.minHeight = "75px";

          document.querySelector(".menu-logo-img").style.width = "100px";
          document.getElementById("logo-nav").style.width = "100px";
          document.getElementById("logo-nav").style.marginTop = "25px";

          document.getElementById("logo-nav").src =
            "./assets/images/Logo LDLA/LDLA_couleur_contracté.png";
          document.getElementById("logo-nav").style.borderRadius = "50%";
          document.getElementById("logo-nav").classList.add("boxed");

          document.querySelector(".arrow-container").style.display = "none";
          */

//timeline.to(".header-reduced", { opacity: 0.6, height: 100, duration: 0 });
//timeline.to(".main", { top: 100, duration: 0 });
// timeline.to(window, { scrollTo: { y: 0, duration: 0 } });

timeline.then(initScrollTrig);

function initScrollTrig() {
  console.log("passe ici");

  gsap.utils.toArray(".panel").forEach((panel, i) => {
    console.log("panel : " + i);
    console.log("hauteur : " + i * innerHeight);

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

  /*
  // From 1 to 2
  ScrollTrigger.create({
    trigger: "section1",
    onEnter: () => {
      gsap.to(window, {
        scrollTo: { y: innerHeight, autoKill: false },
        duration: 1,
      });
    },
  });

  // From 2 to 1
  ScrollTrigger.create({
    trigger: "section1",
    start: "bottom bottom",
    onEnterBack: () => {
      gsap.to(window, {
        scrollTo: { y: 0, autoKill: false },
        duration: 1,
      });
    },
  });

  // From 2 to 3
  ScrollTrigger.create({
    trigger: "section2",
    onEnter: () => {
      gsap.to(window, {
        scrollTo: { y: innerHeight * 2, autoKill: false },
        duration: 1,
      });
    },
  });

  // From 3 to 2
  ScrollTrigger.create({
    trigger: "section2",
    start: "bottom bottom",
    onEnterBack: () => {
      gsap.to(window, {
        scrollTo: { y: innerHeight, autoKill: false },
        duration: 1,
      });
    },
  });
*/
}

/*
gsap.to(window, {
  scrollTo: { y: "#section1", autoKill: false },
});*/

/*
ScrollTrigger.create({
  trigger: "section1",
  onEnter: () =>
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: "#section2", offsetY: 100, autoKill: false },
    }),
});*/
/*
ScrollTrigger.create({
  trigger: "section2",
  start: "bottom 100",
  onEnterBack: () =>
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: "#section1", offsetY: 100, autoKill: false },
    }),
});*/
/*
ScrollTrigger.create({
  trigger: "section2",
  start: "200 -80",
  onEnter: () =>
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: "#section3", offsetY: 100, autoKill: false },
    }),
});*/

// Scroll to sections

function goToSection(i, anim) {
  console.log("go to panel : " + i);
  console.log("go to hauteur : " + i * innerHeight);

  gsap.to(window, {
    scrollTo: { y: i * innerHeight, autoKill: false },
    duration: 1,
    ease: Power3.easeOut,
  });

  if (anim) {
    anim.restart();
  }
}

// let innerH = window.innerHeight;
/*
function initPanelScroll() {
  console.log("panels : " + gsap.utils.toArray(".panel"));
  gsap.utils.toArray(".panel").forEach((panel, i) => {
    console.log("panel : " + i);
    console.log("hauteur : " + i * innerHeight);

    ScrollTrigger.create({
      trigger: panel,
      onEnter: () => goToSection(i + 1),
    });

    ScrollTrigger.create({
      trigger: panel,
      start: "bottom bottom",
      onEnterBack: () => goToSection(i),
    });
  });
}*/

/*
ScrollTrigger.create({
  trigger: "section1",
  start: top - 80,
  onEnter: () => {
    gsap.to(window, {
      scrollTo: { y: innerHeight, autoKill: false },
      duration: 1,
    });
  },
});
*/
/*
window.addEventListener("resize", function() {
  stfw.forEach((st) => {
    st.
});*/

// The relevant part to keeping the progress
/*
stfw.forEach((st) => {
  ScrollTrigger.addEventListener("refreshInit", () => (progress = st.progress));
  ScrollTrigger.addEventListener("refresh", () =>
    st.scroll(progress * ScrollTrigger.maxScroll(window))
  );
});

strw.forEach((st) => {
  ScrollTrigger.addEventListener("refreshInit", () => (progress = st.progress));
  ScrollTrigger.addEventListener("refresh", () =>
    st.scroll(progress * ScrollTrigger.maxScroll(window))
  );
});*/

console.log(ScrollTrigger.getAll());
