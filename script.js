const music = document.getElementById("music");
const petalsContainer = document.getElementById("petals");
const chapters = document.querySelectorAll(".chapter");
const daysCounter = document.getElementById("daysCounter");
const magicCursor = document.getElementById("magicCursor");
const parallaxImages = document.querySelectorAll(".memory-photo img, .travel-gallery img");
const studioIntro = document.getElementById("studioIntro");
const progressBar = document.getElementById("progressBar");
const soundToggle = document.getElementById("soundToggle");
const typedLetter = document.getElementById("typedLetter");

/* =========================
   PÉTALAS
========================= */

function createPetals() {
  if (!petalsContainer) return;

  const totalPetals = 30;

  for (let i = 0; i < totalPetals; i++) {
    const petal = document.createElement("span");

    petal.classList.add("petal");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (10 + Math.random() * 14) + "s";
    petal.style.animationDelay = (Math.random() * 12) + "s";
    petal.style.transform = `scale(${0.6 + Math.random() * 0.9})`;

    petalsContainer.appendChild(petal);
  }
}

createPetals();

/* =========================
   INTRO
========================= */

setTimeout(() => {
  if (studioIntro) {
    studioIntro.classList.add("hide");
  }
}, 10800);

/* =========================
   CONTADOR
========================= */

function updateDaysCounter() {
  if (!daysCounter) return;

  const startDate = new Date("2023-04-07T00:00:00");
  const today = new Date();

  const difference = today - startDate;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  daysCounter.textContent = days;
}

updateDaysCounter();

/* =========================
   EXPERIÊNCIA
========================= */

let musicStarted = false;

function startExperience() {
  const button = document.getElementById("startBtn");

  document.body.style.overflowY = "auto";

  if (music && !musicStarted) {
    music.volume = 0.4;
    music.play().catch(() => {});
    musicStarted = true;
    soundToggle.textContent = "♫";
  }

  if (button) {
    button.innerHTML = "Nossa história começou ❤️";
    button.style.opacity = "0.75";
  }

  setTimeout(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  }, 900);
}

window.startExperience = startExperience;

/* =========================
   SOM
========================= */

if (soundToggle) {
  soundToggle.addEventListener("click", () => {
    if (!music) return;

    if (music.paused) {
      music.play().catch(() => {});
      musicStarted = true;
      soundToggle.textContent = "♫";
    } else {
      music.pause();
      soundToggle.textContent = "♪";
    }
  });
}

/* =========================
   REVEAL CAPÍTULOS
========================= */

function revealChapters() {
  chapters.forEach((chapter) => {
    const top = chapter.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.85;

    if (top < trigger) {
      chapter.classList.add("show");
    }
  });
}

revealChapters();

/* =========================
   CURSOR MÁGICO
========================= */

document.addEventListener("mousemove", (e) => {
  if (!magicCursor) return;

  magicCursor.style.opacity = "1";
  magicCursor.style.left = e.clientX + "px";
  magicCursor.style.top = e.clientY + "px";

  const sparkle = document.createElement("span");
  sparkle.classList.add("sparkle");
  sparkle.style.left = e.clientX + "px";
  sparkle.style.top = e.clientY + "px";

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 800);
});

document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  if (!touch) return;

  const sparkle = document.createElement("span");
  sparkle.classList.add("sparkle");
  sparkle.style.left = touch.clientX + "px";
  sparkle.style.top = touch.clientY + "px";

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 800);
});

/* =========================
   CARTA FINAL
========================= */

const finalLetter = `Se existe destino...

talvez ele só tenha colocado
alguns quilômetros entre nós
para testar aquilo que o tempo
nunca conseguiu apagar.

Porque em algum lugar dentro de mim...

ainda é você.

Sempre foi você.

E talvez...
sempre vá ser.

Eu te amo, Maria Raquel.`;

let letterIndex = 0;
let hasTypedLetter = false;

function typeFinalLetter() {
  if (!typedLetter || hasTypedLetter) return;

  const rect = typedLetter.getBoundingClientRect();

  if (rect.top < window.innerHeight * 0.8) {
    hasTypedLetter = true;

    const typing = setInterval(() => {
      typedLetter.textContent += finalLetter.charAt(letterIndex);
      letterIndex++;

      if (letterIndex >= finalLetter.length) {
        clearInterval(typing);
      }
    }, 50);
  }
}

/* =========================
   CONSTELAÇÃO HACKER
========================= */

const constellationCanvas = document.getElementById("loveConstellation");

