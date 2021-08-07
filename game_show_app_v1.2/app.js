document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('#overlay')
  const qwerty = document.getElementById('qwerty');
  const phrase = document.getElementById('phrase');
  const phraseUL = phrase.querySelector('ul');
  const scoreBoard = document.getElementById('scoreboard');
  const scoreBoardLivesImg = scoreBoard.querySelectorAll('img');
  let missed = 0;

  function getRandomPhraseAsArray(phrases) {
    const phrasesGenerate = phrases[Math.floor(Math.random() * phrases.length)];
    const phrasesSplit = phrasesGenerate.split('');
    return phrasesSplit;
  }

  function addPhraseToDisplay(arr) {
    function setPhraseArr(element, classNameString, arrInput) {
      element.textContent = arrInput;
      element.className = classNameString;
      phraseUL.appendChild(element);
    }
    for (let i = 0; i < arr.length; i++) {
      let arrInput = arr[i];
      const li = document.createElement('li');
      if (arrInput !== ' ') {
        setPhraseArr(li, 'letter', arrInput)
      } else {
        setPhraseArr(li, 'space', arrInput);
      }
    }
  }

  function checkLetter(clicked) {
    const letters = phraseUL.querySelectorAll('.letter');
    let correctLetter;
    let wrongLetter;
    for (let i = 0; i < letters.length; i++) {
      let letter = letters[i];
      const letterContent = letter.textContent;
      if (letterContent.toLowerCase() === clicked.textContent) {
        letter.className += ' show';
        correctLetter = letterContent;
      } else {
        wrongLetter = null;
      }
    }
    if (correctLetter !== undefined) {
      return correctLetter;
    } else {
      return wrongLetter;
    }
  }

  function checkWin() {
    const letterClass = phraseUL.querySelectorAll('.letter');
    const showClass = phraseUL.querySelectorAll('.show');
    function gameEndScreen(className, resultsString) {
      overlay.className = className;
      overlay.style.display = '';
      overlay.innerHTML =
      `<h2 class="title">Wheel of Success</h2>
      <a class="btn__reset">Try Again</a>
      <h2>${resultsString}</h2>`
    }
    if (showClass.length === letterClass.length) {
      gameEndScreen('win', 'Congratulation! You Win!');
    } else if (missed >= 5) {
      gameEndScreen('lose', 'You Lose!')
    }
  }

  function gameReset() {
    const buttonsClassReset = qwerty.querySelectorAll('.chosen')
    phraseUL.innerHTML = `<ul></ul>`;
    missed = 0;
    for (let i = 0; i < scoreBoardLivesImg.length; i++) {
      let scoreBoardLifeImg = scoreBoardLivesImg[i];
      scoreBoardLifeImg.src = 'images/liveHeart.png';
    }
    for (let j = 0; j < buttonsClassReset.length; j++) {
      let buttonClassReset = buttonsClassReset[j];
      buttonClassReset.removeAttribute('class');
      buttonClassReset.removeAttribute('disabled');
    }
  }

  overlay.addEventListener('click', (e) => {
    const phrases = ['I am Iron man', 'Avengers', 'Captian America', 'I am Groot', 'Why is Gamora'];
    const phraseArray = getRandomPhraseAsArray(phrases);
    if (e.target.textContent === 'Start Game') {
      const startOverly = e.target.parentNode;
      startOverly.style.display = 'none';
      addPhraseToDisplay(phraseArray);
    }
    if (e.target.textContent === 'Try Again') {
      const startOverly = e.target.parentNode;
      startOverly.style.display = 'none';
      gameReset();
      addPhraseToDisplay(phraseArray);
    }
  })

  qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      button.className = 'chosen';
      button.setAttribute('disabled', '');
      const letterFound = checkLetter(button);
      if (letterFound === null) {
        scoreBoardLivesImg[missed].src = 'images/lostHeart.png';
        missed++;
      }
      checkWin();
    }
  })

});

