const getRandomInteger = (min, max) => Math.floor(Math.random() * max - min + 1) + min;

//let toggle = false;
//
//const toggleIsInputInFocus = () => {
//  toggle = true;
//};
//
//const toggleIsInputOutFocus = () => {
//  toggle = false;
//};
//
//const initListenerFocus = (element, init = true) => {
//  if (init) {
//    element.addEventListener('focusin', toggleIsInputInFocus);
//    element.addEventListener('focusout', toggleIsInputOutFocus);
//  } else {
//    element.removeEventListener('focusin', toggleIsInputInFocus);
//    element.removeEventListener('focusout', toggleIsInputOutFocus);
//  }
//};

const getUniqueId = (min, max) => {
  const usedIds = [];

  return function () {
    let currentId = getRandomInteger(min, max);
    if (max - min + 1 <= usedIds.length) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }
    while (usedIds.includes(currentId)) {
      currentId = getRandomInteger(min, max);
    }
    usedIds.push(currentId);
    return currentId;
  };
};

export { getRandomInteger, getUniqueId };
