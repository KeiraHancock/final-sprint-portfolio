// ================ Index Page ================

// Sparkle effect on button hover
const button = document.querySelector(".portfolio-button");

if (button) {
  button.addEventListener("mouseenter", () => {
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");

      const rect = button.getBoundingClientRect();
      sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
      sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;

      sparkle.style.background = Math.random() > 0.5 ? "#fffacd" : "#ffd1dc";
      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }
  });
}


// ================ Main Page ================

// ========== Time Update ==========
function updateTime() {
  const now = new Date();
  const dayString = now.toLocaleDateString('en-CA', {
    weekday: 'long',
    timeZone: 'America/St_Johns'
  });

  const timeString = now.toLocaleTimeString('en-CA', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/St_Johns'
  });

  document.getElementById("day-display").textContent = dayString;
  document.getElementById("time-display").textContent = timeString;
}

updateTime();
setInterval(updateTime, 60000);

// ========== Project Folder Data ==========
const projectData = {
  "Essentials of Software Development": [
    {
      name: "QAP 1",
      file: "projects/essentials/QAP1.pptx"
    }
  ],
  "Python": [
    {
      name: "QAP 1",
      file: "projects/python/QAP1_py.zip"
    },
    {
      name: "QAP 2",
      file: "projects/python/QAP2_py.zip"
    },
    {
      name: "QAP 3",
      file: "projects/python/QAP3_py.zip"
    },
    {
      name: "QAP 4",
      file: "projects/python/QAP4_py.zip"
    }
  ],
  "Web Development": [
    {
      name: "QAP 1",
      file: "projects/web dev/QAP1_wd.zip"
    },
    {
      name: "QAP 2",
      file: "projects/web dev/QAP2_wd.zip"
    },
    {
      name: "QAP 3",
      file: "projects/web dev/QAP3_wd.zip"
    },
    {
      name: "QAP 4",
      file: "projects/web dev/QAP4_wd.zip"
    }
  ],
  "AWS": [
    {
      name: "No Projects Yet!"
    }
  ],
  "JavaScript": [
    {
      name: "QAP 2",
      file: "projects/javascript/QAP2_js.zip"
    },
    {
      name: "QAP 3",
      file: "projects/javascript/QAP3_js.zip"
    }
  ],
  "Front-End Technology": [
    {
      name: "QAP 1",
      file: "projects/front-end/QAP1_fe.zip"
    }
  ],
  "UX/UI": [
    {
      name: "No Projects Yet! (this project will be added here)"
    }
  ],
  "Industry Seminar": [
    {
      name: "Semester 1",
      docs: "projects/industry/Sem1.docx"
    },
    {
      name: "Semester 2",
      docs: "projects/industry/Sem2.docx"
    }
  ],
  "Group Projects": [
    {
      name: "JavaScript Sprint 1",
      file: "projects/group projects/Sprint1_js.zip"
    },
    {
      name: "Python Sprint 1",
      file: "projects/group projects/Sprint1_py.zip"
    },
    {
      name: "Web Development Sprint 1",
      file: "projects/group projects/Sprint1_wd.zip"
    },
    {
      name: "Web Development Sprint 2",
      file: "projects/group projects/Sprint2_wd.zip"
    }
  ]
};

// ========== Folder Rendering ==========
function renderFolders(view = 'grid') {
  const container = document.getElementById("project-area");
  if (!container) return;

  container.className = `project-area ${view}-view`;
  container.innerHTML = "";

  for (const className in projectData) {
    const folder = document.createElement("div");
    folder.className = "folder-box";

    folder.innerHTML = `
      <div class="folder-header" onclick="toggleFolder(this)">
        <img src="img/folder-icon.png" class="folder-img" alt="Folder Icon">
        <span>${className}</span>
      </div>
      <div class="project-list">
        ${projectData[className].map(project => `
          <div class="project-card">
            <div class="project-info">
              <div class="project-name-links">
                <h3>${project.name}</h3>
                ${(project.file || project.docs) ? `
                  <a href="${project.file || project.docs}" target="_blank" class="open-file">Open File</a>` : ""}
              </div>
              ${(project.file || project.docs) ? `
                <a href="${project.file || project.docs}" class="download-icon" download title="Download">
                  <img src="img/download-icon.png" alt="Download Icon">
                </a>` : ""}
            </div>
          </div>
        `).join("")}
      </div>
    `;

    container.appendChild(folder);
  }

  // FORCE REPAINT to fix scroll not showing
  container.offsetHeight; // triggers reflow
}


