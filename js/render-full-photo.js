import { renderComments } from './render-comments.js';

const photosElement = document.querySelector('.pictures');
const fullPhotoElement = document.querySelector('.big-picture');
const fullImageElement = fullPhotoElement.querySelector('.big-picture__img img');
const likesCountElement = fullPhotoElement.querySelector('.likes-count');
const closeFullPhotoElement = fullPhotoElement.querySelector('.big-picture__cancel');
const photoDescriptionElement = fullPhotoElement.querySelector('.social__caption');

const handleCloseButtonKeydownEsc = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    hidePopup();
  }
};

const handleCloseButtonClick = () => hidePopup();

const showPopup = () => {
  fullPhotoElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFullPhotoElement.addEventListener('click', handleCloseButtonClick, {once: true});
  document.addEventListener('keydown', handleCloseButtonKeydownEsc);
};

function hidePopup () {
  fullPhotoElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleCloseButtonKeydownEsc);
}

const changeFullPhoto = (currentPhotoData) => {
  fullImageElement.src = currentPhotoData.url;
  fullImageElement.alt = currentPhotoData.description;
  photoDescriptionElement.textContent = currentPhotoData.description;
  likesCountElement.textContent = currentPhotoData.likes;
};

const handlePhotosClick = (evt, photosData) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const photoId = evt.target.closest('.picture').dataset.photoId;
    const currentPhotoData = photosData.find((item) => String(item.id) === String(photoId));
    changeFullPhoto(currentPhotoData);
    showPopup();
    renderComments(currentPhotoData.comments);
  }
};

const addListenerFullPhoto = (photosData) => {
  photosElement.addEventListener('click', (evt) => handlePhotosClick(evt, photosData));
};

export { addListenerFullPhoto };

