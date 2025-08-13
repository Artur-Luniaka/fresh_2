// Contact Currents - Contact page functionality
// Handles contact form submission and contact information loading

document.addEventListener("DOMContentLoaded", function () {
  // Load contact details from JSON
  loadContactDetails();

  // Initialize contact form
  initializeContactForm();
});

// Load contact details from JSON
async function loadContactDetails() {
  try {
    const response = await fetch("data/contact-details.json");
    const contactData = await response.json();

    const container = document.getElementById("contact-details");
    if (container && contactData.contact) {
      let html = '<div class="contact-page-grid">';
      contactData.contact.forEach((contact) => {
        html += `
                    <div class="contact-page-card">
                        <div class="contact-page-icon">${contact.icon}</div>
                        <div class="contact-page-content">
                            <h3>${contact.title}</h3>
                            <p>${contact.value}</p>
                        </div>
                    </div>
                `;
      });
      html += "</div>";
      container.innerHTML = html;
    }
  } catch (error) {
    console.error("Failed to load contact details:", error);
    // Fallback content
    const container = document.getElementById("contact-details");
    if (container) {
      container.innerHTML = `
                <div class="contact-page-grid">
                    <div class="contact-page-card">
                        <div class="contact-page-icon">📧</div>
                        <div class="contact-page-content">
                            <h3>Email</h3>
                            <p>info@ThrillSphereGaming.com</p>
                        </div>
                    </div>
                    <div class="contact-page-card">
                        <div class="contact-page-icon">📞</div>
                        <div class="contact-page-content">
                            <h3>Phone</h3>
                            <p>+61 7 1166 8920</p>
                        </div>
                    </div>
                    <div class="contact-page-card">
                        <div class="contact-page-icon">📍</div>
                        <div class="contact-page-content">
                            <h3>Location</h3>
                            <p>7 Jacaranda Avenue, Kingaroy QLD 4610, Australia</p>
                        </div>
                    </div>
                </div>
            `;
    }
  }
}

// Initialize contact form functionality
function initializeContactForm() {
  const contactForm = document.getElementById("reef-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmission);
  }
}

// Handle form submission
async function handleFormSubmission(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  // Show loading overlay with spinner
  showLoadingOverlay();

  // Simulate form submission (replace with actual API call)
  await simulateFormSubmission(formObject);

  // Hide loading overlay
  hideLoadingOverlay();

  // Scroll to top of page
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Show success notification from top
  showTopNotification(
    "Message sent successfully! We'll get back to you soon.",
    "success"
  );

  // Reset form
  event.target.reset();
}

// Show loading overlay with spinner
function showLoadingOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "loading-overlay";
  overlay.innerHTML = `
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <p class="loading-text">Sending message...</p>
    </div>
  `;
  document.body.appendChild(overlay);
}

// Hide loading overlay
function hideLoadingOverlay() {
  const overlay = document.querySelector(".loading-overlay");
  if (overlay) {
    overlay.remove();
  }
}

// Show top notification
function showTopNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector(".top-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = `top-notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.remove("show");
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);
}

// Simulate form submission
function simulateFormSubmission(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Always success
      resolve(data);
    }, 1500);
  });
}

// Add CSS for contact page
const contactStyles = document.createElement("style");
contactStyles.textContent = `
    .contact-page-info {
        padding: 4rem 0;
    }
    
    .contact-page-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        justify-content: center;
        margin-bottom: 2rem;
    }
    
    .contact-page-card {
        background: linear-gradient(
            135deg,
            var(--coral-blue) 0%,
            var(--ocean-current) 100%
        );
        padding: 1rem;
        border-radius: 12px;
        box-shadow: var(--ocean-shadow);
        flex: 1;
        min-width: 200px;
        max-width: 280px;
        text-align: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .contact-page-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--white-transparent-10);
        border-radius: 15px;
        z-index: 1;
    }
    
    .contact-page-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px var(--ocean-transparency-30);
    }
    
    .contact-page-icon {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        position: relative;
        z-index: 2;
    }
    
    .contact-page-content h3 {
        color: var(--sea-foam);
        margin-bottom: 0.25rem;
        position: relative;
        z-index: 2;
        font-size: 1.1rem;
    }
    
    .contact-page-content p {
        color: var(--bubble-vibe);
        margin-bottom: 0;
        font-weight: 500;
        position: relative;
        z-index: 2;
        font-size: 0.95rem;
    }
    
    .contact-form {
        position: relative;
    }
    
    .contact-form textarea {
        resize: none;
    }
    
    /* Loading Overlay */
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--black-transparent-70);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
    
    .loading-content {
        text-align: center;
        color: white;
    }
    
    .loading-spinner {
        width: 60px;
        height: 60px;
        border: 4px solid var(--white-transparent-30);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    .loading-text {
        font-size: 1.2rem;
        font-weight: 500;
        margin: 0;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
         /* Top Notification */
     .top-notification {
         position: fixed;
         top: -100px;
         left: 20px;
         right: 20px;
         background: white;
         padding: 1rem 2rem;
         border-radius: 8px;
         box-shadow: 0 4px 20px var(--black-transparent-15);
         font-weight: 500;
         z-index: 10000;
         transition: top 0.3s ease;
         text-align: center;
     }
    
    .top-notification.show {
        top: 20px;
    }
    
    .top-notification.success {
        background: var(--success-bg);
        color: var(--success-text);
        border: 1px solid var(--success-border);
    }
    
    .top-notification.error {
        background: var(--error-bg);
        color: var(--error-text);
        border: 1px solid var(--error-border);
    }
    
    .form-message {
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
         @media (max-width: 768px) {
         .contact-page-grid {
             flex-direction: column;
             gap: 1rem;
         }
         
         .contact-page-card {
             max-width: 100%;
             padding: 0.75rem;
             min-width: 180px;
         }
         
         .contact-page-icon {
             font-size: 2.25rem;
             margin-bottom: 0.4rem;
         }
         
         .contact-page-content h3 {
             font-size: 1rem;
             margin-bottom: 0.2rem;
         }
         
         .contact-page-content p {
             font-size: 0.9rem;
             margin-bottom: 0;
         }
         
         .top-notification {
             left: 10px;
             right: 10px;
         }
     }
`;
document.head.appendChild(contactStyles);