// ========== Toggle Folder View ==========
function toggleFolder(header) {
  const folderBox = header.parentElement;
  folderBox.classList.toggle("open");
}

function setView(view) {
  renderFolders(view);
}

// Initial render
renderFolders();

// ========= MEMORY GAME =========

const cardGrid = document.getElementById("cardGrid");
const memoryGame = document.getElementById("memoryGame");

const cards = [
  "img/heart-card.png", "img/heart2-card.png", "img/moon-card.png", "img/star-card.png",
  "img/flower-card.png", "img/bunny-card.png", "img/cake-card.png", "img/gift-card.png"
];

let flippedCards = [];
let matchedCards = [];

// Show/hide game
function toggleGame(button) {
  const memoryGame = document.getElementById("memoryGame");
  const isOpen = !memoryGame.classList.contains("hidden");

  memoryGame.classList.toggle("hidden");
  button.classList.toggle("active");

  if (isOpen) {
    button.textContent = "Play Match Game!";
  } else {
    button.textContent = "Close Game";
    startGame();
  }
}

// Shuffle helper
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Start or reset the game
function startGame() {
  flippedCards = [];
  matchedCards = [];
  cardGrid.innerHTML = "";

  const shuffled = shuffle([...cards, ...cards]);

  shuffled.forEach((src, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.src = src;

    card.innerHTML = `
      <div class="front">
        <img src="${src}" alt="Card" style="width: 60%; height: 60%;" />
      </div>
      <div class="back"></div>
    `;

    card.addEventListener("click", () => handleCardClick(card));
    cardGrid.appendChild(card);
  });
}

// Card click logic
function handleCardClick(card) {
  if (flippedCards.length === 2 || card.classList.contains("flipped") || matchedCards.includes(card)) return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    if (first.dataset.src === second.dataset.src) {
      matchedCards.push(first, second);
      flippedCards = [];
    } else {
      setTimeout(() => {
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        flippedCards = [];
      }, 800);
    }
  }
}

// ========= FLOWER GAME =========

function toggleFlowerGame(button) {
  const flowerGame = document.getElementById("flowerGame");
  const isOpen = !flowerGame.classList.contains("hidden");

  flowerGame.classList.toggle("hidden");
  button.classList.toggle("active");

  if (isOpen) {
    button.textContent = "Play Collect Game!";
  } else {
    button.textContent = "Close Collect Game!";
    startFlowerGame();
  }
}

const flowerImages = [
  "img/flower1.png",
  "img/flower2.png",
  "img/flower3.png",
  "img/flower4.png",
  "img/flower5.png",
  "img/flower6.png",
  "img/flower7.png",
  "img/flower8.png"
];

function startFlowerGame() {
  const grid = document.getElementById("flowerGrid");
  const message = document.getElementById("flowerMessage");
  grid.innerHTML = "";
  message.classList.add("hidden");

  flowerImages.forEach((src, index) => {
    const flower = document.createElement("img");
    flower.src = src;
    flower.alt = `Flower ${index + 1}`;
    flower.classList.add("flower");
    flower.addEventListener("click", () => collectFlower(flower));
    grid.appendChild(flower);
  });
}

function collectFlower(flower) {
  flower.classList.add("collected");

  const all = document.querySelectorAll(".flower");
  const collected = document.querySelectorAll(".flower.collected");

  if (collected.length === all.length) {
    document.getElementById("flowerMessage").classList.remove("hidden");
  }
}

function resetFlowerGame() {
  startFlowerGame();
}

document.addEventListener("DOMContentLoaded", () => {
  renderFolders();
});