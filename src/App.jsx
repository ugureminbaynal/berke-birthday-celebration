import React, { useState, useEffect, useRef } from 'react';

function BirthdayGallery() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const confettiIntervalRef = useRef(null);
  
  const images = [
    "images/WhatsApp Görsel 2025-07-02 saat 14.22.35_34c579dc.jpg",
    "images/WhatsApp Görsel 2025-07-02 saat 14.22.38_9305d663.jpg",
    "images/WhatsApp Görsel 2025-07-02 saat 14.23.05_96b60722.jpg",
    "images/WhatsApp Görsel 2025-07-02 saat 14.23.46_7e76947e.jpg",
    "images/WhatsApp Görsel 2025-07-02 saat 14.24.06_2e1eb529.jpg",
    "images/WhatsApp Görsel 2025-09-06 saat 22.28.29_89f331a0.jpg",
    "images/WhatsApp Görsel 2025-09-06 saat 22.28.29_b0d34f73.jpg",
    "images/WhatsApp Görsel 2025-09-06 saat 22.28.30_8304db6a.jpg",
    "images/WhatsApp Görsel 2025-09-06 saat 22.28.30_9e4b5f02.jpg",
    "images/WhatsApp Görsel 2025-09-06 saat 22.28.30_be6bf746.jpg",
    "images/WhatsApp Görsel 2025-09-06 saat 22.28.30_d8ca32ef.jpg",
    "images/WhatsApp Görsel 2025-09-06 saat 22.29.51_2493ecdc.jpg",
    "images/WhatsApp Görsel 2025-09-06 saat 22.29.51_aa4fbe5c.jpg",
    "images/WhatsApp Görsel 2025-09-06 saat 22.29.52_2bf6e751.jpg",
    "images/WhatsApp Görsel 2025-09-06 saat 22.29.52_cc3621cb.jpg",
    "images/WhatsApp Görsel 2025-09-06 saat 22.29.52_fd1cbfbd.jpg"
  ];

  const createConfettiAt = (container) => {
    for (let i = 0; i < 8; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'absolute';
      conf.style.width = '8px';
      conf.style.height = '8px';
      conf.style.borderRadius = '50%';
      conf.style.background = ['#E0453A','#22D3EE','#F8FAFC','#FFD700','#43c6ac'][Math.floor(Math.random()*5)];
      conf.style.opacity = '0.85';
      conf.style.pointerEvents = 'none';
      conf.style.zIndex = '10';
      
      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;
      conf.style.left = centerX + 'px';
      conf.style.top = centerY + 'px';
      
      const angle = Math.random() * 2 * Math.PI;
      const dist = 30 + Math.random() * 30;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      
      conf.animate([
        { transform: 'translate(-50%, -50%)', opacity: 0.85 },
        { transform: `translate(${dx - 50}%, ${dy - 50}%)`, opacity: 0.1 }
      ], {
        duration: 1000 + Math.random() * 500,
        easing: 'ease-out',
        fill: 'forwards'
      });
      
      container.appendChild(conf);
      setTimeout(() => conf.remove(), 1500);
    }
  };

  const startCelebration = () => {
    setIsPlaying(true);
    audioRef.current.volume = 0.5;
    audioRef.current.play();
    
    const startConfetti = () => {
      document.querySelectorAll('.image-container').forEach(container => {
        if (isElementInViewport(container)) {
          createConfettiAt(container);
        }
      });
    };

    startConfetti();
    confettiIntervalRef.current = setInterval(startConfetti, 2000);
  };

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    return (
      rect.top <= windowHeight &&
      rect.bottom >= 0 &&
      rect.left <= windowWidth &&
      rect.right >= 0
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isPlaying) {
        document.querySelectorAll('.image-container').forEach(container => {
          if (isElementInViewport(container)) {
            createConfettiAt(container);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying]);

  return (
    <div className="wrap">
      {!isPlaying && (
        <div 
          className="start-overlay"
          onClick={startCelebration}
        >
          <button className="start-button">
            🎵 Kutlamaya Başla 🎉
          </button>
        </div>
      )}
      
      <audio 
        ref={audioRef} 
        loop
        src="İyi ki Doğdun Berke İsme Özel Komik Doğum Günü Şarkısı.mp3"
      />
      
      <h1>Mutlu Yıllar, Berke! 🎉</h1>
      
      <div className="gallery">
        {images.map((src, index) => (
          <div key={index} className="image-container">
            <img src={src} alt={`Berke Fotoğrafı ${index + 1}`} />
          </div>
        ))}
      </div>
      
      <footer>
        Seviliyorsun. — ekibin · <a className="link" href="mailto:berke@example.com">Mail</a>
      </footer>
    </div>
  );
}

export default BirthdayGallery;
