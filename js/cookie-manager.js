// Cookie Banner Manager
class CookieManager {
  constructor() {
    this.cookieBanner = document.getElementById("cookie-banner");
    this.acceptButton = document.getElementById("accept-cookies");
    this.cookieAccepted = localStorage.getItem("cookiesAccepted");

    this.init();
  }

  init() {
    // Check if cookies were already accepted
    if (!this.cookieAccepted) {
      this.showCookieBanner();
    }

    // Add event listener to accept button
    if (this.acceptButton) {
      this.acceptButton.addEventListener("click", () => {
        this.acceptCookies();
      });
    }

    // Listen for mobile menu state changes
    this.observeMobileMenu();
  }

  observeMobileMenu() {
    // Watch for body class changes (menu-open)
    const body = document.body;

    // Create observer for body class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          this.handleMobileMenuChange();
        }
      });
    });

    // Start observing
    observer.observe(body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Also listen for direct class changes via JavaScript
    document.addEventListener("DOMContentLoaded", () => {
      // Check if mobile menu is already open
      this.handleMobileMenuChange();
    });
  }

  handleMobileMenuChange() {
    if (!this.cookieBanner || this.cookieAccepted) return;

    const isMenuOpen = document.body.classList.contains("menu-open");

    if (isMenuOpen) {
      // Hide cookie banner when mobile menu is open
      this.cookieBanner.classList.remove("show");
    } else {
      // Show cookie banner when mobile menu is closed
      this.cookieBanner.classList.add("show");
    }
  }

  showCookieBanner() {
    if (this.cookieBanner) {
      // Check if mobile menu is open before showing
      if (!document.body.classList.contains("menu-open")) {
        // Small delay to ensure smooth animation
        setTimeout(() => {
          this.cookieBanner.classList.add("show");
        }, 100);
      }
    }
  }

  hideCookieBanner() {
    if (this.cookieBanner) {
      this.cookieBanner.classList.remove("show");
    }
  }

  acceptCookies() {
    // Save to localStorage
    localStorage.setItem("cookiesAccepted", "true");
    this.cookieAccepted = true;

    // Hide the banner
    this.hideCookieBanner();

    // Optional: Add a small success message
    this.showAcceptanceMessage();
  }

  showAcceptanceMessage() {
    // Create a temporary success message
    const message = document.createElement("div");
    message.textContent = "Cookies accepted!";
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--success-bg, #dcfce7);
      color: var(--success-text, #166534);
      border: 1px solid var(--success-border, #bbf7d0);
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      z-index: 1001;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      animation: slideInRight 0.3s ease-out;
    `;

    // Add CSS animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(message);

    // Remove message after 3 seconds
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    }, 3000);
  }
}

// Initialize cookie manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CookieManager();
});
