import { initValidation, removeValidation } from './validation-form.js';
import { addEditPhotoListener, removeEditPhotoListener } from './edit-photo.js';

const imageUploadElement = document.querySelector('.img-upload');
const imageUploadFormElement = document.querySelector('.img-upload__form');
const imageUploadFieldsetElement = imageUploadElement.querySelector('.img-upload__start');
const imageEditingPopupElement = imageUploadElement.querySelector('.img-upload__overlay');
const imageUploadTextElement = imageUploadElement.querySelector('.img-upload__text');
const closeFormElement = imageUploadElement.querySelector('.img-upload__cancel');

const onCloseButtonKeydownEsc = (evt) => {
  if (evt.keyCode === 27) {
    hide();
  }
};

const onCloseButtonClick = () => hide();

const breakHidePopup = (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
};

const show = () => {
  imageEditingPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormElement.addEventListener('click', onCloseButtonClick, {once: true});
  document.addEventListener('keydown', onCloseButtonKeydownEsc);
  initValidation();
  imageUploadTextElement.addEventListener('keydown', breakHidePopup);
  addEditPhotoListener();
};

function hide () {
  imageEditingPopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseButtonKeydownEsc);
  removeValidation();
  imageUploadTextElement.removeEventListener('keydown', breakHidePopup);
  removeEditPhotoListener();
  imageUploadFormElement.reset();
}

const onChangeInput = () => show();

const initListenerDownloadPhoto = () => {
  imageUploadFieldsetElement.addEventListener('change', onChangeInput);
};

export { initListenerDownloadPhoto };
