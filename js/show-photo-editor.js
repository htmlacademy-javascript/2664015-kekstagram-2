import { addValidation, removeValidation, isValidForm } from './validation-form.js';
import { addEditPhotoListener, removeEditPhotoListener } from './edit-photo.js';
import { submitFormData } from './api.js';

const typesOfPhoto = ['jpg', 'jpeg', 'png'];

const imageUploadElement = document.querySelector('.img-upload');
const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadInputElement = imageUploadElement.querySelector('.img-upload__input');
const imagePreviewElement = imageUploadElement.querySelector('.img-upload__preview img');
const imageEffectPreviewElements = imageUploadElement.querySelectorAll('.effects__preview');
const imageEditingPopupElement = imageUploadElement.querySelector('.img-upload__overlay');
const imageUploadTextElement = imageUploadElement.querySelector('.img-upload__text');
const submitFormElement = imageUploadElement.querySelector('.img-upload__submit');
const closeFormElement = imageUploadElement.querySelector('.img-upload__cancel');

const handleCloseButtonKeydownEsc = (evt) => {
  if (evt.keyCode === 27) {
    hideModal();
  }
};

const handleCloseButtonClick = () => hideModal();

const handleHidePopup = (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
};

const disableSubmitButton = (isNeedDisable) => {
  submitFormElement.disabled = isNeedDisable;
};

const handleSubmitForm = (evt) => {
  evt.preventDefault();
  if (isValidForm()) {
    const formData = new FormData(imageUploadFormElement);
    submitFormData(formData);
  }
};

const swapPhoto = (photo) => {
  imagePreviewElement.src = URL.createObjectURL(photo);
  imageEffectPreviewElements.forEach((preview) => {
    preview.style.backgroundImage = `url(${URL.createObjectURL(photo)})`;
  });
};

const showModal = () => {
  imageEditingPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormElement.addEventListener('click', handleCloseButtonClick, {once: true});
  document.addEventListener('keydown', handleCloseButtonKeydownEsc);
  imageUploadTextElement.addEventListener('keydown', handleHidePopup);
  addValidation();
  imageUploadFormElement.addEventListener('submit', handleSubmitForm);
  addEditPhotoListener();
};

function hideModal () {
  imageEditingPopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleCloseButtonKeydownEsc);
  imageUploadTextElement.removeEventListener('keydown', handleHidePopup);
  removeValidation();
  removeEditPhotoListener();
  imageUploadFormElement.removeEventListener('submit', handleSubmitForm);
  imageUploadFormElement.reset();
}

const handleInputChange = () => {
  const file = imageUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  if (typesOfPhoto.some((format) => fileName.endsWith(format))) {
    swapPhoto(file);
    showModal();
  }
};

const addListenerDownloadPhoto = () => {
  imageUploadInputElement.addEventListener('change', handleInputChange);
};

export { addListenerDownloadPhoto, hideModal, disableSubmitButton };

