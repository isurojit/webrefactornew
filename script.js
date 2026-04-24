/**
 * Web Refactor - Enhanced JavaScript
 * With more parallax and animations
 */

"use strict";

// ========================================
// DOM Elements
// ========================================
const DOM = {
  navbar: document.querySelector(".navbar"),
  hamburger: document.querySelector(".hamburger-menu"),
  navLinks: document.querySelector(".nav-links"),
  navOverlay: null,
  scrollTopBtn: document.getElementById("scrollTop"),
  currencySelect: document.getElementById("currencySelect"),
  pricingToggle: document.getElementById("pricingToggle"),
  contactForm: document.getElementById("contactForm"),
  currentYear: document.getElementById("currentYear"),
};

// ========================================
// Initialize
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  initAOS();
  createParticles();
  initMobileMenu();
  initScrollEffects();
  initCurrencyConverter();
  initPricingToggle();
  initCalculator();
  initPortfolioFilter();
  initTestimonials();
  initContactForm();
  initCurrentYear();
  initCounterAnimation();
  initParallax();
});

// ========================================
// AOS Animation
// ========================================
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: false,
      offset: 50,
      delay: 0,
      anchorPlacement: "top-bottom",
    });
  }
}

// ========================================
// Particles Background
// ========================================
function createParticles() {
  const particlesContainer = document.querySelector(".hero-particles");
  if (!particlesContainer) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s infinite linear;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
        `;
    particlesContainer.appendChild(particle);
  }

  // Add particle animation style
  const style = document.createElement("style");
  style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
}

// ========================================
// Mobile Menu
// ========================================
function initMobileMenu() {
  if (!DOM.hamburger || !DOM.navLinks) return;

  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.appendChild(overlay);
  DOM.navOverlay = overlay;

  DOM.hamburger.addEventListener("click", toggleMobileMenu);
  DOM.navOverlay.addEventListener("click", closeMobileMenu);

  DOM.navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });
}

function toggleMobileMenu() {
  const isActive = DOM.navLinks.classList.contains("active");
  isActive ? closeMobileMenu() : openMobileMenu();
}

function openMobileMenu() {
  DOM.navLinks.classList.add("active");
  DOM.hamburger.classList.add("active");
  DOM.hamburger.setAttribute("aria-expanded", "true");
  DOM.navOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  DOM.navLinks.classList.remove("active");
  DOM.hamburger.classList.remove("active");
  DOM.hamburger.setAttribute("aria-expanded", "false");
  DOM.navOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// ========================================
// Scroll Effects
// ========================================
function initScrollEffects() {
  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );
}

function handleScroll() {
  const scrollY = window.scrollY;

  if (DOM.navbar) {
    DOM.navbar.classList.toggle("scrolled", scrollY > 100);
  }

  if (DOM.scrollTopBtn) {
    DOM.scrollTopBtn.classList.toggle("visible", scrollY > 500);
  }
}

if (DOM.scrollTopBtn) {
  DOM.scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      closeMobileMenu();
    }
  });
});

// ========================================
// Parallax Effects
// ========================================
function initParallax() {
  const orbs = document.querySelectorAll(".gradient-orb");
  const cards = document.querySelectorAll(".floating-card");

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY;

      // Parallax orbs
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });

      // Parallax cards
      cards.forEach((card, index) => {
        const speed = (index + 1) * 0.05;
        card.style.transform = `translateY(${scrollY * speed * -1}px)`;
      });
    },
    { passive: true },
  );
}

// ========================================
// Currency Converter
// ========================================
const exchangeRates = {
  USD: { rate: 1, symbol: "$" },
  INR: { rate: 83.5, symbol: "₹" },
  EUR: { rate: 0.92, symbol: "€" },
  GBP: { rate: 0.79, symbol: "£" },
};

function initCurrencyConverter() {
  if (!DOM.currencySelect) return;

  DOM.currencySelect.addEventListener("change", (e) => {
    updatePrices(e.target.value);
  });

  updatePrices(DOM.currencySelect.value);
}

function updatePrices(currency) {
  const rate = exchangeRates[currency].rate;
  const symbol = exchangeRates[currency].symbol;

  document.querySelectorAll(".price-amount").forEach((amount) => {
    const usdValue = parseFloat(amount.getAttribute("data-usd"));
    const convertedValue = Math.round(usdValue * rate);
    amount.textContent = convertedValue.toLocaleString();
  });

  document.querySelectorAll(".currency-symbol").forEach((sym) => {
    sym.textContent = symbol;
  });
}

// ========================================
// Pricing Toggle
// ========================================
function initPricingToggle() {
  if (!DOM.pricingToggle) return;

  DOM.pricingToggle.addEventListener("change", () => {
    const isYearly = DOM.pricingToggle.checked;

    document.querySelectorAll(".pricing-card").forEach((card) => {
      const priceAmount = card.querySelector(".price-amount");
      const usdValue = parseFloat(priceAmount.getAttribute("data-usd"));

      priceAmount.textContent = isYearly
        ? Math.round(usdValue * 0.8).toLocaleString()
        : usdValue.toLocaleString();
    });

    updatePrices(DOM.currencySelect.value);
  });
}

// ========================================
// Price Calculator
// ========================================
function initCalculator() {
  const elements = {
    projectType: document.getElementById("projectType"),
    pageCount: document.getElementById("pageCount"),
    pageCountValue: document.getElementById("pageCountValue"),
    featureCheckboxes: document.querySelectorAll(".feature-checkbox"),
    complexityRadios: document.querySelectorAll('input[name="complexity"]'),
    timeline: document.getElementById("timeline"),
    resultUSD: document.getElementById("resultUSD"),
    resultINR: document.getElementById("resultINR"),
    resultEUR: document.getElementById("resultEUR"),
    resultGBP: document.getElementById("resultGBP"),
  };

  if (!elements.projectType) return;

  elements.pageCount.addEventListener("input", () => {
    elements.pageCountValue.textContent = elements.pageCount.value;
    calculatePrice();
  });

  elements.projectType.addEventListener("change", calculatePrice);
  elements.featureCheckboxes.forEach((cb) =>
    cb.addEventListener("change", calculatePrice),
  );
  elements.complexityRadios.forEach((radio) =>
    radio.addEventListener("change", calculatePrice),
  );
  elements.timeline.addEventListener("change", calculatePrice);

  calculatePrice();

  function calculatePrice() {
    let basePrice = parseFloat(elements.projectType.value) || 0;
    const pages = parseInt(elements.pageCount.value);

    if (pages > 5) basePrice += (pages - 5) * 50;

    elements.featureCheckboxes.forEach((cb) => {
      if (cb.checked) basePrice += parseFloat(cb.value);
    });

    let complexityMultiplier = 1;
    elements.complexityRadios.forEach((radio) => {
      if (radio.checked) complexityMultiplier = parseFloat(radio.value);
    });
    basePrice *= complexityMultiplier;
    basePrice *= parseFloat(elements.timeline.value);
    basePrice = Math.round(basePrice);

    animateValue(elements.resultUSD, `$${basePrice.toLocaleString()}`);
    animateValue(
      elements.resultINR,
      `₹${Math.round(basePrice * exchangeRates.INR.rate).toLocaleString()}`,
    );
    animateValue(
      elements.resultEUR,
      `€${Math.round(basePrice * exchangeRates.EUR.rate).toLocaleString()}`,
    );
    animateValue(
      elements.resultGBP,
      `£${Math.round(basePrice * exchangeRates.GBP.rate).toLocaleString()}`,
    );
  }

  function animateValue(element, newValue) {
    if (element.textContent !== newValue) {
      element.style.opacity = "0.5";
      setTimeout(() => {
        element.textContent = newValue;
        element.style.opacity = "1";
      }, 200);
    }
  }
}

// ========================================
// Portfolio Filter
// ========================================
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      const filter = btn.getAttribute("data-filter");

      portfolioItems.forEach((item, index) => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
          setTimeout(
            () => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            },
            50 + index * 50,
          );
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// ========================================
// Testimonials Swiper
// ========================================
function initTestimonials() {
  if (typeof Swiper === "undefined") return;

  new Swiper(".swiper", {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 25 },
      1024: { slidesPerView: 3, spaceBetween: 30 },
    },
  });
}

// ========================================
// Contact Form
// ========================================
function initContactForm() {
  if (!DOM.contactForm) return;

  DOM.contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(DOM.contactForm);
    const data = Object.fromEntries(formData);

    if (!validateForm(data)) return;

    const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showNotification("Message sent successfully!", "success");
      DOM.contactForm.reset();
    } catch (error) {
      showNotification("Failed to send message.", "error");
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

function validateForm(data) {
  const errors = [];
  if (!data.name || data.name.trim().length < 2)
    errors.push("Please enter a valid name");
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.push("Please enter a valid email");
  if (!data.message || data.message.trim().length < 10)
    errors.push("Please enter a message");

  if (errors.length > 0) {
    showNotification(errors.join(". "), "error");
    return false;
  }
  return true;
}

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === "success" ? "var(--primary-color)" : "#ef4444"};
        color: white;
        border-radius: var(--radius-md);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
  notification.innerHTML = `<i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i> ${message}`;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}

// ========================================
// Counter Animation
// ========================================
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-count"));
          animateCounter(counter, target);
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// ========================================
// Current Year
// ========================================
function initCurrentYear() {
  if (DOM.currentYear) {
    DOM.currentYear.textContent = new Date().getFullYear();
  }
}

// ========================================
// Console Welcome
// ========================================
console.log(
  "%c🚀 Web Refactor",
  "font-size: 24px; font-weight: bold; color: #3b82f6;",
);
console.log(
  "%cBuilding Digital Excellence",
  "font-size: 14px; color: #8b5cf6;",
);
