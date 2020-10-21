import { gsap, Power3 } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrement des plugins GSAP
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

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
    //scroller: ".smooth-scroll",
    trigger: "section1",
    start: "top top",
  },
});

timeline.to(".header", { height: 75, duration: 0.3 });
//timeline.to(".header-reduced", { opacity: 0.6, height: 100, duration: 0 });
//timeline.to(".main", { top: 100, duration: 0 });
timeline.to(window, { scrollTo: { y: 0, duration: 0 } });

timeline.then(initScrollTrig);

function initScrollTrig() {
  console.log("passe ici");

  gsap.utils.toArray(".panel").forEach((panel, i) => {
    console.log("panel : " + i);
    console.log("hauteur : " + i * innerHeight);

    //if (i != 0) {
    ScrollTrigger.create({
      trigger: panel,
      onEnter: () => goToSection(i),
      invalidateOnRefresh: true,
    });
    //}
    ScrollTrigger.create({
      trigger: panel,
      start: "bottom bottom",
      onEnterBack: () => goToSection(i),
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
