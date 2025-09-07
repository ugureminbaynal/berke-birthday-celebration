import React, { useState, useRef } from 'react';

function BirthdayGallery() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
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
    for (let i = 0; i < 30; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'absolute';
      conf.style.width = '10px';
      conf.style.height = '10px';
      conf.style.borderRadius = '50%';
      conf.style.background = ['#E0453A','#22D3EE','#F8FAFC','#FFD700','#43c6ac'][Math.floor(Math.random()*5)];
      conf.style.opacity = '0.9';
      conf.style.pointerEvents = 'none';
      conf.style.zIndex = '10';
      
      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;
      conf.style.left = centerX + 'px';
      conf.style.top = centerY + 'px';
      
      const angle = Math.random() * 2 * Math.PI;
      const dist = 800 + Math.random() * 1200;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      
      conf.animate([
        { transform: 'translate(-50%, -50%)', opacity: 0.9 },
        { transform: `translate(${dx - 50}%, ${dy - 50}%)`, opacity: 0.1 }
      ], {
        duration: 2000 + Math.random() * 1000,
        easing: 'ease-out',
        fill: 'forwards'
      });
      
      container.appendChild(conf);
      setTimeout(() => conf.remove(), 3000);
    }
  };

  const startCelebration = () => {
    setIsPlaying(true);
    audioRef.current.volume = 0.5;
    audioRef.current.play();
  };



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
           <div 
             key={index} 
             className="image-container"
             onMouseEnter={() => {
               if (isPlaying) {
                 createConfettiAt(document.querySelectorAll('.image-container')[index]);
               }
             }}
           >
             <img src={src} alt={`Berke Fotoğrafı ${index + 1}`} />
           </div>
         ))}
       </div>
      
       <footer>
         Seviliyorsun. — UĞUR VE METEHAN
       </footer>
    </div>
  );
}

export default BirthdayGallery;
