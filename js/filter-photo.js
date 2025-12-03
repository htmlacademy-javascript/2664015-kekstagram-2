import { getUniqueId } from './utils.js';
import { renderMiniPhotos } from './render-mini-photos.js';
import { photosList } from './api.js';
import { debounce } from './utils.js';

const FILTER_TIMEOUT = 500;
const RANDOM_PHOTOS_LENGTH = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');
const buttonsElement = filtersElement.querySelector('.img-filters__form');
let currentButton = buttonsElement[0];
let currentFilter = Filter.DEFAULT;

const randomizePhotos = (photos) => {
  const getRandomId = getUniqueId(0, photos.length - 1);
  const identifiers = [];
  let i = 0;

  while (i < RANDOM_PHOTOS_LENGTH) {
    identifiers.push(getRandomId());
    i++;
  }

  return identifiers;
};

const sortPhotos = (photos) => {
  const sortedPhotos = photos.toSorted((a, b) => b.comments.length - a.comments.length);
  return sortedPhotos;
};

const getPhotos = (photos) => {
  if (currentFilter === Filter.DEFAULT) {
    return photos;
  } else if (currentFilter === Filter.RANDOM) {
    const photosIds = randomizePhotos(photos);
    const newPhotos = photos.filter((photo) => photosIds.includes(photo.id));
    return newPhotos;
  } else if (currentFilter === Filter.DISCUSSED) {
    return sortPhotos(photos);
  }
};

const applyFilter = () => {
  renderMiniPhotos(getPhotos(photosList));
};

const debouncedApplyFilter = debounce(applyFilter, FILTER_TIMEOUT);

const handleButtonClick = (evt) => {
  const button = evt.target.closest('.img-filters__button');
  if (button){
    currentButton.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
    currentButton = button;
    currentFilter = currentButton.id;
    debouncedApplyFilter();
  }
};

const showFilters = (isNeedShow) => {
  if (isNeedShow) {
    buttonsElement.addEventListener('click', handleButtonClick);
    filtersElement.classList.remove('img-filters--inactive');
  } else {
    buttonsElement.removeEventListener('click', handleButtonClick);
    filtersElement.classList.add('img-filters--inactive');
  }
};

export { showFilters, getPhotos };
