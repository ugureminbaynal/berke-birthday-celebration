// Doğum günü mesajını txt dosyasından çekmek için fetch kullanılır
fetch('berke_birthday_style.txt')
  .then(response => response.text())
  .then(text => {
    document.getElementById('birthday-message').textContent = text;
  });

// images klasöründeki placeholder resimleri ekle
const gallery = document.getElementById('images-gallery');
const placeholderImages = [
  'images/placeholder1.jpg',
  'images/placeholder2.jpg',
  'images/placeholder3.jpg'
];
placeholderImages.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Doğum günü fotoğrafı';
  gallery.appendChild(img);
});

// Konfeti animasyonu
const confettiBtn = document.getElementById('confetti-btn');
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];
function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
function randomColor() {
  const colors = ['#ff6f61', '#43c6ac', '#f8ffae', '#ffb88c', '#fff'];
  return colors[Math.floor(Math.random() * colors.length)];
}
function createConfetti() {
  confettiParticles = [];
  for (let i = 0; i < 120; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * -confettiCanvas.height,
      r: Math.random() * 8 + 4,
      color: randomColor(),
      speed: Math.random() * 3 + 2
    });
  }
}
function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.y += p.speed;
    if (p.y > confettiCanvas.height) p.y = Math.random() * -confettiCanvas.height;
  });
}
let confettiInterval;
confettiBtn.addEventListener('click', () => {
  createConfetti();
  clearInterval(confettiInterval);
  confettiInterval = setInterval(drawConfetti, 20);
  setTimeout(() => {
    clearInterval(confettiInterval);
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }, 3500);
});
