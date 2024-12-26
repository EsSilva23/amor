document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");
  const overlay = document.getElementById("overlay");
  const albumContainer = document.getElementById("albumContainer");
  const audio = document.getElementById("albumMusic");
  const currentPhoto = document.getElementById("current-photo");
  const dotsContainer = document.querySelector(".dots"); // Container dos dots
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  const photos = [
    "assets/foto-1.jpg",
    "assets/foto-2.jpg",
    "assets/foto-3.jpg",
    "assets/foto-4.jpg",
    "assets/foto-5.jpg",
    "assets/foto-6.jpg",
    "assets/foto-7.jpg",
    "assets/foto-8.jpg",
    "assets/foto-9.jpg",
    "assets/foto-10.jpg",
    "assets/foto-11.jpg",
    "assets/foto-12.jpg",
    "assets/foto-13.jpg",
    "assets/foto-14.jpg",
    "assets/foto-15.png",
  ];

  let currentIndex = 0;

  // Criar os dots dinamicamente
  function createDots() {
    dotsContainer.innerHTML = ""; // Limpa os dots anteriores
    photos.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active"); // Ativo no primeiro
      dotsContainer.appendChild(dot);
    });
  }

  // Iniciar troca automática de fotos
  function startCarousel() {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % photos.length;
      currentPhoto.src = photos[currentIndex];
      updateDots();
    }, 7000);
  }

  // Atualizar indicadores (dots)
  function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.remove("active");
      if (index === currentIndex) {
        dot.classList.add("active");
      }
    });
  }

  // Função para mostrar a foto com base no índice
  function showPhoto(index) {
    currentIndex = index;
    currentPhoto.src = photos[currentIndex];
    updateDots();
  }

  // Navegar para a foto anterior
  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    showPhoto(currentIndex);
  });

  // Navegar para a foto seguinte
  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % photos.length;
    showPhoto(currentIndex);
  });

  playButton.addEventListener("click", () => {
    audio
      .play()
      .then(() => {
        overlay.style.opacity = "0";
        setTimeout(() => {
          overlay.style.display = "none";
          albumContainer.classList.remove("hidden");
          albumContainer.classList.add("show");
          createDots(); // Cria os dots antes do carrossel começar
          startCarousel();
        }, 100);
      })
      .catch((error) => {
        console.log("Erro ao tentar reproduzir:", error);
      });

    setTimeout(() => {
      audio.controls = false;
    }, 3000);
  });
});
