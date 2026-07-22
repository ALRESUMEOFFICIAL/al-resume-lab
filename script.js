/*==================================================
AL RESUME LAB
SCRIPT.JS
PART 1
Loader • Header • Navigation • Scroll
==================================================*/

"use strict";

/*==============================
ELEMENTS
==============================*/

const loader = document.querySelector(".loader");
const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const scrollProgress = document.querySelector(".scroll-progress");
const backTop = document.querySelector(".back-top");

/*==============================
PAGE LOADER
==============================*/

window.addEventListener("load", () => {

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 500);

});

/*==============================
STICKY HEADER
==============================*/

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

/*==============================
SCROLL PROGRESS
==============================*/

function updateProgress() {

    if (!scrollProgress) return;

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (window.scrollY / totalHeight) * 100;

    scrollProgress.style.width =
        progress + "%";

}

/*==============================
BACK TO TOP
==============================*/

function toggleBackTop() {

    if (!backTop) return;

    if (window.scrollY > 400) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

}

if (backTop) {

    backTop.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*==============================
MOBILE MENU
==============================*/

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active");

    });

}

/*==============================
CLOSE MENU
==============================*/

navItems.forEach((item)=>{

    item.addEventListener("click",()=>{

        navLinks?.classList.remove("active");

        menuToggle?.classList.remove("active");

    });

});

/*==============================
CLICK OUTSIDE MENU
==============================*/

document.addEventListener("click",(e)=>{

    if(
        !navLinks ||
        !menuToggle
    ) return;

    if(
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)
    ){

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

    }

});

/*==============================
ESC KEY
==============================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        navLinks?.classList.remove("active");

        menuToggle?.classList.remove("active");

    }

});

/*==============================
SMOOTH SCROLL
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",(e)=>{

        const id=link.getAttribute("href");

        if(id==="#" || !document.querySelector(id))
            return;

        e.preventDefault();

        const target=document.querySelector(id);

        const top=
        target.offsetTop-
        80;

        window.scrollTo({

            top,

            behavior:"smooth"

        });

    });

});

/*==============================
SCROLL EVENTS
==============================*/

window.addEventListener("scroll",()=>{

    updateHeader();

    updateProgress();

    toggleBackTop();

});

/*==============================
INIT
==============================*/

updateHeader();

updateProgress();

toggleBackTop();

/*==================================================
AL RESUME LAB
SCRIPT.JS
PART 2
FAQ • Reveal Animation • Counters • Progress Bars
==================================================*/

"use strict";

/*====================================
FAQ ACCORDION
====================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const button = item.querySelector(".faq-question");

    button?.addEventListener("click", () => {

        faqItems.forEach((faq) => {

            if (faq !== item) {

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});

/*====================================
SCROLL REVEAL
====================================*/

const revealItems = document.querySelectorAll(

".fade-up,.feature-card,.pricing-card,.testimonial-card,.stat-card,.resume-window,.trusted-logos,.section-header"

);

const revealObserver = new IntersectionObserver(

(entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

revealObserver.unobserve(entry.target);

}

});

},

{

threshold:0.15

}

);

revealItems.forEach((item)=>{

item.classList.add("fade-up");

revealObserver.observe(item);

});

/*====================================
COUNTER ANIMATION
====================================*/

const counters=document.querySelectorAll(

".stat-card h2,.stat-box h2"

);

const counterObserver=new IntersectionObserver(

(entries)=>{

entries.forEach((entry)=>{

if(!entry.isIntersecting) return;

const element=entry.target;

const value=parseInt(

element.textContent.replace(/\D/g,"")

);

const suffix=element.textContent.replace(/[0-9]/g,"");

let current=0;

const speed=Math.ceil(value/80);

const timer=setInterval(()=>{

current+=speed;

if(current>=value){

current=value;

clearInterval(timer);

}

element.textContent=current+suffix;

},20);

counterObserver.unobserve(element);

});

},

{

threshold:.5

}

);

counters.forEach(counter=>{

counterObserver.observe(counter);

});

/*====================================
ATS PROGRESS BAR
====================================*/

const progressBars=document.querySelectorAll(".fill");

