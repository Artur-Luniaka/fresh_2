// Ocean Waves - Main JavaScript functionality
// Handles header/footer loading and mobile menu

document.addEventListener("DOMContentLoaded", function () {
  // Load header and footer
  loadTideHeader();
  loadCoralFooter();

  // Initialize mobile menu
  initializeMobileMenu();

  // Set current year in footer
  setCurrentYear();
});

// Load header from tide-header.html
async function loadTideHeader() {
  try {
    const headerResponse = await fetch("tide-header.html");
    const headerHtml = await headerResponse.text();
    document.getElementById("tide-header-container").innerHTML = headerHtml;

    // Re-initialize mobile menu after header loads
    initializeMobileMenu();
  } catch (error) {
    console.error("Failed to load header:", error);
  }
}

// Load footer from coral-footer.html
async function loadCoralFooter() {
  try {
    const footerResponse = await fetch("coral-footer.html");
    const footerHtml = await footerResponse.text();
    document.getElementById("coral-footer-container").innerHTML = footerHtml;

    // Set current year after footer loads
    setCurrentYear();
  } catch (error) {
    console.error("Failed to load footer:", error);
  }
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
  const burgerButton = document.getElementById("burger-menu");
  const mobileNav = document.getElementById("mobile-nav");

  if (burgerButton && mobileNav) {
    // Get or create overlay
    let overlay = document.querySelector(".mobile-menu-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "mobile-menu-overlay";
      document.body.appendChild(overlay);
    }

    burgerButton.addEventListener("click", function () {
      mobileNav.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close menu when clicking overlay
    overlay.addEventListener("click", function () {
      mobileNav.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    });

    // Close menu when clicking links
    const mobileLinks = mobileNav.querySelectorAll(".mobile-nav-link");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }
}

// Set current year in footer copyright
function setCurrentYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Smooth scrolling for anchor links
document.addEventListener("click", function (e) {
  if (e.target.tagName === "A" && e.target.hash) {
    e.preventDefault();

    // If we're not on the main page and trying to access #how-to-play
    if (
      e.target.hash === "#how-to-play" &&
      window.location.pathname !== "/" &&
      !window.location.pathname.endsWith("/")
    ) {
      // Navigate to main page first, then scroll to section
      window.location.href = "./" + e.target.hash;
      return;
    }

    const targetElement = document.querySelector(e.target.hash);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});

// Add floating bubble effect to page
function createFloatingBubbles() {
  const bubbleCount = 5;

  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement("div");
    bubble.className = "floating-bubble";
    bubble.style.cssText = `
            position: fixed;
            width: ${Math.random() * 20 + 10}px;
            height: ${Math.random() * 20 + 10}px;
            background: var(--bubble-transparency);
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            pointer-events: none;
            z-index: -1;
            animation: float-up ${Math.random() * 10 + 15}s linear infinite;
        `;

    document.body.appendChild(bubble);

    // Remove bubble after animation
    setTimeout(() => {
      if (bubble.parentNode) {
        bubble.parentNode.removeChild(bubble);
      }
    }, 20000);
  }
}

// Create floating bubbles periodically
setInterval(createFloatingBubbles, 3000);

// Add CSS for floating bubbles
const bubbleStyles = document.createElement("style");
bubbleStyles.textContent = `
    @keyframes float-up {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
        }
        50% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(bubbleStyles);