if (constellationCanvas) {
  const ctx = constellationCanvas.getContext("2d");

  let width;
  let height;
  let stars = [];
  let particles = [];
  let progress = 0;

  function resizeConstellation() {
    width = constellationCanvas.width = window.innerWidth;
    height = constellationCanvas.height = window.innerHeight;
    createHeartStars();
  }

  function heartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);

    const y =
      13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t);

    return { x, y };
  }

  function createHeartStars() {
    stars = [];

    const centerX = width / 2;
    const centerY = height * 0.28;
    const scale = Math.min(width, height) * 0.013;

    for (let i = 0; i < 42; i++) {
      const t = (Math.PI * 2 * i) / 42;
      const p = heartPoint(t);

      stars.push({
        x: centerX + p.x * scale,
        y: centerY - p.y * scale,
        size: Math.random() * 2 + 1.5,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function drawHeart() {
    const visible = Math.floor(stars.length * progress);

    for (let i = 0; i < visible; i++) {
      const s = stars[i];

      const pulse =
        Math.sin(Date.now() * 0.003 + s.pulse) * 0.4 + 1;

      ctx.beginPath();

      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.shadowColor = "rgba(255,120,220,0.95)";
      ctx.shadowBlur = 22;

      ctx.arc(
        s.x,
        s.y,
        s.size * pulse,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    ctx.beginPath();

    for (let i = 0; i < visible; i++) {
      const s = stars[i];

      if (i === 0) {
        ctx.moveTo(s.x, s.y);
      } else {
        ctx.lineTo(s.x, s.y);
      }
    }

    ctx.closePath();

    ctx.strokeStyle = "rgba(255,180,230,0.22)";
    ctx.lineWidth = 1.2;
    ctx.shadowColor = "rgba(255,120,200,0.5)";
    ctx.shadowBlur = 14;
    ctx.stroke();
  }

  function animateConstellation() {
    ctx.clearRect(0, 0, width, height);

    if (progress < 1) {
      progress += 0.01;
    }

    drawHeart();

    requestAnimationFrame(animateConstellation);
  }

  window.addEventListener("resize", resizeConstellation);

  resizeConstellation();
  animateConstellation();
}

/* =========================
   SCROLL ENGINE
========================= */

window.addEventListener("scroll", () => {
  revealChapters();
  typeFinalLetter();

  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progressPercent = (scrollTop / docHeight) * 100;

  if (progressBar) {
    progressBar.style.width = progressPercent + "%";
  }

  parallaxImages.forEach((img) => {
    img.style.transform = `translateY(${scrollTop * -0.015}px)`;
  });
});
/* =========================
   CHUVA DE FRASES DA PLAYLIST
========================= */

const lyricRain = document.getElementById("lyricRain");

const playlistPhrases = [
  "quando bate aquela saudade...",
  "eu sei que vou te amar",
  "sozinho, eu penso em você",
  "onde anda você?",
  "preciso dizer que te amo",
  "você não me ensinou a te esquecer",
  "velha infância",
  "outra vida",
  "ainda é você",
  "tem música que parece teu sorriso",
  "tem música que parece nossa madrugada",
  "tem música que parece a Pop 2014",
  "essa aqui eu coloquei pensando em você",
  "escuta com calma",
  "tem um pedaço meu aqui"
];

function createLyricDrop() {
  if (!lyricRain) return;

  const drop = document.createElement("span");
  drop.classList.add("lyric-drop");

  drop.textContent =
    playlistPhrases[Math.floor(Math.random() * playlistPhrases.length)];

  drop.style.left = Math.random() * 100 + "vw";
  drop.style.animationDuration = 9 + Math.random() * 8 + "s";
  drop.style.opacity = 0.2 + Math.random() * 0.45;

  lyricRain.appendChild(drop);

  setTimeout(() => {
    drop.remove();
  }, 18000);
}

setInterval(createLyricDrop, 900);
function abrirCarta() {
  const carta = document.getElementById("cartaFinal");
  const intro = document.querySelector(".carta-intro");
  const paragrafos = document.querySelectorAll(".carta-final p");

  carta.classList.add("ativa");
  intro.style.display = "none";

  carta.scrollIntoView({ behavior: "smooth" });

  paragrafos.forEach((p, index) => {
    setTimeout(() => {
      p.classList.add("aparecer");
    }, index * 450);
  });
}const fotosMemorias = document.querySelectorAll('.rain-photo');

const memoryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-memory');
    }
  });
}, {
  threshold: 0.2
});

fotosMemorias.forEach(foto => {
  memoryObserver.observe(foto);
});