/*==================================================
AL RESUME LAB
SCRIPT.JS
PART 1
Loader • Sticky Header • Scroll Progress
==================================================*/

"use strict";

/*==========================
ELEMENTS
==========================*/

const loader = document.querySelector(".loader");

const header = document.querySelector(".header");

const scrollProgress = document.querySelector(".scroll-progress");

/*==========================
WINDOW LOAD
==========================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        if (loader) {

            loader.classList.add("hidden");

        }

    }, 700);

});

/*==========================
STICKY HEADER
==========================*/

function stickyHeader() {

    if (!header) return;

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", stickyHeader);

/*==========================
SCROLL PROGRESS BAR
==========================*/

function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (scrollTop / pageHeight) * 100;

    scrollProgress.style.width =
        progress + "%";

}

window.addEventListener(
    "scroll",
    updateScrollProgress
);

/*==========================
INITIALIZE
==========================*/

stickyHeader();

updateScrollProgress();
/*==================================================
AL RESUME LAB
SCRIPT.JS
PART 2
Mobile Menu • Theme Toggle
==================================================*/

"use strict";

/*==========================
ELEMENTS
==========================*/

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

const themeBtn = document.querySelector(".theme-btn");
const themeIcon = document.querySelector(".theme-btn i");

/*==========================
MOBILE MENU
==========================*/

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("ri-menu-3-line");
            icon.classList.add("ri-close-line");

        } else {

            icon.classList.remove("ri-close-line");
            icon.classList.add("ri-menu-3-line");

        }

    });

}

/*==========================
CLOSE MENU AFTER CLICK
==========================*/

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("ri-close-line");
        icon.classList.add("ri-menu-3-line");

    });

});

/*==========================
THEME TOGGLE
==========================*/

const savedTheme = localStorage.getItem("al-theme");

if (savedTheme === "light") {

    document.body.classList.add("light-theme");

    if (themeIcon) {

        themeIcon.classList.remove("ri-moon-line");
        themeIcon.classList.add("ri-sun-line");

    }

}

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight =
            document.body.classList.contains("light-theme");

        if (isLight) {

            localStorage.setItem("al-theme", "light");

            themeIcon.classList.remove("ri-moon-line");
            themeIcon.classList.add("ri-sun-line");

        } else {

            localStorage.setItem("al-theme", "dark");

            themeIcon.classList.remove("ri-sun-line");
            themeIcon.classList.add("ri-moon-line");

        }

    });

}

/*==========================
ESC KEY CLOSE MENU
==========================*/

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        navLinks.classList.remove("active");

        const icon = menuToggle?.querySelector("i");

        if (icon) {

            icon.classList.remove("ri-close-line");
            icon.classList.add("ri-menu-3-line");

        }

    }

});
/*==================================================
AL RESUME LAB
SCRIPT.JS
PART 3
FAQ Accordion • Back To Top
==================================================*/

"use strict";

/*==========================
ELEMENTS
==========================*/

const faqItems = document.querySelectorAll(".faq-item");
const faqButtons = document.querySelectorAll(".faq-question");

const backTop = document.querySelector(".back-top");

/*==========================
FAQ ACCORDION
==========================*/

faqButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const currentItem = button.parentElement;

        faqItems.forEach((item) => {

            if (item !== currentItem) {

                item.classList.remove("active");

            }

        });

        currentItem.classList.toggle("active");

    });

});

/*==========================
BACK TO TOP BUTTON
==========================*/

function toggleBackTop() {

    if (!backTop) return;

    if (window.scrollY > 400) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

}

window.addEventListener("scroll", toggleBackTop);

/*==========================
BACK TO TOP CLICK
==========================*/

if (backTop) {

    backTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*==========================
SMOOTH SECTION LINKS
==========================*/

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (e) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        const headerHeight = document.querySelector(".header")?.offsetHeight || 0;

        const topPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

        window.scrollTo({

            top: topPosition,

            behavior: "smooth"

        });

    });

});

/*==========================
INITIALIZE
==========================*/

toggleBackTop();
/*==================================================
AL RESUME LAB
SCRIPT.JS
PART 4
Custom Cursor • Scroll Reveal • Floating Effects
==================================================*/

"use strict";

/*==========================
ELEMENTS
==========================*/

const cursor = document.querySelector(".cursor");
const cursorBlur = document.querySelector(".cursor-blur");

/*==========================
CUSTOM CURSOR
==========================*/

if (cursor && cursorBlur) {

    window.addEventListener("mousemove", (e) => {

        const x = e.clientX;
        const y = e.clientY;

        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;

        cursorBlur.style.left = `${x - 80}px`;
        cursorBlur.style.top = `${y - 80}px`;

    });

}

/*==========================
CURSOR HOVER EFFECT
==========================*/

const hoverElements = document.querySelectorAll(
    "a, button, .feature-card, .pricing-card, .testimonial-card"
);

hoverElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        if (!cursor || !cursorBlur) return;

        cursor.style.transform = "scale(1.8)";
        cursorBlur.style.transform = "scale(1.25)";

    });

    element.addEventListener("mouseleave", () => {

        if (!cursor || !cursorBlur) return;

        cursor.style.transform = "scale(1)";
        cursorBlur.style.transform = "scale(1)";

    });

});

/*==========================
SCROLL REVEAL
==========================*/

const revealElements = document.querySelectorAll(
    "section, .feature-card, .pricing-card, .testimonial-card, .stat-box"
);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach((element) => {

    element.classList.add("fade-up");

    revealObserver.observe(element);

});

