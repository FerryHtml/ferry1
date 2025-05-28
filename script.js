// Theme toggle
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const mode = document.body.classList.contains("light-mode")
    ? "☀️ Light Mode"
    : "🌙 Night Mode";
  document.getElementById("toggle-theme").textContent = mode;
});

// Rasi Bintang Animasi Pelan
const canvas = document.getElementById("constellation");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

const stars = [];
const STAR_COUNT = 100;

function createStars() {
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);

  // draw stars
  ctx.fillStyle = "#ffffff";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  // draw lines between close stars
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  }
}

function updateStars() {
  stars.forEach((star) => {
    star.x += star.vx;
    star.y += star.vy;

    if (star.x < 0 || star.x > width) star.vx *= -1;
    if (star.y < 0 || star.y > height) star.vy *= -1;
  });
}

function animate() {
  drawStars();
  updateStars();
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

createStars();
animate();