const progressObserver=new IntersectionObserver(

(entries)=>{

entries.forEach((entry)=>{

if(!entry.isIntersecting) return;

const bar=entry.target;

const width=bar.dataset.width || "90%";

bar.style.width="0";

setTimeout(()=>{

bar.style.transition="width 1.5s ease";

bar.style.width=width;

},100);

progressObserver.unobserve(bar);

});

});

progressBars.forEach(bar=>{

progressObserver.observe(bar);

});

/*====================================
CARD HOVER EFFECT
====================================*/

const cards=document.querySelectorAll(

".feature-card,.pricing-card,.testimonial-card"

);

cards.forEach((card)=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.setProperty("--mouse-x",x+"px");

card.style.setProperty("--mouse-y",y+"px");

});

});

/*====================================
BUTTON ANIMATION
====================================*/

document.querySelectorAll(

".primary-btn,.secondary-btn"

).forEach((btn)=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-4px)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0)";

});

});

/*====================================
END PART 2
====================================*/

/*==================================================
AL RESUME LAB
SCRIPT.JS
PART 3
Final Optimization • Forms • Lazy Load •
Performance • Initialization
==================================================*/

"use strict";

/*====================================
LAZY IMAGE LOADING
====================================*/

const lazyImages = document.querySelectorAll("img[data-src]");

if ("IntersectionObserver" in window) {

    const imageObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const image = entry.target;

                image.src = image.dataset.src;

                image.removeAttribute("data-src");

                image.classList.add("loaded");

                observer.unobserve(image);

            });

        },

        {
            threshold: 0.1
        }

    );

    lazyImages.forEach((img) => {

        imageObserver.observe(img);

    });

}

/*====================================
FORM HANDLING
====================================*/

const forms = document.querySelectorAll("form");

forms.forEach((form) => {

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const submitButton = form.querySelector(
            'button[type="submit"]'
        );

        if (!submitButton) return;

        const originalText = submitButton.innerHTML;

        submitButton.disabled = true;

        submitButton.innerHTML =
            '<i class="ri-loader-4-line ri-spin"></i> Please Wait...';

        setTimeout(() => {

            submitButton.disabled = false;

            submitButton.innerHTML = originalText;

        }, 1800);

    });

});

/*====================================
WINDOW RESIZE
====================================*/

window.addEventListener("resize", () => {

    if (window.innerWidth > 991) {

        navLinks?.classList.remove("active");

        menuToggle?.classList.remove("active");

    }

});

/*====================================
PAGE VISIBILITY
====================================*/

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        console.log("Page Hidden");

    } else {

        console.log("Page Active");

    }

});

/*====================================
DISABLE DRAGGING (OPTIONAL)
====================================*/

document.querySelectorAll("img").forEach((image) => {

    image.setAttribute("draggable", "false");

});

/*====================================
PRELOAD ANIMATIONS
====================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/*====================================
SMOOTH PAGE TRANSITION
====================================*/

document.body.style.opacity = "0";

window.addEventListener("load", () => {

    setTimeout(() => {

        document.body.style.transition =
            "opacity .4s ease";

        document.body.style.opacity = "1";

    }, 100);

});

/*====================================
PERFORMANCE
====================================*/

window.addEventListener(

    "scroll",

    () => {},

    {
        passive: true
    }

);

/*====================================
CONSOLE MESSAGE
====================================*/

console.log(`
========================================
        AL RESUME LAB
AI-Powered Resume & ATS Checker
========================================

Status  : Ready
Version : 2.0
Mode    : Production

Developed by AL Resume Lab
========================================
`);

/*====================================
INITIALIZE
====================================*/

function initializeWebsite() {

    updateHeader();
    updateProgress();
    toggleBackTop();

    console.log("All Components Loaded Successfully.");

}

document.addEventListener(

    "DOMContentLoaded",

    initializeWebsite

);

/*====================================
END OF FILE
====================================*/
if (window.innerWidth <= 768) {
  document.querySelectorAll(
    '.cursor-dot, .cursor-outline, .click-dot'
  ).forEach(el => el.remove());
}
