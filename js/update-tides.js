// Update Tides - News page functionality
// Handles content loading from JSON for updates and player stories

document.addEventListener("DOMContentLoaded", function () {
  // Load all JSON content
  loadEnhancementNews();
  loadPlayerStories();
});

// Load game enhancement news from JSON
async function loadEnhancementNews() {
  try {
    const response = await fetch("data/enhancement-news.json");
    const news = await response.json();

    const container = document.getElementById("enhancement-news");
    if (container && news.enhancements) {
      let html = '<div class="enhancement-grid">';
      news.enhancements.forEach((enhancement) => {
        html += `
                    <div class="enhancement-card">
                        <div class="enhancement-header">
                            <div class="enhancement-icon">${
                              enhancement.icon
                            }</div>
                            <div class="enhancement-meta">
                                <h3 class="enhancement-title">${
                                  enhancement.title
                                }</h3>
                                <span class="enhancement-date">${
                                  enhancement.date
                                }</span>
                            </div>
                        </div>
                        <p class="enhancement-description">${
                          enhancement.description
                        }</p>
                        <div class="enhancement-tags">
                            ${enhancement.tags
                              .map(
                                (tag) =>
                                  `<span class="enhancement-tag">${tag}</span>`
                              )
                              .join("")}
                        </div>
                    </div>
                `;
      });
      html += "</div>";
      container.innerHTML = html;
    }
  } catch (error) {
    console.error("Failed to load enhancement news:", error);
    // Container will remain empty if JSON fails to load
  }
}

// Load player stories from JSON
async function loadPlayerStories() {
  try {
    const response = await fetch("data/player-stories.json");
    const stories = await response.json();

    const container = document.getElementById("player-stories");
    if (container && stories.stories) {
      let html = '<div class="diaries-grid">';
      stories.stories.forEach((story, index) => {
        html += `
                    <div class="diary-card" data-story-index="${index}">
                        <div class="diary-card-front">
                            <div class="diary-header">
                                <div class="diary-avatar">${story.player.charAt(
                                  0
                                )}</div>
                                <div class="diary-meta">
                                    <h4 class="diary-player">${
                                      story.player
                                    }</h4>
                                    <span class="diary-date">${
                                      story.date
                                    }</span>
                                </div>
                            </div>
                            <div class="diary-content">
                                <h3 class="diary-title">${story.title}</h3>
                                <p class="diary-text">${story.content}</p>
                            </div>
                            <div class="diary-achievement">
                                <span class="achievement-badge">🏆</span>
                                <span class="achievement-text">${
                                  story.achievement
                                }</span>
                            </div>
                            <div class="flip-hint">Click to read more</div>
                        </div>
                        <div class="diary-card-back">
                            <p class="diary-back-text">${story.backContent}</p>
                            <div class="flip-hint">Click to go back</div>
                        </div>
                    </div>
                `;
      });
      html += "</div>";
      container.innerHTML = html;

      // Add click event listeners for card flipping
      addCardFlipListeners();
    }
  } catch (error) {
    console.error("Failed to load player stories:", error);
    // Container will remain empty if JSON fails to load
  }
}

// Add click event listeners for card flipping
function addCardFlipListeners() {
  const diaryCards = document.querySelectorAll(".diary-card");
  diaryCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.classList.toggle("flipped");
    });
  });
}
