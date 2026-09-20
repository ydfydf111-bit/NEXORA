// ================================
// NEXORA
// Interactive JavaScript
// ================================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let width;
let height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);


// ================================
// PARTICLES
// ================================

function createParticles() {

  particles = [];

  const amount = window.innerWidth < 600 ? 45 : 90;

  for (let i = 0; i < amount; i++) {

    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.4,
      speed: Math.random() * 0.35 + 0.08,
      alpha: Math.random() * 0.7 + 0.2,
      drift: (Math.random() - 0.5) * 0.2
    });

  }
}

createParticles();

function animateParticles() {

  ctx.clearRect(0, 0, width, height);

  for (const p of particles) {

    p.y -= p.speed;
    p.x += p.drift;

    if (p.y < -10) {
      p.y = height + 10;
      p.x = Math.random() * width;
    }

    if (p.x < -10) {
      p.x = width + 10;
    }

    if (p.x > width + 10) {
      p.x = -10;
    }

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(150,210,255,${p.alpha})`;

    ctx.fill();
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();


// ================================
// LOADER
// ================================

window.addEventListener("load", () => {

  setTimeout(() => {

    document
      .getElementById("loader")
      .classList.add("hide");

  }, 1000);

});


// ================================
// ENTER BUTTON
// ================================

const enterBtn =
  document.getElementById("enterBtn");

const message =
  document.getElementById("message");

enterBtn.addEventListener("click", () => {

  message.classList.add("show");

  playSound(440, 0.12);

  setTimeout(() => {
    playSound(660, 0.12);
  }, 120);

});


// ================================
// CLOSE POPUP
// ================================

document
  .getElementById("closeMessage")
  .addEventListener("click", () => {

    message.classList.remove("show");

  });


// ================================
// START JOURNEY
// ================================

document
  .getElementById("startJourney")
  .addEventListener("click", () => {

    message.classList.remove("show");

    document
      .getElementById("explore")
      .scrollIntoView({
        behavior: "smooth"
      });

  });


// ================================
// EXPLORE BUTTON
// ================================

document
  .getElementById("exploreBtn")
  .addEventListener("click", () => {

    document
      .getElementById("explore")
      .scrollIntoView({
        behavior: "smooth"
      });

    playSound(330, 0.08);

  });


// ================================
// CORE MOUSE EFFECT
// ================================

const core =
  document.querySelector(".core");

window.addEventListener("mousemove", (event) => {

  if (window.innerWidth < 900) return;

  const x =
    (event.clientX / window.innerWidth - 0.5) * 20;

  const y =
    (event.clientY / window.innerHeight - 0.5) * 20;

  core.style.transform =
    `rotateY(${x}deg) rotateX(${-y}deg)`;

});


// ================================
// SOUND SYSTEM
// ================================

let soundEnabled = true;
let audioContext = null;

const soundBtn =
  document.getElementById("soundBtn");

function playSound(frequency, duration) {

  if (!soundEnabled) return;

  try {

    if (!audioContext) {
      audioContext =
        new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();

    oscillator.frequency.value =
      frequency;

    oscillator.type = "sine";

    gain.gain.setValueAtTime(
      0.0001,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.04,
      audioContext.currentTime + 0.01
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      audioContext.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + duration
    );

  } catch (error) {

    console.log("Audio unavailable");

  }

}

soundBtn.addEventListener("click", () => {

  soundEnabled = !soundEnabled;

  soundBtn.textContent =
    soundEnabled ? "🔊" : "🔇";

  if (soundEnabled) {
    playSound(520, 0.1);
  }

});


// ================================
// BUTTON SOUND
// ================================

document
  .querySelectorAll("button")
  .forEach(button => {

    button.addEventListener("mouseenter", () => {

      playSound(250, 0.04);

    });

  });


// ================================
// COUNTER
// ================================

const usersElement =
  document.getElementById("users");

let currentUsers = 0;
const targetUsers = 12847;

function animateCounter() {

  if (currentUsers >= targetUsers) {

    usersElement.textContent =
      targetUsers.toLocaleString();

    return;

  }

  currentUsers += Math.ceil(
    targetUsers / 100
  );

  if (currentUsers > targetUsers) {
    currentUsers = targetUsers;
  }

  usersElement.textContent =
    currentUsers.toLocaleString();

  requestAnimationFrame(
    animateCounter
  );
}

setTimeout(
  animateCounter,
  1200
);


// ================================
// CARD REVEAL
// ================================

const cards =
  document.querySelectorAll(".card");

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";
          entry.target.style.transform =
            "translateY(0)";

        }

      });

    },
    {
      threshold: 0.15
    }
  );

cards.forEach(card => {

  card.style.opacity = "0";
  card.style.transform =
    "translateY(40px)";

  card.style.transition =
    "opacity .7s ease, transform .7s ease";

  observer.observe(card);

});
