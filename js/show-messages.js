const TIMEOUT = 5000;
const ERROR_SELECTOR = 'data-error';

const bodyElement = document.body;
const errorMessageFragment = document.querySelector(`#${ERROR_SELECTOR}`).content.cloneNode(true);

let messageType;

const addErrorMessage = () => {
  bodyElement.append(errorMessageFragment);
  const errorMessageElement = bodyElement.querySelector(`.${ERROR_SELECTOR}`);
  setTimeout(() => {
    errorMessageElement.remove();
  }, TIMEOUT);
};

const handleCloseButtonKeydownEsc = (evt) => {
  if (evt.keyCode === 27) {
    evt.stopImmediatePropagation();
    hideMessage();
  }
};

const handleCloseButtonClick = (evt) => {
  if (evt.target.closest(`.${messageType}__button`)) {
    hideMessage();
  }
  if (!evt.target.closest(`.${messageType}__inner`)) {
    hideMessage();
  }
};

function hideMessage () {
  const successElement = bodyElement.querySelector(`.${messageType}`);
  successElement.remove();
  document.removeEventListener('click', handleCloseButtonClick);
  document.removeEventListener('keydown', handleCloseButtonKeydownEsc, true);
}

const showMessage = (isSuccess) => {
  messageType = isSuccess ? 'success' : 'error';
  const cloneMessageFragment = document.querySelector(`#${messageType}`).content.cloneNode(true);
  bodyElement.append(cloneMessageFragment);
  document.addEventListener('click', handleCloseButtonClick);
  document.addEventListener('keydown', handleCloseButtonKeydownEsc, true);
};

export { showMessage, addErrorMessage };
