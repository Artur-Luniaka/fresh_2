// Merge Dynamics - Main page functionality
// Handles content loading from JSON and interactive elements

document.addEventListener("DOMContentLoaded", function () {
  // Load all JSON content
  loadMergeInstructions();
  loadPlayerReviews();
  loadUpgradeOptions();

  // Initialize interactive elements
  initializePlayButton();
  initializeFeatureCards();
});

// Load merge instructions from JSON
async function loadMergeInstructions() {
  try {
    const response = await fetch("data/merge-instructions.json");
    const instructions = await response.json();

    const container = document.getElementById("merge-instructions");
    if (container && instructions.steps) {
      let html = "";
      instructions.steps.forEach((step, index) => {
        html += `
                    <div class="instruction-step">
                        <div class="step-number">${index + 1}</div>
                        <div class="step-content">
                            <h3>${step.title}</h3>
                            <p>${step.description}</p>
                        </div>
                    </div>
                `;
      });
      container.innerHTML = html;
    }
  } catch (error) {
    console.error("Failed to load merge instructions:", error);
    // Fallback content
    const container = document.getElementById("merge-instructions");
    if (container) {
      container.innerHTML = `
                    <div class="instruction-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h3>Find Similar Fish</h3>
                            <p>Look for fish of the same type and level to merge together.</p>
                        </div>
                    </div>
                    <div class="instruction-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h3>Drag and Drop</h3>
                            <p>Drag one fish onto another similar fish to start the merge process.</p>
                        </div>
                    </div>
                    <div class="instruction-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h3>Watch Evolution</h3>
                            <p>See your fish evolve into a more powerful and valuable species!</p>
                        </div>
                    </div>
                    <div class="instruction-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h3>Build Your School</h3>
                            <p>Create a powerful fish school by merging multiple creatures together.</p>
                        </div>
                    </div>
                    <div class="instruction-step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h3>Discover Rare Species</h3>
                            <p>Unlock legendary fish through strategic merging combinations.</p>
                        </div>
                    </div>
                    <div class="instruction-step">
                        <div class="step-number">6</div>
                        <div class="step-content">
                            <h3>Master the Ocean</h3>
                            <p>Become the ultimate fish master by completing your collection.</p>
                        </div>
                    </div>
                `;
    }
  }
}

// Load player reviews from JSON
async function loadPlayerReviews() {
  try {
    const response = await fetch("data/player-reviews.json");
    const reviews = await response.json();

    const container = document.getElementById("player-reviews");
    if (container && reviews.reviews) {
      let html = "";
      reviews.reviews.forEach((review) => {
        html += `
                    <div class="review-card">
                        <div class="review-avatar">${review.player.charAt(
                          0
                        )}</div>
                        <h4 class="review-name">${review.player}</h4>
                        <p class="review-text">"${review.comment}"</p>
                        <div class="review-rating">
                            ${"★".repeat(review.rating)}${"☆".repeat(
          5 - review.rating
        )}
                        </div>
                    </div>
                `;
      });
      container.innerHTML = html;
    }
  } catch (error) {
    console.error("Failed to load player reviews:", error);
    // Fallback content
    const container = document.getElementById("player-reviews");
    if (container) {
      container.innerHTML = `
                    <div class="review-card">
                        <div class="review-avatar">A</div>
                        <h4 class="review-name">Alex</h4>
                        <p class="review-text">"Amazing game! I love merging fish and building my collection."</p>
                        <div class="review-rating">★★★★★</div>
                    </div>
                    <div class="review-card">
                        <div class="review-avatar">S</div>
                        <h4 class="review-name">Sarah</h4>
                        <p class="review-text">"Great strategy game with beautiful underwater graphics."</p>
                        <div class="review-rating">★★★★☆</div>
                    </div>
                    <div class="review-card">
                        <div class="review-avatar">M</div>
                        <h4 class="review-name">Mike</h4>
                        <p class="review-text">"Addictive gameplay! Can't stop playing this game."</p>
                        <div class="review-rating">★★★★★</div>
                    </div>
                `;
    }
  }
}

// Load upgrade options from JSON
async function loadUpgradeOptions() {
  try {
    const response = await fetch("data/upgrade-options.json");
    const upgrades = await response.json();

    const container = document.getElementById("upgrade-options");
    if (!container) return;

    container.innerHTML = "";

    upgrades.forEach((upgrade) => {
      const upgradeCard = document.createElement("div");
      upgradeCard.className = "upgrade-card";

      upgradeCard.innerHTML = `
        <h3 class="upgrade-title">${upgrade.title}</h3>
        <p class="upgrade-description">${upgrade.description}</p>
        <ul class="upgrade-features">
          ${upgrade.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      `;

      container.appendChild(upgradeCard);
    });
  } catch (error) {
    console.error("Error loading upgrade options:", error);
  }
}

// Initialize play button functionality
function initializePlayButton() {
  const playButton = document.querySelector(".play-button");
  if (playButton) {
    playButton.addEventListener("click", function () {
      // Add ripple effect
      createRippleEffect(this, event);

      // Simulate game launch
      setTimeout(() => {
        alert(
          "🎮 Fish Merge Game is launching! Dive into the ocean adventure!"
        );
      }, 300);
    });
  }
}

// Initialize feature cards with hover effects
function initializeFeatureCards() {
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Create ripple effect for buttons
function createRippleEffect(button, event) {
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: var(--white-transparent-30);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;

  button.style.position = "relative";
  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add CSS for ripple effect and upgrade cards
const rippleStyles = document.createElement("style");
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .upgrades-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
    }
    
    .upgrade-card {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: var(--ocean-shadow);
        flex: 1;
        min-width: 250px;
        max-width: 350px;
        text-align: center;
        transition: transform 0.3s ease;
    }
    
    .upgrade-card:hover {
        transform: translateY(-5px);
    }
    
    .upgrade-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .upgrade-cost {
        background: var(--coral-glow);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 25px;
        font-weight: 600;
        margin-top: 1rem;
        display: inline-block;
    }
`;
document.head.appendChild(rippleStyles);