/*==========================
FLOATING ANIMATION
==========================*/

const floatingCards = document.querySelectorAll(".floating-card");

window.addEventListener("mousemove", (e) => {

    const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 20;

    floatingCards.forEach((card, index) => {

        const speed = (index + 1) * 0.6;

        card.style.transform =
            `translate(${moveX * speed}px, ${moveY * speed}px)`;

    });

});

/*==========================
PARALLAX HERO
==========================*/

const heroImage = document.querySelector(".hero-image");

window.addEventListener("scroll", () => {

    if (!heroImage) return;

    const offset = window.scrollY * 0.12;

    heroImage.style.transform = `translateY(${offset}px)`;

});
/*==================================================
AL RESUME LAB
SCRIPT.JS
PART 5
Counters • Progress Bars • Interactive Effects
==================================================*/

"use strict";

/*==========================
ANIMATED COUNTERS
==========================*/

const counterElements = document.querySelectorAll(
    ".stat-card h2, .stat-box h2"
);

function animateCounter(element) {

    const text = element.textContent.trim();

    const number = parseInt(text.replace(/\D/g, ""), 10);

    if (!number || element.dataset.done) return;

    element.dataset.done = "true";

    const suffix = text.replace(/[0-9]/g, "");

    let current = 0;

    const increment = Math.max(1, Math.ceil(number / 80));

    const timer = setInterval(() => {

        current += increment;

        if (current >= number) {

            current = number;

            clearInterval(timer);

        }

        element.textContent = current + suffix;

    }, 20);

}

const counterObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

            }

        });

    },

    {
        threshold: 0.5
    }

);

counterElements.forEach((counter) => {

    counterObserver.observe(counter);

});

/*==========================
PROGRESS BAR ANIMATION
==========================*/

const progressBars = document.querySelectorAll(".fill");

const progressObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const bar = entry.target;

            const finalWidth = bar.classList.contains("w95") ? "95%" :
                               bar.classList.contains("w92") ? "92%" :
                               bar.classList.contains("w90") ? "90%" :
                               bar.classList.contains("w96") ? "96%" :
                               "100%";

            bar.style.width = "0%";

            requestAnimationFrame(() => {

                bar.style.transition = "width 1.6s ease";

                bar.style.width = finalWidth;

            });

        });

    },

    {
        threshold: 0.35
    }

);

progressBars.forEach((bar) => {

    progressObserver.observe(bar);

});

/*==========================
BUTTON RIPPLE EFFECT
==========================*/

const buttons = document.querySelectorAll(
    ".primary-btn, .secondary-btn"
);

buttons.forEach((button) => {

    button.addEventListener("click", (event) => {

        const ripple = document.createElement("span");

        const rect = button.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.left =
            event.clientX - rect.left - size / 2 + "px";

        ripple.style.top =
            event.clientY - rect.top - size / 2 + "px";

        ripple.className = "ripple";

        button.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/*==========================
CARD HOVER EFFECT
==========================*/

const cards = document.querySelectorAll(
    ".feature-card, .pricing-card, .testimonial-card"
);

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

    });

});
/*==================================================
AL RESUME LAB
SCRIPT.JS
PART 6
Final Initialization • Utilities • Performance
==================================================*/

"use strict";

/*==========================
PREVENT MULTIPLE SUBMITS
==========================*/

document.querySelectorAll("form").forEach((form) => {

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const submitBtn =
            form.querySelector('button[type="submit"]');

        if (!submitBtn) return;

        submitBtn.disabled = true;

        const oldText = submitBtn.innerHTML;

        submitBtn.innerHTML =
            '<i class="ri-loader-4-line"></i> Processing...';

        setTimeout(() => {

            submitBtn.disabled = false;

            submitBtn.innerHTML = oldText;

        }, 1800);

    });

});

/*==========================
WINDOW RESIZE
==========================*/

window.addEventListener("resize", () => {

    if (window.innerWidth > 991) {

        const nav = document.querySelector(".nav-links");

        if (nav) {

            nav.classList.remove("active");

        }

    }

});

/*==========================
KEYBOARD SHORTCUT
==========================*/

document.addEventListener("keydown", (event) => {

    /* Press "/" to search (future feature) */

    if (
        event.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(
            document.activeElement.tagName
        )
    ) {

        event.preventDefault();

        console.log("Search feature coming soon.");

    }

});

/*==========================
PAGE VISIBILITY
==========================*/

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        console.log("AL Resume Lab paused.");

    } else {

        console.log("Welcome back!");

    }

});

/*==========================
LAZY IMAGE SUPPORT
==========================*/

const lazyImages = document.querySelectorAll("img[data-src]");

if ("IntersectionObserver" in window) {

    const imageObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const img = entry.target;

                img.src = img.dataset.src;

                img.removeAttribute("data-src");

                observer.unobserve(img);

            });

        }

    );

    lazyImages.forEach((img) => {

        imageObserver.observe(img);

    });

}

/*==========================
CONSOLE MESSAGE
==========================*/

console.log(`
====================================
        AL RESUME LAB
 AI-Powered Resume & ATS Checker
====================================

Website Initialized Successfully.
Version: 1.0
Status : Ready
`);

/*==========================
INITIALIZATION
==========================*/

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("loaded");

    console.log("All components initialized.");

});

/*==========================
END OF FILE
==========================*/
