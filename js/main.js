import { getPhotoCards } from './create-photo-data.js';
import { renderMiniPhotos, photosElement } from './render-mini-photos.js';
import { initListenerFullPhoto } from './render-full-photo.js';
import { initListenerDownloadPhoto } from './show-photo-editor.js';
import './edit-photo.js';

const photosData = getPhotoCards();

renderMiniPhotos(photosData);
initListenerFullPhoto(photosData, photosElement);
initListenerDownloadPhoto();
