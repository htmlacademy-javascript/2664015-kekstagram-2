import { loadData } from './api.js';
import { renderMiniPhotos } from './render-mini-photos.js';
import { addListenerFullPhoto } from './render-full-photo.js';
import { addListenerDownloadPhoto } from './show-photo-editor.js';

addListenerDownloadPhoto();
const renderPage = (data) => {
  renderMiniPhotos(data);
  addListenerFullPhoto(data);
};

loadData(renderPage);
