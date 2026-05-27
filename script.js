const links = document.querySelectorAll('.site-nav .nav-link');
const imageUploadInput = document.getElementById('cardImageUploader');
const cardImages = document.querySelectorAll('.game-thumb');
const storagePrefix = 'gamecard-';
let activeCardImageId = null;

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    links.forEach((el) => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
  });
});

function loadSavedImages() {
  cardImages.forEach((img) => {
    const saved = localStorage.getItem(storagePrefix + img.id);
    if (saved) {
      img.src = saved;
    }
  });
}

function initImageUpload() {
  cardImages.forEach((img) => {
    img.classList.add('uploadable');
    img.addEventListener('click', () => {
      activeCardImageId = img.id;
      imageUploadInput.click();
    });
  });

  if (!imageUploadInput) {
    return;
  }

  imageUploadInput.addEventListener('change', (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file || !activeCardImageId) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const imageElement = document.getElementById(activeCardImageId);
      if (imageElement) {
        imageElement.src = dataUrl;
        localStorage.setItem(storagePrefix + activeCardImageId, dataUrl);
      }
      imageUploadInput.value = '';
      activeCardImageId = null;
    };
    reader.readAsDataURL(file);
  });
}

loadSavedImages();
initImageUpload();

function initSectionHeaderAnimations() {
  const headers = document.querySelectorAll('.section-header');
  if (!headers.length) return;

  if (!('IntersectionObserver' in window)) {
    headers.forEach(h => h.classList.add('animate'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  headers.forEach(h => io.observe(h));
}

initSectionHeaderAnimations();
