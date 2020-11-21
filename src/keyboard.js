/* global document */
const firstRow = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
const secondRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'];
const thirdRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''];
const fourthRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
const emptyRow1 = Array(13).fill('');
const emptyRow2 = Array(11).fill('');
const emptyRow3 = Array(10).fill('');
const secondRowRus = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ё'];
const thirdRowRus = ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'];
const fourthRowRus = ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/'];
const deleteButton = 'delete';
const tabButton = 'tab';
const capsButton = 'caps lock';
const returnButton = 'return';
const shiftButton = 'shift';
const ctrlButton = 'ctl';
const altButton = 'alt';
const commandButton = '&#x1f310';
const topArrowButton = '&uarr;';
const bottomArrowButton = '&darr;';
const rightArrowButton = '&rarr;';
const leftArrowButton = '&larr;';
const language = 'language';
let textArea = document.querySelector('.search-input');

const createNewDiv = (className, btnClassName, element) => {
  const div = document.createElement('div');
  div.classList = className;
  div.classList.add(btnClassName);
  div.innerHTML = `<p>${element}</p>`;
  return document.querySelector('.full-keyboard').append(div);
};

const createKeyboard = () => {
  // wrapper
  const div = document.createElement('div');
  div.className = 'wrapper';
  document.body.append(div);

  // first row english
  firstRow.forEach((element) => {
    createNewDiv('button', 'btn', element);
  });
  createNewDiv('backspace-button', 'btn', deleteButton);

  // second row english
  createNewDiv('backspace-button', 'btn', tabButton);
  emptyRow1.forEach((element) => {
    createNewDiv('button', 'btn', element);
  });

  // third row english
  createNewDiv('backspace-button', 'btn', capsButton);
  emptyRow2.forEach((element) => {
    createNewDiv('button', 'btn', element);
  });
  createNewDiv('backspace-button', 'btn', returnButton);

  // fourth row english
  createNewDiv('backspace-button', 'btn', shiftButton);
  emptyRow3.forEach((element) => {
    createNewDiv('button', 'btn', element);
  });
  createNewDiv('arrow-button', 'btn', topArrowButton);
  createNewDiv('backspace-button', 'btn', shiftButton);

  // fifth row english
  createNewDiv('arrow-button', 'btn', ctrlButton);
  createNewDiv('arrow-button', 'btn', altButton);
  createNewDiv('command-button', 'btn', commandButton);
  createNewDiv('gap-button', 'btn', '');
  createNewDiv('arrow-button', 'btn', altButton);
  createNewDiv('arrow-button', 'btn', leftArrowButton);
  createNewDiv('arrow-button', 'btn', bottomArrowButton);
  createNewDiv('arrow-button', 'btn', rightArrowButton);
  createNewDiv('arrow-button', 'btn', ctrlButton);
};

const setLetters = (row1, row2, row3) => {
  let j = 0;
  let a = 0;
  let b = 0;
  for (let i = 13; i < 26; i += 1) {
    Array.from(document.querySelectorAll('.button'))[i].firstElementChild.textContent = row1[j];
    j += 1;
  }
  for (let i = 26; i < 37; i += 1) {
    Array.from(document.querySelectorAll('.button'))[i].firstElementChild.textContent = row2[a];
    a += 1;
  }
  for (let i = 37; i < 47; i += 1) {
    Array.from(document.querySelectorAll('.button'))[i].firstElementChild.textContent = row3[b];
    b += 1;
  }
};

createKeyboard();

// document.addEventListener('DOMContentLoaded', () => {
//   const lang = localStorage.getItem(language);
//   if (lang === 'english') {
//     console.log(lang + ' >>> lang');
//     setLetters(secondRow, thirdRow, fourthRow);
//   } else if (lang === 'russian') {
//     console.log(lang + ' >>> lang');
//     setLetters(secondRowRus, thirdRowRus, fourthRowRus);
//   } else {
//     setLetters(secondRow, thirdRow, fourthRow);
//   }
// });

setLetters(secondRow, thirdRow, fourthRow);

document.querySelector('.full-keyboard').addEventListener('mouseover', (event) => {
  const el = event.target.closest('.btn');
  if (!el) {
    return;
  }
  el.style.backgroundColor = 'pink';
});

document.querySelector('.full-keyboard').addEventListener('mouseout', (event) => {
  const el = event.target.closest('.btn');
  if (!el) {
    return;
  }
  el.style.backgroundColor = '';
});

// animation for mouse click event
const setTimer = (element) => {
  element.style.borderRadius = '20px';
  return setTimeout(() => element.style.borderRadius = '', 500);
};

const handleCapsLock = (startOfRow, endOfRow) => {
  for (let i = startOfRow; i < endOfRow; i++) {
    const a = Array.from(document.querySelector('.full-keyboard').querySelectorAll('.button'))[i];
    if (a.firstElementChild.style.textTransform === 'capitalize') {
      a.firstElementChild.style.textTransform = 'none';
    } else {
      a.firstElementChild.style.textTransform = 'capitalize';
    }
  }
};

document.querySelector('.full-keyboard').addEventListener('click', (event) => {
  if (event.target.closest('.btn')) {
    setTimer(event.target.closest('.btn'));
  }
  const elButton = event.target.closest('.button');
  const gapBtn = event.target.classList.contains('gap-button');
  const backspaceBtn = event.target.closest('.backspace-button');
  const arrowButton = event.target.closest('.arrow-button');
  const command = event.target.closest('.command-button');

  if (elButton) {
    if (elButton.firstElementChild.style.textTransform === 'capitalize') {
      textArea.value += elButton.firstElementChild.innerHTML.toUpperCase();
    } else {
      textArea.value += elButton.firstElementChild.innerHTML;
    }
  } else if (gapBtn) {
    textArea.value += ' ';
  }
//    else if (event.metaKey) {
//     flag = true;
//   }
   else if (command) {
    //flag = false;
    if (Array.from(document.querySelectorAll('.button'))[13].firstElementChild.textContent === 'q') {
      setLetters(secondRowRus, thirdRowRus, fourthRowRus);
    } else {
      setLetters(secondRow, thirdRow, fourthRow);
    }
  } else if (backspaceBtn && (backspaceBtn.firstElementChild.innerHTML === deleteButton)) {
    textArea.value = textArea.value.slice(0, -1);
  } else if (backspaceBtn && (backspaceBtn.firstElementChild.innerHTML === returnButton)) {
    logicForSearch();
    document.querySelector('.full-keyboard').classList.remove('visible-keyboard');
  } else if (backspaceBtn && (backspaceBtn.firstElementChild.innerHTML === capsButton)) {
    handleCapsLock(13, 26);
    handleCapsLock(26, 37);
    handleCapsLock(37, 46);
  } else if (backspaceBtn && (backspaceBtn.firstElementChild.innerHTML === tabButton)) {
    textArea.value += '    ';
  } else if (arrowButton) {
    if (arrowButton.firstElementChild.innerText === '←') {
      //textArea.value += arrowButton.firstElementChild.innerText;
      event.target.selectionStart;
    } else if (arrowButton.firstElementChild.innerText === '↓') {
      textArea.value += arrowButton.firstElementChild.innerText;
    } else if (arrowButton.firstElementChild.innerText === '→') {
      textArea.value += arrowButton.firstElementChild.innerText;
    } else if (arrowButton.firstElementChild.innerText === '↑') {
      textArea.value += arrowButton.firstElementChild.innerText;
    }
  }
});

const animationForSpecialBtns = (arrayElem) => {
  Array.from(document.querySelectorAll('.btn'))[arrayElem].style.backgroundColor = 'pink';
  Array.from(document.querySelectorAll('.btn'))[arrayElem].style.borderRadius = '20px';
};

let flag = false;

